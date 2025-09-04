"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Mode = "arrivals" | "departures" | "connections" | "parking";

function CalendarIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 9h18" />
    </svg>
  );
}

function SearchIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-3.5-3.5" />
    </svg>
  );
}

function WeatherIcon({
  code,
  className = "h-5 w-5",
}: {
  code: number | null;
  className?: string;
}) {
  // Minimal mapping for common conditions
  const isClear = code === 0;
  const isCloudy = code !== null && [1, 2, 3, 45, 48].includes(code);
  const isRain =
    code !== null && [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code);
  const isStorm = code !== null && [95, 96, 99].includes(code);

  if (isClear)
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <circle cx="12" cy="12" r="4" />
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </g>
      </svg>
    );
  if (isRain)
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden
      >
        <path
          d="M7 10a5 5 0 019.6 1.2A3.5 3.5 0 1116 17H8a4 4 0 01-1-7.8"
          strokeLinecap="round"
        />
        <path d="M9 19l-1 2M13 19l-1 2M17 19l-1 2" strokeLinecap="round" />
      </svg>
    );
  if (isStorm)
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden
      >
        <path
          d="M7 10a5 5 0 019.6 1.2A3.5 3.5 0 1116 17H8a4 4 0 01-1-7.8"
          strokeLinecap="round"
        />
        <path d="M12 13l-2 4h3l-2 4" strokeLinecap="round" />
      </svg>
    );
  if (isCloudy)
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden
      >
        <path
          d="M7 12a4 4 0 017.8-1 3 3 0 11.2 6H9a4 4 0 01-2-7.5"
          strokeLinecap="round"
        />
      </svg>
    );
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

export default function FlightSearchBar() {
  const [mode, setMode] = useState<Mode>("departures");
  const [query, setQuery] = useState("");
  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const [localTime, setLocalTime] = useState<string>("");
  const [tempC, setTempC] = useState<number | null>(null);
  const [weatherCode, setWeatherCode] = useState<number | null>(null);

  const [date, setDate] = useState<string>(() => {
    const t = new Date();
    const y = t.getFullYear();
    const m = String(t.getMonth() + 1).padStart(2, "0");
    const d = String(t.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  });

  const longDate = useMemo(() => {
    try {
      const d = new Date(date);
      return d.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return date;
    }
  }, [date]);

  // Local time in Nadi (Pacific/Fiji)
  useEffect(() => {
    const update = () => {
      const fmt = new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "Pacific/Fiji",
      });
      setLocalTime(fmt.format(new Date()));
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  // Weather for Nadi via Open-Meteo (no API key)
  useEffect(() => {
    const controller = new AbortController();
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=-17.8&longitude=177.42&current=temperature_2m,weather_code&timezone=Pacific/Fiji";
    fetch(url, { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => {
        const t =
          data?.current?.temperature_2m ??
          data?.current_weather?.temperature ??
          null;
        const c =
          data?.current?.weather_code ??
          data?.current_weather?.weathercode ??
          null;
        if (typeof t === "number") setTempC(Math.round(t));
        if (typeof c === "number") setWeatherCode(c);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (mode === "parking") {
      window.location.hash = "#parking";
      return;
    }
    const url = `#flights?type=${mode}&q=${encodeURIComponent(
      query
    )}&date=${encodeURIComponent(date)}`;
    window.location.hash = url;
  }

  const linkLabel =
    mode === "departures"
      ? "View all departures"
      : mode === "arrivals"
      ? "View all arrivals"
      : "View all flights";

  return (
    <section className="relative z-20 -mt-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-7xl rounded-2xl bg-[color:var(--color-brand)] text-on-brand ring-1 ring-white/10 px-6 py-6">
          {/* Tabs + Meta */}
          <div className="flex items-center justify-between gap-6 text-lg font-semibold">
            <div className="flex items-center gap-6">
              {(
                [
                  { key: "arrivals", label: "Arrivals" },
                  { key: "departures", label: "Departures" },
                  { key: "connections", label: "Connections" },
                  { key: "parking", label: "Book Parking" },
                ] as { key: Mode; label: string }[]
              ).map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setMode(t.key)}
                  className="relative pb-3"
                >
                  <span className="opacity-95 hover:opacity-100">
                    {t.label}
                  </span>
                  {mode === t.key && (
                    <span className="absolute left-0 right-0 -bottom-0.5 h-[3px] rounded-full bg-[color:var(--color-brand-accent)]" />
                  )}
                </button>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-4 text-sm font-medium">
              <span className="tracking-widest uppercase">Nadi</span>
              <span className="opacity-40">|</span>
              <span>{localTime || "--:--"}</span>
              <span className="opacity-40">|</span>
              <span className="inline-flex items-center gap-2">
                <WeatherIcon code={weatherCode} className="h-6 w-6" />
                <span>{tempC !== null ? `${tempC}°C` : "--"}</span>
              </span>
            </div>
          </div>

          {/* Inputs */}
          <form
            onSubmit={onSubmit}
            className="mt-5 grid grid-cols-1 lg:grid-cols-[1fr_1.6fr_auto] items-stretch gap-4"
          >
            {/* Date */}
            <div
              className="flex items-center justify-between rounded-xl bg-white text-black ring-1 ring-white/20 px-4 py-4"
              onClick={() => dateInputRef.current?.showPicker?.()}
            >
              <div>
                <div className="text-xs text-black/60">Pick a date</div>
                <div className="mt-0.5 font-medium">{longDate}</div>
              </div>
              <CalendarIcon className="h-6 w-6 text-[color:var(--color-brand)]" />
              <input
                ref={dateInputRef}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="sr-only"
              />
            </div>

            {/* Search */}
            <div className="flex items-center gap-3 rounded-xl bg-white text-black ring-1 ring-white/20 px-4 py-4">
              <SearchIcon className="h-5 w-5 text-black/70" />
              <input
                type="text"
                placeholder="Search airline, flight no. or city"
                className="flex-1 bg-transparent outline-none placeholder:text-black/60"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {/* Link */}
            <div className="flex items-center justify-end lg:pl-4">
              <button
                type="button"
                onClick={() => (window.location.hash = "#flights")}
                className="inline-flex items-center gap-2 font-semibold"
              >
                <span>{linkLabel}</span>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14" strokeLinecap="round" />
                    <path
                      d="M13 6l6 6-6 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
