"use client";

function ArrowRightIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 12h14" strokeLinecap="round" />
      <path d="M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" strokeLinecap="round" />
    </svg>
  );
}

function PlaneIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M2 20h20" strokeLinecap="round" />
      <path d="M3 9l12 4 4-1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 5l2 6" strokeLinecap="round" />
    </svg>
  );
}

export default function NewsletterCTA() {
  return (
    <div className="relative z-10 -mb-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-visible rounded-[28px] bg-[color-mix(in_oklab,white_90%,var(--color-brand)_10%)] text-black ring-1 ring-black/5 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-start gap-8">
            <div className="max-w-3xl">
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-brand">
                Subscribe and Get 10% off Fast Track & Lounges
              </h3>
              <p className="mt-6 text-sm text-black/70 max-w-2xl">
                By clicking &apos;Subscribe&apos; you agree to the website&apos;s
                <a href="#" className="underline decoration-[color:var(--color-brand)]/40 underline-offset-4 ml-1">terms and conditions</a>
                <span> and </span>
                <a href="#" className="underline decoration-[color:var(--color-brand)]/40 underline-offset-4">privacy notice</a>.
              </p>
            </div>
            <div className="w-full flex lg:block items-start justify-start">
              <a href="#waitlist" className="inline-flex items-center justify-center gap-3 rounded-full bg-[color:var(--color-brand)] text-on-brand h-12 px-6 font-semibold shadow-sm hover:brightness-110">
                Subscribe
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full ring-1 ring-black/10 bg-[color:var(--color-on-brand)] text-[color:var(--color-brand)]">
                  <ArrowRightIcon className="h-4 w-4" />
                </span>
              </a>
            </div>
          </div>

          {/* Floating badges */}
          <div className="pointer-events-none">
            <div className="absolute -bottom-8 right-24 h-16 w-16 rounded-full bg-[color-mix(in_oklab,var(--color-brand),white_40%)] text-on-brand inline-flex items-center justify-center shadow-md ring-1 ring-black/10">
              <MailIcon />
            </div>
            <div className="absolute -bottom-8 right-6 h-16 w-16 rounded-full bg-[color:var(--color-brand-accent)] text-black/90 inline-flex items-center justify-center shadow-md ring-1 ring-black/10">
              <PlaneIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


