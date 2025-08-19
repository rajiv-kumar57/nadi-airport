"use client";

import { useState } from "react";

export default function FlightSearchBar() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"departures" | "arrivals">("departures");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // placeholder: will be wired to real endpoint later
    const url = `#flights?type=${type}&q=${encodeURIComponent(query)}`;
    window.location.hash = url;
  }

  return (
    <div className="relative z-20 -mt-10">
      <div className="mx-auto max-w-6xl px-6">
        <form
          onSubmit={onSubmit}
          className="rounded-2xl bg-white/90 backdrop-blur shadow-lg ring-1 ring-black/10 p-3 sm:p-4 flex flex-col sm:flex-row items-stretch gap-3"
        >
          <div className="inline-flex rounded-full bg-black/5 p-1">
            <button
              type="button"
              onClick={() => setType("departures")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                type === "departures" ? "bg-[color:var(--color-brand)] text-on-brand" : "text-black/70"
              }`}
            >
              Departures
            </button>
            <button
              type="button"
              onClick={() => setType("arrivals")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                type === "arrivals" ? "bg-[color:var(--color-brand)] text-on-brand" : "text-black/70"
              }`}
            >
              Arrivals
            </button>
          </div>

          <input
            type="text"
            placeholder="Flight number, destination or airline"
            className="flex-1 rounded-xl bg-white px-4 py-3 text-black placeholder:text-black/50 outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            type="submit"
            className="rounded-xl bg-[color:var(--color-brand-accent)] text-black px-5 py-3 font-semibold hover:brightness-95"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}


