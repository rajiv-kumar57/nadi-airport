import Image from "next/image";
import Link from "next/link";

type Entry = {
  key: string;
  title: string;
  description: string;
  href: string;
  image: string;
};

const entries: Entry[] = [
  {
    key: "to-from",
    title: "To & From",
    description: "The best directions to and from the airport",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop",
  },
  {
    key: "check-in",
    title: "Check-in",
    description: "All the info you need for a smooth check‑in",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1200&auto=format&fit=crop",
  },
  {
    key: "shopping",
    title: "Shopping",
    description: "Enjoy great deals before you take off",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1555529771-35a38c7a47b2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    key: "facilities",
    title: "Facilities",
    description: "Toilets, ATMs, storage, charging points, and more",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1518544801976-3e723d4aae50?q=80&w=1200&auto=format&fit=crop",
  },
  {
    key: "tips",
    title: "Tips & Advice",
    description: "FAQs and suggestions. Travel smart, stress less",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764b3a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    key: "map",
    title: "Map",
    description: "Find your way around and explore the airport",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function AtTheAirport() {
  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[color:var(--color-brand)]">
          At The Airport
        </h2>

        <div className="mt-6 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((e) => (
            <Link
              key={e.key}
              href={e.href}
              className="group block"
            >
              <div className="relative h-52 sm:h-64 w-full overflow-hidden rounded-3xl ring-1 ring-black/10">
                <Image src={e.image} alt="" fill className="object-cover" />
              </div>
              <div className="mt-3 flex items-start justify-between gap-4">
                <div>
                  <div className="text-xl font-semibold text-[color:var(--color-brand)]">
                    {e.title}
                  </div>
                  <p className="mt-1 text-sm text-black/70">{e.description}</p>
                </div>
                <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1 ring-black/10 group-hover:bg-[color:var(--color-brand)] group-hover:text-on-brand transition-colors">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" strokeLinecap="round"/><path d="M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


