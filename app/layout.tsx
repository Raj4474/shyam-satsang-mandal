import type { Metadata, Viewport } from 'next';
import { Anek_Gujarati } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const anekGujarati = Anek_Gujarati({
  subsets: ['gujarati', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-gujarati',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#450A0A',
};

export const metadata: Metadata = {
  title: 'શ્યામ સત્સંગ મંડળ | ગુજરાતી ભજન અને ધૂન ડિજિટલ લાઈબ્રેરી',
  description: 'સંતવાણી પદ અને શામજીબાપાના જીવન ચરિત્રનું દિવ્ય સંગ્રહાલય.',
  keywords: ['Gujarati Bhajan', 'Dhun', 'Shyamji Bapa', 'Satsang', 'Gujarati Devotional'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="gu" className={`scroll-smooth ${anekGujarati.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased flex flex-col min-h-screen bg-cream-50 text-maroon-950">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
