"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Slide = {
  id: string;
  src: string;
  alt: string;
  headline: string;
  cta?: { label: string; href: string };
};

const unsplashSlides: Slide[] = [
  {
    id: "wing-clouds",
    src: "https://images.unsplash.com/photo-1502920917128-1aa500764b3a?q=80&w=1920&auto=format&fit=crop",
    alt: "Airplane wing above the clouds",
    headline: "Start Your Journey Above the Clouds",
    cta: { label: "See Flights", href: "#flights" },
  },
  {
    id: "lounge",
    src: "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?q=80&w=1920&auto=format&fit=crop",
    alt: "Relaxing at the airport lounge",
    headline: "Unwind in Premium Lounges",
    cta: { label: "Book a Lounge", href: "#" },
  },
  {
    id: "boarding",
    src: "https://images.unsplash.com/photo-1542238060-5a2e9c5a9f3f?q=80&w=1920&auto=format&fit=crop",
    alt: "Boarding gates",
    headline: "Smooth Boarding Every Time",
    cta: { label: "Plan Your Journey", href: "#" },
  },
  {
    id: "runway-dusk",
    src: "https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1920&auto=format&fit=crop",
    alt: "Runway at dusk",
    headline: "Arrivals & Departures in Real Time",
    cta: { label: "Live Status", href: "#flights" },
  },
  {
    id: "terminal",
    src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1920&auto=format&fit=crop",
    alt: "Modern airport terminal",
    headline: "Discover Nadi International Airport",
    cta: { label: "Explore", href: "#" },
  },
];

export default function HeroCarousel({ slides = unsplashSlides }: { slides?: Slide[] }) {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, slides.length]);

  function prev() {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }
  function next() {
    setIndex((i) => (i + 1) % slides.length);
  }

  return (
    <section className="relative h-[62vh] min-h-[360px] w-full overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${i === index ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          <div className="relative z-10 h-full">
            <div className="mx-auto max-w-7xl h-full px-6 flex items-end pb-20">
              <div className="max-w-3xl text-white">
                <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight">
                  {s.headline}
                </h1>
                {s.cta && (
                  <a
                    href={s.cta.href}
                    className="mt-6 inline-flex items-center gap-3 rounded-full bg-[color:var(--color-brand-accent)] text-black px-5 py-3 font-semibold shadow-sm hover:brightness-95"
                  >
                    {s.cta.label}
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/10">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" strokeLinecap="round"/><path d="M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Indicators */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-10 bg-white" : "w-4 bg-white/60"}`}
          />
        ))}
      </div>

      {/* Arrows */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4 z-20">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </section>
  );
}


