import Image from "next/image";
import Link from "next/link";
import { NadiMark } from "@/components/Header";

export default function Footer() {
  return (
    <footer className="relative bg-brand text-on-brand border-t border-outline/40 pt-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex items-start gap-4">
            <div className="mt-1 inline-flex h-12 w-12 items-center justify-center rounded-full ring-1 ring-white/10">
              <NadiMark className="h-10 w-10" />
            </div>
            <div>
              <div className="text-2xl font-semibold tracking-tight">NadiAirport</div>
              <p className="mt-2 text-sm text-on-brand/70 max-w-sm">
                Your smart companion for Nadi International Airport. Flights, parking, and journey tips.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <ul className="space-y-3 text-on-brand/90">
              <li><Link href="#" className="hover:underline">Shop Duty Free</Link></li>
              <li><Link href="#" className="hover:underline">Airport Map</Link></li>
              <li><Link href="#" className="hover:underline">Parking</Link></li>
              <li><Link href="#" className="hover:underline">Accessibility</Link></li>
              <li><Link href="#" className="hover:underline">Privacy Policy</Link></li>
            </ul>
            <ul className="space-y-3 text-on-brand/90">
              <li><Link href="#" className="hover:underline">Corporate</Link></li>
              <li><Link href="#" className="hover:underline">News</Link></li>
              <li><Link href="#" className="hover:underline">Contact Us</Link></li>
              <li><Link href="#" className="hover:underline">Sitemap</Link></li>
              <li><Link href="#" className="hover:underline">Cookie Settings</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between border-t border-outline/40 py-6 text-sm text-on-brand/70">
          <div>© {new Date().getFullYear()} Nadi Airport. All rights reserved.</div>
          <div className="mt-4 sm:mt-0 inline-flex items-center gap-4">
            <Link href="#" aria-label="Instagram" className="hover:text-on-brand">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.5"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg>
            </Link>
            <Link href="#" aria-label="LinkedIn" className="hover:text-on-brand">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0zM8 8h4.8v2.2h.1c.7-1.3 2.4-2.7 5-2.7 5.3 0 6.3 3.5 6.3 8.1V24H19v-7.1c0-1.7 0-3.9-2.4-3.9s-2.8 1.8-2.8 3.8V24H8z"/></svg>
            </Link>
            <Link href="#" aria-label="Facebook" className="hover:text-on-brand">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.1V12h2.1V9.7c0-2 1.2-3.1 3-3.1.9 0 1.8.1 2.7.2v2.4h-1.5c-1.3 0-1.7.8-1.7 1.6V12h2.9l-.5 2.9h-2.4v7A10 10 0 0 0 22 12"/></svg>
            </Link>
            <Link href="#" aria-label="X" className="hover:text-on-brand">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18 2H6a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4zm-2.1 5.7l1.4 1.4-3.5 3.5 3.5 3.6-1.4 1.4L12 14l-3.6 3.5-1.4-1.4L10.5 12 7 8.5l1.4-1.4L12 10.6l3.9-3z"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


