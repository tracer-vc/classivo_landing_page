import { brand } from "@/config/brand";
import { faq } from "@/config/content";

/**
 * Strukturierte Daten (schema.org) für Suchmaschinen und KI-Assistenten.
 * Unsichtbar auf der Seite. Beschreibt Organisation, Website, die App und die FAQ.
 */
export function JsonLd() {
  const url = brand.url;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${url}/#organization`,
        name: brand.name,
        url,
        logo: `${url}/icons/icon-512.png`,
        email: brand.contactEmail,
        sameAs: [brand.instagram.url],
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        name: brand.name,
        url,
        inLanguage: "de-DE",
        publisher: { "@id": `${url}/#organization` },
      },
      {
        "@type": "MobileApplication",
        "@id": `${url}/#app`,
        name: brand.name,
        description: brand.description,
        url,
        image: `${url}/icons/icon-512.png`,
        operatingSystem: "iOS, iPadOS",
        applicationCategory: "EducationalApplication",
        inLanguage: "de-DE",
        audience: { "@type": "EducationalAudience", educationalRole: "student" },
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
        publisher: { "@id": `${url}/#organization` },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}/#faq`,
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // „<“ escapen, damit kein HTML aus den Texten ausbrechen kann (Empfehlung der Next.js-Doku)
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
