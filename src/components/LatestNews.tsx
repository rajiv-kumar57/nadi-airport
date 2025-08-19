"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type News = {
  id: string;
  title: string;
  date: string; // display only
  tag: string;
  image: string;
  href: string;
};

const items: News[] = [
  {
    id: "terminal-upgrade",
    title: "Terminal upgrades continue ahead of the holiday season",
    date: "JULY 17, 2025",
    tag: "COMMUNITY",
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d5163c0?q=80&w=1600&auto=format&fit=crop",
    href: "#",
  },
  {
    id: "summer-traffic",
    title: "Summer in full swing at Nadi Airport",
    date: "JULY 4, 2025",
    tag: "AT THE AIRPORT",
    image:
      "https://images.unsplash.com/photo-1527377667-83c6d9ab2b88?q=80&w=1600&auto=format&fit=crop",
    href: "#",
  },
  {
    id: "sustainability",
    title: "New sustainability initiatives take off",
    date: "JULY 1, 2025",
    tag: "ENVIRONMENT",
    image:
      "https://images.unsplash.com/photo-1529078155058-5d716f45d604?q=80&w=1600&auto=format&fit=crop",
    href: "#",
  },
  {
    id: "jobs",
    title: "Nadi Airport welcomes 100 new roles across operations",
    date: "JUNE 24, 2025",
    tag: "JOBS",
    image:
      "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1600&auto=format&fit=crop",
    href: "#",
  },
];

export default function LatestNews() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(3);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Adjust visible count based on viewport
  useEffect(() => {
    const update = () => {
      const lg = window.matchMedia("(min-width: 1024px)").matches;
      const sm = window.matchMedia("(min-width: 640px)").matches;
      setVisible(lg ? 3 : sm ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  function scrollToIndex(nextIndex: number) {
    const el = containerRef.current;
    const item = itemRefs.current[nextIndex];
    if (!el || !item) return;
    el.scrollTo({ left: item.offsetLeft, behavior: "smooth" });
    setIndex(nextIndex);
  }

  function prev() {
    scrollToIndex(Math.max(0, index - 1));
  }
  function next() {
    const maxIndex = Math.max(0, items.length - visible);
    scrollToIndex(Math.min(maxIndex, index + 1));
  }

  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[color:var(--color-brand)]">
            Latest News
          </h2>
          <Link href="#" className="text-[color:var(--color-brand)] font-semibold hover:underline">
            View More News
          </Link>
        </div>

        <div className="mt-6 overflow-x-auto lg:overflow-hidden scroll-smooth" ref={containerRef} onScroll={() => {
          const el = containerRef.current;
          if (!el) return;
          // Find the closest card based on scroll position
          let closest = 0;
          let best = Infinity;
          itemRefs.current.forEach((child, idx) => {
            const dist = Math.abs((child?.offsetLeft ?? 0) - el.scrollLeft);
            if (dist < best) { best = dist; closest = idx; }
          });
          setIndex(closest);
        }}>
          <div className="flex gap-4 sm:gap-6">
            {items.map((n, i) => (
              <div
                key={n.id}
                className="snap-start shrink-0 w-full sm:w-1/2 lg:w-1/3"
                ref={(el) => { itemRefs.current[i] = el; }}
              >
                <Link href={n.href} className="group block pr-2 sm:pr-3">
                  <div className="relative h-56 sm:h-64 overflow-hidden rounded-3xl ring-1 ring-black/10">
                    <Image src={n.image} alt="" fill className="object-cover" />
                  </div>
                  <div className="mt-3">
                    <div className="inline-flex items-center gap-2 text-xs">
                      <span className="rounded-full bg-[color:var(--color-brand)]/10 px-3 py-1 font-semibold text-[color:var(--color-brand)]">{n.tag}</span>
                      <span className="text-black/50">{n.date}</span>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-[color:var(--color-brand)] group-hover:underline">
                      {n.title}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-black/10 hover:bg-black/[.03]"
              aria-label="Previous"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button
              onClick={next}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-black/10 hover:bg-black/[.03]"
              aria-label="Next"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.max(1, items.length - visible + 1) }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full ${i === index ? "w-10 bg-[color:var(--color-brand)]" : "w-4 bg-black/30"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


