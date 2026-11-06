import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { brand } from "@/config/brand";

export const metadata: Metadata = { title: "Impressum", alternates: { canonical: "/impressum" }, robots: { index: false, follow: true } };

export default function Impressum() {
  const { legal, contactEmail } = brand;
  return (
    <LegalPage title="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        {legal.name}
        <br />
        {legal.street}
        <br />
        {legal.zipCity}
        <br />
        {legal.country}
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail:{" "}
        <a href={`mailto:${contactEmail}`} className="font-bold text-ink underline">
          {contactEmail}
        </a>
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        {legal.name}
        <br />
        {legal.street}
        <br />
        {legal.zipCity}
      </p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
    </LegalPage>
  );
}
