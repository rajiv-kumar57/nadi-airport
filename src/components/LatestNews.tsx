"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
  const visible = 3; // cards visible on desktop

  function prev() {
    setIndex((i) => Math.max(0, i - 1));
  }
  function next() {
    setIndex((i) => Math.min(items.length - visible, i + 1));
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

        <div className="mt-6 overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500"
            style={{ transform: `translateX(-${index * (100 / visible)}%)` }}
          >
            {items.map((n) => (
              <article
                key={n.id}
                className="min-w-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <Link href={n.href} className="group block">
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
              </article>
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


