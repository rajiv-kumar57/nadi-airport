"use client";

import { useEffect, useMemo, useState } from "react";

type FlightClass = "arriving" | "departing" | "overflying";

type StateItem = {
  icao24: string;
  callsign: string;
  origin_country: string;
  time_position?: number;
  last_contact?: number;
  position: { latitude: number; longitude: number };
  baro_altitude?: number;
  geo_altitude?: number;
  on_ground: boolean;
  velocity_ms?: number;
  true_track?: number;
  vertical_rate_ms?: number;
  category?: number;
  distance_to_nadi_km: number;
  bearing_to_nadi: number;
  towards_nadi?: boolean;
  classification: FlightClass;
};

function formatKm(km: number | undefined) {
  if (typeof km !== "number" || !Number.isFinite(km)) return "-";
  return `${km.toFixed(0)} km`;
}

function formatSpeed(ms?: number) {
  if (typeof ms !== "number" || !Number.isFinite(ms)) return "-";
  const kts = ms * 1.94384;
  return `${Math.round(kts)} kts`;
}

function useHashParams() {
  const [hash, setHash] = useState<string>(
    typeof window !== "undefined" ? window.location.hash : ""
  );
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return useMemo(() => {
    const h = hash.startsWith("#") ? hash.slice(1) : hash;
    const [path, qs] = h.split("?");
    const params = new URLSearchParams(qs || "");
    return { path: path || "", params };
  }, [hash]);
}

function todayYmd(tz: string = "Pacific/Fiji") {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  // en-CA yields YYYY-MM-DD
  return fmt.format(new Date());
}

export default function Flights() {
  const { params } = useHashParams();
  const rawType = (params.get("type") || "arrivals").toLowerCase();
  let normalizedType: FlightClass = "arriving";
  if (rawType === "departures" || rawType === "departing")
    normalizedType = "departing";
  else if (
    rawType === "overflying" ||
    rawType === "nearby" ||
    rawType === "all"
  )
    normalizedType = "overflying";
  else normalizedType = "arriving"; // arrivals/arriving default
  const date = params.get("date") || todayYmd();
  const q = (params.get("q") || "").trim().toUpperCase();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [states, setStates] = useState<StateItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`/api/opensky/states`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load flights");
        return r.json();
      })
      .then((data) => {
        if (cancelled) return;
        setStates(Array.isArray(data?.states) ? data.states : []);
        setLoading(false);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e?.message || "Failed to load");
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [normalizedType, date, q]);

  const filtered = useMemo(() => {
    let wanted: FlightClass = normalizedType;
    const base = states.filter((s) => s.classification === wanted);
    if (!q) return base;
    return base.filter(
      (s) =>
        (s.callsign || "").toUpperCase().includes(q) ||
        (s.origin_country || "").toUpperCase().includes(q)
    );
  }, [states, normalizedType, q]);

  let title = "Arrivals (live radar heuristic)";
  if (normalizedType === "departing")
    title = "Departures (live radar heuristic)";
  else if (normalizedType === "overflying") title = "Flights nearby";

  return (
    <section className="py-10" id="flights">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold text-[color:var(--color-brand)]">
            {title}
          </h2>
          <div className="text-sm text-black/60">Nadi, Fiji · {date}</div>
        </div>

        <div className="mt-4">
          {loading && <div className="text-black/70">Loading live data…</div>}
          {error && <div className="text-red-600">{error}</div>}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((s) => (
                <div
                  key={s.icao24 + s.callsign}
                  className="rounded-2xl bg-white ring-1 ring-black/10 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-[color:var(--color-brand)]">
                      {s.callsign || s.icao24}
                    </div>
                    <span className="text-xs rounded-full px-2 py-0.5 ring-1 ring-black/10">
                      {s.classification}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-black/70">
                    {s.origin_country}
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <div className="text-black/50">Distance</div>
                      <div className="font-medium">
                        {formatKm(s.distance_to_nadi_km)}
                      </div>
                    </div>
                    <div>
                      <div className="text-black/50">Track</div>
                      <div className="font-medium">
                        {typeof s.true_track === "number"
                          ? `${Math.round(s.true_track)}°`
                          : "-"}
                      </div>
                    </div>
                    <div>
                      <div className="text-black/50">Speed</div>
                      <div className="font-medium">
                        {formatSpeed(s.velocity_ms)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="text-black/70">
                  No flights found in range right now.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
