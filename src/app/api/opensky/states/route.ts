import { NextResponse } from "next/server";

// Nadi International Airport (NFFN) approximate coordinates
const NADI_LAT = -17.7554;
const NADI_LON = 177.443;

// Reasonable default bounding box around Nadi (about ~200km span)
const DEFAULT_BBOX = {
  lamin: -18.6,
  lomin: 176.7,
  lamax: -17.0,
  lomax: 178.2,
};

function toNumber(value: string | null): number | undefined {
  if (value == null) return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

function deg2rad(d: number): number {
  return (d * Math.PI) / 180;
}

function rad2deg(r: number): number {
  return (r * 180) / Math.PI;
}

// Haversine distance in kilometers
function distanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Initial bearing from point A to point B (degrees 0..360)
function bearingDeg(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const phi1 = deg2rad(lat1);
  const phi2 = deg2rad(lat2);
  const dLon = deg2rad(lon2 - lon1);
  const y = Math.sin(dLon) * Math.cos(phi2);
  const x =
    Math.cos(phi1) * Math.sin(phi2) -
    Math.sin(phi1) * Math.cos(phi2) * Math.cos(dLon);
  const brng = Math.atan2(y, x);
  return (rad2deg(brng) + 360) % 360;
}

function angularDifferenceDeg(a: number, b: number): number {
  let diff = Math.abs(a - b) % 360;
  return diff > 180 ? 360 - diff : diff;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const lamin = toNumber(searchParams.get("lamin")) ?? DEFAULT_BBOX.lamin;
    const lomin = toNumber(searchParams.get("lomin")) ?? DEFAULT_BBOX.lomin;
    const lamax = toNumber(searchParams.get("lamax")) ?? DEFAULT_BBOX.lamax;
    const lomax = toNumber(searchParams.get("lomax")) ?? DEFAULT_BBOX.lomax;

    const time = toNumber(searchParams.get("time"));

    const qs = new URLSearchParams({
      lamin: String(lamin),
      lomin: String(lomin),
      lamax: String(lamax),
      lomax: String(lomax),
    });
    if (typeof time === "number") qs.set("time", String(time));

    const url = `https://opensky-network.org/api/states/all?${qs.toString()}`;
    const resp = await fetch(url, {
      // Server-side fetch avoids CORS issues in the browser
      next: { revalidate: 5 },
    });

    if (!resp.ok) {
      return NextResponse.json(
        { error: "OpenSky request failed" },
        { status: resp.status }
      );
    }

    const data = await resp.json();
    const states: any[] = Array.isArray(data?.states) ? data.states : [];

    const processed = states
      .map((s) => {
        // OpenSky states format reference:
        // [ 0:icao24, 1:callsign, 2:origin_country, 3:time_position, 4:last_contact,
        //   5:longitude, 6:latitude, 7:baro_altitude, 8:on_ground, 9:velocity(m/s),
        //   10:true_track(deg), 11:vertical_rate(m/s), 12:sensors, 13:geo_altitude,
        //   14:squawk, 15:spi, 16:position_source, 17:category ]
        const icao24 = s[0];
        const callsign = (s[1] || "").trim();
        const origin_country = s[2];
        const time_position = s[3];
        const last_contact = s[4];
        const longitude = s[5];
        const latitude = s[6];
        const baro_altitude = s[7];
        const on_ground = Boolean(s[8]);
        const velocity = s[9];
        const true_track = s[10];
        const vertical_rate = s[11];
        const geo_altitude = s[13];
        const category = s[17];

        if (typeof latitude !== "number" || typeof longitude !== "number")
          return null;

        const distance_to_nadi_km = distanceKm(
          latitude,
          longitude,
          NADI_LAT,
          NADI_LON
        );
        const bearing_to_nadi = bearingDeg(
          latitude,
          longitude,
          NADI_LAT,
          NADI_LON
        );
        const track = typeof true_track === "number" ? true_track : undefined;
        const towards_nadi =
          typeof track === "number"
            ? angularDifferenceDeg(track, bearing_to_nadi) <= 60
            : undefined;

        // Heuristic classification
        let classification: "arriving" | "departing" | "overflying" =
          "overflying";
        if (!on_ground && typeof track === "number") {
          if (distance_to_nadi_km <= 160 && towards_nadi)
            classification = "arriving";
          else if (distance_to_nadi_km <= 80 && !towards_nadi)
            classification = "departing";
        }

        return {
          icao24,
          callsign,
          origin_country,
          time_position,
          last_contact,
          position: { latitude, longitude },
          baro_altitude,
          geo_altitude,
          on_ground,
          velocity_ms: velocity,
          true_track: track,
          vertical_rate_ms: vertical_rate,
          category,
          distance_to_nadi_km,
          bearing_to_nadi,
          towards_nadi,
          classification,
        };
      })
      .filter(Boolean);

    return NextResponse.json({
      generated_at: Date.now(),
      nadi: { lat: NADI_LAT, lon: NADI_LON },
      bbox: { lamin, lomin, lamax, lomax },
      count: processed.length,
      states: processed,
    });
  } catch (err) {
    console.error("/api/opensky/states error", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
