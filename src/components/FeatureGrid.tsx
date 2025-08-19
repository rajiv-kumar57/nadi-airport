import Image from "next/image";

type Card = {
  id: string;
  title: string;
  image: string;
  href: string;
  priceLabel?: string; // optional pill like "FROM €7.99"
  description?: string;
};

const placeholders: Card[] = [
  {
    id: "parking",
    title: "Parking",
    image: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1400&auto=format&fit=crop",
    href: "#",
    description: "Book early for the best rates at the airport's closest car parks",
  },
  {
    id: "fast-track",
    title: "Fast Track",
    priceLabel: "FROM €7.99",
    image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=1400&auto=format&fit=crop",
    href: "#",
    description: "Breeze through security and travel at your own pace",
  },
  {
    id: "lounges",
    title: "Lounges",
    priceLabel: "From €26",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1400&auto=format&fit=crop",
    href: "#",
    description: "Relax and unwind with complimentary food and drinks",
  },
  {
    id: "platinum-vip",
    title: "Platinum VIP",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1400&auto=format&fit=crop",
    href: "#",
    description: "Private check-in, a luxury suite, and a chauffeur to your plane",
  },
  {
    id: "airport-club",
    title: "The Airport Club",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1400&auto=format&fit=crop",
    href: "#",
    description: "Unlimited access to car parks, Fast Track, lounges, and more",
  },
];

export default function FeatureGrid({ cards = placeholders }: { cards?: Card[] }) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {cards.map((c) => (
            <a
              key={c.id}
              href={c.href}
              className="group overflow-hidden rounded-2xl ring-1 ring-black/10 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <Image src={c.image} alt="" fill className="object-cover" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-[color:var(--color-brand)] group-hover:underline">
                    {c.title}
                  </h3>
                  {c.priceLabel && (
                    <span className="rounded-full bg-[color:var(--color-brand)]/10 px-2 py-0.5 text-[11px] font-medium text-[color:var(--color-brand)]">
                      {c.priceLabel}
                    </span>
                  )}
                </div>
                {c.description && (
                  <p className="mt-1 text-sm text-black/70">{c.description}</p>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}


