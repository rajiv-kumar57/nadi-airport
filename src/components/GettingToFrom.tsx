import Link from "next/link";

type Item = {
  key: string;
  title: string;
  description: string;
  href: string;
  icon: (props: { className?: string }) => JSX.Element;
};

function BusIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="5" y="3" width="14" height="14" rx="2" />
      <path d="M7 17v2M17 17v2M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

function TaxiIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M3 13l2-4h14l2 4v5H3z" />
      <path d="M9 5h6l1 4H8l1-4z" />
      <circle cx="7.5" cy="17" r="1.5" />
      <circle cx="16.5" cy="17" r="1.5" />
    </svg>
  );
}

function CarIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M3 12l2-5h14l2 5v6H3z" />
      <circle cx="7.5" cy="17" r="1.5" />
      <circle cx="16.5" cy="17" r="1.5" />
    </svg>
  );
}

function ParkingIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M6 4h7a5 5 0 010 10H6z" />
      <path d="M6 14v6" />
    </svg>
  );
}

const items: Item[] = [
  {
    key: "bus",
    title: "Bus",
    description: "Buy tickets to the city and beyond",
    href: "#",
    icon: BusIcon,
  },
  {
    key: "taxi",
    title: "Taxi",
    description: "Ready to go outside the terminal",
    href: "#",
    icon: TaxiIcon,
  },
  {
    key: "car-hire",
    title: "Car Hire",
    description: "Book ahead to get behind the wheel",
    href: "#",
    icon: CarIcon,
  },
  {
    key: "car",
    title: "Car",
    description: "The best way to park, pick‑up or drop‑off",
    href: "#",
    icon: ParkingIcon,
  },
];

function LearnMore({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-3 rounded-full bg-white text-[color:var(--color-brand)] ring-1 ring-[color:var(--color-brand)] px-5 py-2.5 text-sm font-semibold hover:bg-[color:var(--color-brand)] hover:text-on-brand transition-colors"
    >
      <span>Learn More</span>
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--color-brand)] text-on-brand">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" strokeLinecap="round"/><path d="M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
    </Link>
  );
}

export default function GettingToFrom() {
  return (
    <section className="py-14 bg-[color-mix(in_oklab,white,var(--color-brand)_4%)]">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[color:var(--color-brand)]">
          Getting To & From
        </h2>
        <p className="mt-2 text-black/60">Wherever you're going, we'll help you get there.</p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {items.map(({ key, title, description, href, icon: Icon }) => (
            <div
              key={key}
              className="flex items-center gap-6 rounded-3xl bg-white ring-1 ring-black/10 p-4 sm:p-6"
            >
              <div className="shrink-0 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-[color-mix(in_oklab,var(--color-brand),white_85%)] text-[color:var(--color-brand)] ring-1 ring-black/10">
                <Icon className="h-8 w-8" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xl font-semibold text-[color:var(--color-brand)]">{title}</div>
                <p className="mt-1 text-sm text-black/70 truncate sm:whitespace-normal">{description}</p>
              </div>
              <div className="pl-4 sm:pl-6">
                <LearnMore href={href} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="#" className="inline-flex items-center gap-3 rounded-full bg-[color:var(--color-brand-accent)] text-black px-6 py-3 font-semibold hover:brightness-95">
            Plan Your Journey
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full ring-1 ring-black/10 bg-white/70">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" strokeLinecap="round"/><path d="M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}


