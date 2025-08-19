import HeroCarousel from "@/components/HeroCarousel";
import FlightSearchBar from "@/components/FlightSearchBar";
import NewsletterCTA from "@/components/NewsletterCTA";
import FeatureGrid from "@/components/FeatureGrid";
import ShoppingPromo from "@/components/ShoppingPromo";
import GettingToFrom from "@/components/GettingToFrom";
import AtTheAirport from "@/components/AtTheAirport";
import LatestNews from "@/components/LatestNews";
import ContactHelp from "@/components/ContactHelp";

export default function Home() {
  return (
    <div className="min-h-screen w-full text-black">
      <HeroCarousel />
      <FlightSearchBar />
      <FeatureGrid />
      <ShoppingPromo />
      <GettingToFrom />
      <AtTheAirport />
      <LatestNews />
      <ContactHelp />
      {/* Newsletter should be last, slightly overlapping the footer */}
      <NewsletterCTA />
    </div>
  );
}
