// Code: Page component for the home page
import { Navigation } from "@/components/Navigation";
import { Body } from "@/components/Body";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Body />
      <Footer />
    </div>
  );
}
