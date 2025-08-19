import Link from "next/link";

export function NadiMark({ className = "h-9 w-9" }: { className?: string }) {
  // stylized palm + wave mark for Nadi
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--brand-accent)" />
          <stop offset="100%" stopColor="var(--brand)" />
        </linearGradient>
      </defs>
      <path d="M10 30c8-3 16-3 24 0" stroke="url(#g1)" strokeWidth="3" strokeLinecap="round" />
      <path d="M28 8l2 8 6-4" stroke="var(--brand-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="38" cy="10" r="2" fill="var(--brand-accent)" />
      <path d="M8 34c6 2 20 2 28 0" stroke="currentColor" strokeOpacity=".55" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M4 6h2l2.5 10h9.5l2-7H7.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
    </svg>
  );
}

function UserIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5.5 20c1.6-3.2 4-4.8 6.5-4.8s4.9 1.6 6.5 4.8" strokeLinecap="round" />
    </svg>
  );
}

function DepartureIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M2 19h20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3 10.5l7.2 2 4-.8 6.3-2.4" stroke="var(--brand-accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 6l1.8 5.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ArrivalIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M2 20h20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3 8.5l10.5 3.3 5.5-1.1" stroke="var(--brand-accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 4l1.6 6.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const navItems: { href: string; label: string }[] = [
  { href: "#flights", label: "Flights" },
  { href: "#getting-to-from", label: "Getting To & From" },
  { href: "#parking", label: "Parking" },
  { href: "#at-the-airport", label: "At The Airport" },
  { href: "#enhance-journey", label: "Enhance Your Journey" },
  { href: "#accessibility", label: "Accessibility" },
];

export default function Header() {
  return (
    <header className="bg-brand text-on-brand">
      <div className="mx-auto max-w-7xl px-6">
        {/* Top row: brand left, account actions right */}
        <div className="flex h-16 items-center justify-between gap-6">
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/0 text-on-brand">
                <NadiMark className="h-9 w-9" />
              </span>
              <span className="text-xl font-semibold tracking-tight">NadiAirport</span>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <Link href="#cart" className="inline-flex items-center gap-2 text-sm font-medium text-on-brand/90 hover:text-on-brand">
              <CartIcon />
              <span>Cart</span>
            </Link>
            <Link href="#login" className="inline-flex items-center gap-2 text-sm font-medium text-on-brand/90 hover:text-on-brand">
              <UserIcon />
              <span>Log In</span>
            </Link>
          </div>
        </div>

        {/* Bottom row: primary nav left, CTAs right */}
        <div className="hidden lg:flex h-14 items-center justify-between">
          <nav>
            <ul className="flex items-center gap-10">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[15px] font-medium tracking-tight text-on-brand/90 hover:text-on-brand transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="#departures"
              className="inline-flex items-center gap-3 rounded-full border border-outline px-5 py-2.5 text-sm font-medium hover:bg-white/5"
            >
              <span>Departures</span>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-outline/70 text-on-brand/90">
                <DepartureIcon className="h-4 w-4" />
              </span>
            </Link>
            <Link
              href="#arrivals"
              className="inline-flex items-center gap-3 rounded-full border border-outline px-5 py-2.5 text-sm font-medium hover:bg-white/5"
            >
              <span>Arrivals</span>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-outline/70 text-on-brand/90">
                <ArrivalIcon className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}


