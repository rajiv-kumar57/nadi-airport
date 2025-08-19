import Image from "next/image";

export default function ShoppingPromo() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[color:var(--color-brand)]">
          Airport Shopping
        </h2>

        <div
          className="mt-6 grid gap-4 grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] lg:grid-rows-2"
          style={{ gridTemplateRows: "minmax(22rem,1fr) minmax(22rem,1fr)" }}
        >
          {/* Big feature card */}
          <a href="#" className="group relative overflow-hidden rounded-3xl ring-1 ring-black/10 bg-white shadow-sm lg:row-span-2 lg:col-start-1">
            <div className="relative h-full min-h-[22rem] lg:min-h-[44rem]">
              <Image
                src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1600&auto=format&fit=crop"
                alt="Duty free click & collect"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xl sm:text-2xl font-semibold">
                  Buy before you fly with Click & Collect at Nadi Airport Duty Free
                </p>
                <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-brand-accent)] text-black px-4 py-2 text-sm font-semibold">
                  Shop Now
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" strokeLinecap="round"/><path d="M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </div>
            </div>
          </a>

          {/* Right column promos */}
          <a href="#" className="group relative overflow-hidden rounded-3xl ring-1 ring-black/10 bg-white shadow-sm lg:col-start-2 lg:row-start-1">
            <div className="relative h-full min-h-[22rem]">
              <Image
                src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop"
                alt="Airport exclusive"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-lg font-semibold">Airport Exclusive</p>
              </div>
            </div>
          </a>

          <a href="#" className="group relative overflow-hidden rounded-3xl ring-1 ring-black/10 bg-white shadow-sm lg:col-start-2 lg:row-start-2">
            <div className="relative h-full min-h-[22rem]">
              <Image
                src="https://images.unsplash.com/photo-1556228724-4a07121dfa9e?q=80&w=1200&auto=format&fit=crop"
                alt="Beauty savings"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-lg font-extrabold">Save at least 15% on Beauty</p>
              </div>
            </div>
          </a>

          <a href="#" className="group relative overflow-hidden rounded-3xl ring-1 ring-black/10 bg-white shadow-sm lg:col-start-3 lg:row-span-2">
            <div className="relative h-full min-h-[22rem] lg:min-h-[44rem]">
              <Image
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop"
                alt="Duty free brand"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xl font-extrabold tracking-widest text-white">DUTY FREE</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}


