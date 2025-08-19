import Link from "next/link";

function IconWrap({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--color-brand),white_92%)] text-[color:var(--color-brand)] ring-1 ring-black/10">
      {children}
    </span>
  );
}

export default function ContactHelp() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[color:var(--color-brand)]">
          Have questions?
          <br />
          <span className="text-black">We have answers.</span>
        </h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3">
            <IconWrap>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M18 2h3l-7.5 9.1L22 22h-6l-5-6.6L5 22H2l7.7-9.3L2 2h6l4.6 6.1L18 2z" />
              </svg>
            </IconWrap>
            <Link href="#" className="underline text-[color:var(--color-brand)] font-semibold">@NadiAirport</Link>
          </div>

          <div className="flex items-center gap-3">
            <IconWrap>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.3 19.3 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.8.3 1.6.6 2.3a2 2 0 0 1-.5 2.1L8.7 9.6a16 16 0 0 0 6 6l1.5-1.5a2 2 0 0 1 2.1-.5c.7.3 1.5.5 2.3.6a2 2 0 0 1 1.7 1.7z" />
              </svg>
            </IconWrap>
            <Link href="tel:+6790000000" className="underline text-[color:var(--color-brand)] font-semibold">+679 000 0000</Link>
          </div>

          <div className="flex items-center gap-3">
            <IconWrap>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M20 12a8 8 0 1 1-9.3-7.9v3a5 5 0 1 0 6.3 6.3h3z" />
                <path d="M22 12h-2" />
              </svg>
            </IconWrap>
            <Link href="#" className="underline text-[color:var(--color-brand)] font-semibold">WhatsApp Us</Link>
          </div>

          <div className="flex items-center gap-3">
            <IconWrap>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M4 7l8 6 8-6" />
              </svg>
            </IconWrap>
            <Link href="mailto:hello@nadi.airport" className="underline text-[color:var(--color-brand)] font-semibold">Email Us</Link>
          </div>
        </div>
      </div>
    </section>
  );
}


