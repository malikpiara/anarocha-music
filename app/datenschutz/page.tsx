import type { Metadata } from 'next';
import Link from 'next/link';

/*
 * Datenschutzerklärung — drafted from standard German GDPR boilerplate to
 * match the site's real data flows (Vercel hosting, Supabase newsletter
 * storage, PostHog analytics). This is NOT legal advice; have Ana or a
 * lawyer review the wording before relying on it.
 */

export const metadata: Metadata = {
  title: 'Datenschutzerklärung — Ana Rocha Music',
  robots: { index: false },
};

const heading = { fontSize: 20 };
const body: React.CSSProperties = {
  fontSize: 15,
  lineHeight: 1.7,
  color: 'rgba(237,232,244,0.6)',
};

export default function Datenschutz() {
  return (
    <div className='flex flex-col items-center min-h-screen pt-20 pb-16 px-6 animate-in'>
      <main className='w-full' style={{ maxWidth: 640 }}>
        <h1 className='font-heading text-4xl text-lavender tracking-tight mb-10'>
          Datenschutzerklärung
        </h1>

        <section className='mb-10' style={body}>
          <h2 className='font-heading text-white/80 mb-3' style={heading}>
            Verantwortliche Stelle
          </h2>
          <p>
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          </p>
          <p className='mt-2' style={{ color: '#ede8f4' }}>
            Ana Milena da Rocha Gaspar
          </p>
          <p>
            Bülowstr. 52
            <br />
            10783 Berlin
          </p>
          <p>E-Mail: anarochamusic[at]gmail.com</p>
        </section>

        <section className='mb-10' style={body}>
          <h2 className='font-heading text-white/80 mb-3' style={heading}>
            Hosting
          </h2>
          <p>
            Diese Website wird bei Vercel Inc. (340 S Lemon Ave #4133, Walnut,
            CA 91789, USA) gehostet. Beim Aufruf der Website werden durch den
            Hoster automatisch Informationen in Server-Logfiles erfasst, die
            Ihr Browser übermittelt (z. B. IP-Adresse, Datum und Uhrzeit des
            Zugriffs, aufgerufene Seiten). Diese Daten sind technisch
            erforderlich, um die Website auszuliefern und ihre Stabilität und
            Sicherheit zu gewährleisten. Rechtsgrundlage ist unser berechtigtes
            Interesse an einem sicheren und effizienten Betrieb der Website
            (Art. 6 Abs. 1 lit. f DSGVO). Mit dem Anbieter besteht ein Vertrag
            zur Auftragsverarbeitung; die Übermittlung in die USA ist durch
            Standardvertragsklauseln abgesichert.
          </p>
        </section>

        <section className='mb-10' style={body}>
          <h2 className='font-heading text-white/80 mb-3' style={heading}>
            Newsletter
          </h2>
          <p>
            Wenn Sie den auf dieser Website angebotenen Newsletter abonnieren,
            verarbeiten wir die von Ihnen angegebene E-Mail-Adresse
            ausschließlich, um Ihnen gelegentlich Neuigkeiten zu Musik,
            Konzerten und weiteren Ankündigungen von Ana Rocha zuzusenden.
          </p>
          <p className='mt-3'>
            Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
            Sie können diese Einwilligung jederzeit mit Wirkung für die Zukunft
            widerrufen, etwa über den Abmeldelink in jeder Newsletter-E-Mail
            oder per Nachricht an die oben genannte E-Mail-Adresse. Nach der
            Abmeldung wird Ihre E-Mail-Adresse aus dem Newsletter-Verteiler
            gelöscht.
          </p>
          <p className='mt-3'>
            Die E-Mail-Adressen werden bei unserem Dienstleister Supabase Inc.
            gespeichert, der die Daten in unserem Auftrag auf Servern innerhalb
            der Europäischen Union verarbeitet. Mit dem Anbieter besteht ein
            Vertrag zur Auftragsverarbeitung.
          </p>
        </section>

        <section className='mb-10' style={body}>
          <h2 className='font-heading text-white/80 mb-3' style={heading}>
            Reichweitenmessung mit PostHog
          </h2>
          <p>
            Zur anonymisierten Analyse der Nutzung unserer Website setzen wir
            PostHog ein. PostHog hilft uns zu verstehen, wie Besucher die
            Website verwenden, damit wir sie verbessern können. Die dabei
            erhobenen Daten werden auf Servern innerhalb der Europäischen Union
            (eu.posthog.com) verarbeitet. Rechtsgrundlage ist unser
            berechtigtes Interesse an einer bedarfsgerechten Gestaltung der
            Website (Art. 6 Abs. 1 lit. f DSGVO).
          </p>
        </section>

        <section className='mb-10' style={body}>
          <h2 className='font-heading text-white/80 mb-3' style={heading}>
            SSL-/TLS-Verschlüsselung
          </h2>
          <p>
            Diese Website nutzt aus Sicherheitsgründen eine SSL-/TLS-
            Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran,
            dass die Adresszeile des Browsers mit „https://“ beginnt.
          </p>
        </section>

        <section className='mb-12' style={body}>
          <h2 className='font-heading text-white/80 mb-3' style={heading}>
            Ihre Rechte
          </h2>
          <p>
            Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen
            jederzeit das Recht auf unentgeltliche Auskunft über Ihre
            gespeicherten personenbezogenen Daten sowie ein Recht auf
            Berichtigung, Einschränkung der Verarbeitung, Datenübertragbarkeit
            und Löschung dieser Daten. Sofern die Verarbeitung auf Ihrer
            Einwilligung beruht, können Sie diese jederzeit für die Zukunft
            widerrufen. Ihnen steht zudem ein Beschwerderecht bei einer
            Datenschutz-Aufsichtsbehörde zu. Für Anfragen und zur Ausübung
            Ihrer Rechte wenden Sie sich bitte an die oben genannte
            verantwortliche Stelle.
          </p>
        </section>

        <Link
          href='/'
          className='hover:text-lavender'
          style={{
            fontSize: 15,
            color: 'rgba(237,232,244,0.4)',
            transition: 'color 200ms ease',
          }}
        >
          ← Zurück zur Startseite
        </Link>
      </main>
    </div>
  );
}
