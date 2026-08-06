import { AboutSection } from "@/components/sections/AboutSection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Hero } from "@/components/sections/Hero";
import { MaterialIntelligence } from "@/components/sections/MaterialIntelligence";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { SelectedWorks } from "@/components/sections/SelectedWorks";
import { site } from "@/data/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Artist, designer and metal fabricator",
    url: "https://djuppe.example",
    sameAs: [site.instagram],
    address: { "@type": "PostalAddress", addressLocality: "Athens", addressCountry: "GR" },
    knowsAbout: ["Metal sculpture", "Industrial design", "Structural fabrication", "Kinetic systems"],
  };

  return (
    <main id="main-content" className="site-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <SelectedWorks />
      <MaterialIntelligence />
      <ProcessSection />
      <AboutSection />
      <CapabilitiesSection />
      <ContactSection />
    </main>
  );
}
