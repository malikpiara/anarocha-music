import type { Metadata } from 'next';
import { Cormorant_Garamond, Nunito_Sans } from 'next/font/google';
import './globals.css';
import { CSPostHogProvider } from './providers';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const nunito = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ana Rocha Music',
  description:
    'Ana Rocha is a singer, lyricist and composer, based in Berlin and Brussels, with German and Portuguese roots.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <CSPostHogProvider>
        <body
          className={`${cormorant.variable} ${nunito.variable} font-sans antialiased`}
        >
          {children}
        </body>
      </CSPostHogProvider>
    </html>
  );
}
