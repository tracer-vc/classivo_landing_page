import type { Metadata } from "next";
import { LegalPage, Todo } from "@/components/LegalPage";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  alternates: { canonical: "/datenschutz" },
  robots: { index: false, follow: true },
};

// Stand November 2026. Vor dem Livegang: Hosting-Anbieter und Supabase-Region eintragen und rechtlich prüfen lassen.
export default function Datenschutz() {
  const { legal, contactEmail } = brand;
  const mail = (
    <a href={`mailto:${contactEmail}`} className="font-bold text-ink underline">
      {contactEmail}
    </a>
  );

  return (
    <LegalPage title="Datenschutzerklärung">
      <p className="text-sm">Stand: November 2026</p>

      <h2>Kurz gesagt</h2>
      <p>
        Wir sammeln nur, was wir für die Beta-Warteliste brauchen: deine E-Mail-Adresse, ob du 16 oder älter bist, und ein paar
        freiwillige Angaben. Keine Werbung, kein Verkauf und keine Weitergabe deiner Daten, keine Cookies, kein Tracking. Du kannst
        dich jederzeit wieder abmelden.
      </p>

      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
      </p>
      <p>
        {legal.name}
        <br />
        {legal.street}
        <br />
        {legal.zipCity}
        <br />
        {legal.country}
        <br />
        E-Mail: {mail}
      </p>

      <h2>2. Besuch der Website</h2>
      <p>
        Wenn du diese Website aufrufst, übermittelt dein Browser automatisch technische Daten an den Server, auf dem die Seite läuft:
        IP-Adresse, Datum und Uhrzeit des Abrufs, aufgerufene Seite, Browser und Betriebssystem sowie die zuvor besuchte Seite
        (Referrer). Diese Daten sind nötig, um die Seite auszuliefern und sicher zu betreiben, zum Beispiel um Angriffe zu erkennen.
      </p>
      <p>
        Rechtsgrundlage ist unser berechtigtes Interesse an einem sicheren und funktionierenden Webangebot (Art. 6 Abs. 1 lit. f
        DSGVO). Die Server-Logs werden von unserem Hosting-Anbieter Vercel (siehe Abschnitt 5) nur für begrenzte Zeit vorgehalten und
        danach automatisch gelöscht.
      </p>
      <p>
        Zum Schutz vor Spam und automatisierten Massen-Anmeldungen wird deine IP-Adresse beim Absenden des Formulars außerdem kurzzeitig
        im Arbeitsspeicher des Servers gezählt (höchstens 10 Minuten) und nicht dauerhaft gespeichert.
      </p>

      <h2>3. Beta-Warteliste</h2>
      <p>Wenn du dich für die Beta einträgst, speichern wir:</p>
      <ul>
        <li>
          <strong>Pflichtangaben:</strong> deine E-Mail-Adresse und deine Antwort auf die Frage, ob du 16 oder älter bist. Bist du
          jünger, zusätzlich die E-Mail-Adresse eines Elternteils.
        </li>
        <li>
          <strong>Nachweis deiner Einwilligung:</strong> den genauen Wortlaut der Einwilligung, die du bestätigt hast, und den Zeitpunkt.
        </li>
        <li>
          <strong>Herkunft der Anmeldung:</strong> falls du über einen markierten Link oder QR-Code kommst (zum Beispiel von einem
          Event), eine kurze Quellenangabe wie „yfc“. So sehen wir, welche Kanäle funktionieren.
        </li>
        <li>
          <strong>Freiwillige Angaben</strong> nach der Anmeldung: Klasse, Bundesland bzw. Land, welche Geräte du im Unterricht
          nutzt, ob dein Schul-iPad von der Schule verwaltet wird, und was dich an Schule am meisten nervt. Du kannst diesen Schritt
          überspringen.
        </li>
      </ul>
      <p>
        <strong>Zweck:</strong> dich zur Beta einzuladen, dir Informationen zur Beta per E-Mail zu schicken und die App so zu
        entwickeln, dass sie zu euch passt. Die freiwilligen Angaben werten wir nur zusammengefasst aus, zum Beispiel „wie viele
        nutzen ein iPad im Unterricht“.
      </p>
      <p>
        <strong>Rechtsgrundlage</strong> ist deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Die Angaben sind freiwillig. Ohne
        E-Mail-Adresse können wir dich allerdings nicht zur Beta einladen.
      </p>
      <p>
        <strong>Unter 16:</strong> Bist du jünger als 16, ist deine Einwilligung nur mit Zustimmung deiner Eltern gültig (Art. 8 DSGVO).
        Deshalb fragen wir nach der E-Mail-Adresse eines Elternteils und holen die Zustimmung per E-Mail ein, bevor du Beta-Mails
        bekommst oder an der Beta teilnimmst.
      </p>


      <h2>4. Kontakt per E-Mail</h2>
      <p>
        Wenn du uns eine E-Mail schreibst, verarbeiten wir deine Adresse und den Inhalt deiner Nachricht, um dir zu antworten
        (Art. 6 Abs. 1 lit. f DSGVO, bei Fragen zur Beta auch lit. b). Die Nachricht löschen wir, sobald dein Anliegen erledigt ist
        und keine gesetzlichen Aufbewahrungspflichten bestehen.
      </p>

      <h2>5. Dienstleister</h2>
      <p>
        Wir geben deine Daten nicht an Dritte weiter. Für den technischen Betrieb nutzen wir Dienstleister, die deine Daten nur in
        unserem Auftrag und nach unserer Weisung verarbeiten (Auftragsverarbeitung nach Art. 28 DSGVO):
      </p>
      <ul>
        <li>
          <strong>Hosting der Website:</strong> Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. Die Seite wird über
          das weltweite Netzwerk von Vercel ausgeliefert, die serverseitige Verarbeitung des Anmeldeformulars läuft in Frankfurt am
          Main. Mit Vercel besteht ein Auftragsverarbeitungsvertrag (DPA).
        </li>
        <li>
          <strong>Datenbank für die Warteliste:</strong> Supabase Inc., USA. Die Datenbank liegt in der Region{" "}
          <Todo>Region des Supabase-Projekts, z. B. Frankfurt (eu-central-1)</Todo>. Mit Supabase besteht ein
          Auftragsverarbeitungsvertrag (DPA). <Todo>DPA im Supabase-Dashboard abschließen/prüfen</Todo>
        </li>
      </ul>
      <p>
        Da die genannten Anbieter ihren Sitz in den USA haben, kann ein Zugriff aus einem Drittland nicht ausgeschlossen werden. Die
        Übermittlung ist über die Standardvertragsklauseln der EU-Kommission (Art. 46 Abs. 2 lit. c DSGVO) bzw. eine Zertifizierung
        nach dem EU-US Data Privacy Framework (Art. 45 DSGVO) abgesichert.
      </p>
      <p>Einen Dienstleister für den Versand von E-Mails nutzen wir derzeit nicht.</p>

      <h2>6. Speicherdauer</h2>
      <p>
        Deine Anmeldung speichern wir, bis du dich abmeldest oder deine Einwilligung widerrufst. Dann löschen wir deine Daten.
      </p>

      <h2>7. Cookies, Tracking und Schriftarten</h2>
      <p>
        Diese Website setzt keine Cookies und nutzt keine Analyse- oder Tracking-Dienste. Es werden auch keine Daten im Speicher
        deines Browsers abgelegt. Die Schriftart wird von unserem eigenen Server geladen, es findet keine Verbindung zu Google statt.
      </p>

      <h2>8. Links zu Instagram</h2>
      <p>
        Auf dieser Seite verlinken wir auf unseren Instagram-Account @{brand.instagram.handle}. Es handelt sich um einen einfachen
        Link: Erst wenn du darauf klickst, wirst du zu Instagram (Meta Platforms Ireland Ltd.) weitergeleitet. Ab dann gilt die
        Datenschutzerklärung von Instagram.
      </p>

      <h2>9. Deine Rechte</h2>
      <p>Du hast jederzeit das Recht auf:</p>
      <ul>
        <li>Auskunft über deine gespeicherten Daten (Art. 15 DSGVO)</li>
        <li>Berichtigung falscher Daten (Art. 16 DSGVO)</li>
        <li>Löschung deiner Daten (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch gegen Verarbeitungen auf Grundlage unseres berechtigten Interesses (Art. 21 DSGVO)</li>
      </ul>
      <p>
        <strong>Widerruf:</strong> Du kannst deine Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3
        DSGVO). Eine kurze E-Mail an {mail} reicht, später auch über den Abmeldelink in unseren E-Mails. Die Verarbeitung bis zum
        Widerruf bleibt rechtmäßig.
      </p>

      <h2>10. Beschwerde bei einer Aufsichtsbehörde</h2>
      <p>
        Du kannst dich bei einer Datenschutz-Aufsichtsbehörde beschweren, wenn du meinst, dass wir deine Daten nicht richtig
        verarbeiten (Art. 77 DSGVO). Für uns zuständig ist:
      </p>
      <p>
        Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg
        <br />
        Lautenschlagerstraße 20, 70173 Stuttgart
      </p>

      <h2>11. Keine automatisierten Entscheidungen</h2>
      <p>Wir treffen keine automatisierten Entscheidungen und erstellen keine Profile über dich (Art. 22 DSGVO).</p>

      <h2>12. Änderungen</h2>
      <p>
        Wenn sich die Website oder die rechtlichen Vorgaben ändern, passen wir diese Datenschutzerklärung an. Es gilt die jeweils hier
        veröffentlichte Fassung.
      </p>
    </LegalPage>
  );
}
