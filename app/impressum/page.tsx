import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Impressum — Ana Rocha Music',
  robots: { index: false },
};

const heading = { fontSize: 20 };
const body: React.CSSProperties = {
  fontSize: 15,
  lineHeight: 1.7,
  color: 'rgba(237,232,244,0.6)',
};

export default function Impressum() {
  return (
    <div className='flex flex-col items-center min-h-screen pt-20 pb-16 px-6 animate-in'>
      <main className='w-full' style={{ maxWidth: 640 }}>
        <h1 className='font-heading text-4xl text-lavender tracking-tight mb-10'>
          Impressum
        </h1>

        <section className='space-y-2 mb-10' style={body}>
          <p
            style={{ fontSize: 13, color: 'rgba(237,232,244,0.35)' }}
            className='uppercase tracking-wider'
          >
            Angaben gemäß § 5 TMG
          </p>
          <p style={{ color: '#ede8f4' }}>Ana Milena da Rocha Gaspar</p>
          <p>Sängerin, Gesangslehrerin, Texterin, Komponistin</p>
          <p>
            Bülowstr. 52
            <br />
            10783 Berlin
          </p>
          <p>Kontakt E-Mail: anarochamusic[at]gmail.com</p>
        </section>

        <section className='mb-10' style={body}>
          <h2 className='font-heading text-white/80 mb-3' style={heading}>
            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
          </h2>
          <p>Ana Milena da Rocha Gaspar | Bülowstr. 52 | 10783 Berlin</p>
        </section>

        <section className='mb-10' style={body}>
          <h2 className='font-heading text-white/80 mb-3' style={heading}>
            EU-Streitschlichtung
          </h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit:{' '}
            <a
              href='https://ec.europa.eu/consumers/odr'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-lavender underline underline-offset-4'
              style={{ transition: 'color 200ms ease' }}
            >
              https://ec.europa.eu/consumers/odr
            </a>
            . Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>
        </section>

        <section className='mb-10' style={body}>
          <h2 className='font-heading text-white/80 mb-3' style={heading}>
            Verbraucherstreitbeilegung/Universalschlichtungsstelle
          </h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.
          </p>
        </section>

        <section className='mb-10' style={body}>
          <h2 className='font-heading text-white/80 mb-3' style={heading}>
            Haftung für Inhalte
          </h2>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte
            auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
            Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
            verpflichtet, übermittelte oder gespeicherte fremde Informationen
            zu überwachen oder nach Umständen zu forschen, die auf eine
            rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung
            oder Sperrung der Nutzung von Informationen nach den allgemeinen
            Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist
            jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
            Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
            Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>
        </section>

        <section className='mb-10' style={body}>
          <h2 className='font-heading text-white/80 mb-3' style={heading}>
            Haftung für Links
          </h2>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren
            Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
            fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
            verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
            der Seiten verantwortlich. Die verlinkten Seiten wurden zum
            Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
            Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
            erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten
            Seiten ist jedoch ohne konkrete Anhaltspunkte einer
            Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
            Rechtsverletzungen werden wir derartige Links umgehend entfernen.
          </p>
        </section>

        <section className='mb-12' style={body}>
          <h2 className='font-heading text-white/80 mb-3' style={heading}>
            Urheberrecht
          </h2>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
            diesen Seiten unterliegen dem deutschen Urheberrecht. Die
            Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            Downloads und Kopien dieser Seite sind nur für den privaten, nicht
            kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser
            Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
            Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
            gekennzeichnet. Sollten Sie trotzdem auf eine
            Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
            entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
            werden wir derartige Inhalte umgehend entfernen.
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
