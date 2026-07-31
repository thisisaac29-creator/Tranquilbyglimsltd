import HeroSection from "../sections/HeroSection";
import AboutSection from "../sections/AboutSection";
import MenuSection from "../sections/MenuSection";
import GallerySection from "../sections/GallerySection";
import EventSection from "../sections/EventSection";
import TestimonialsSection from "../sections/TestimonialsSection";
import ReservationCTA from "../sections/ReservationCTA";
import ContactFooterSection from "../sections/ContactFooterSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <GallerySection />
      <EventSection />
      <TestimonialsSection />
      <ReservationCTA />
      <ContactFooterSection />
    </>
  );
}
