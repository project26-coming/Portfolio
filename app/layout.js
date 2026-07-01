import { Inter, JetBrains_Mono, Anton } from 'next/font/google';
import './globals.css';

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-hero-body',
  display: 'swap',
});

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-hero-mono',
  display: 'swap',
});

const displayFont = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-hero-display',
  display: 'swap',
});

export const metadata = {
  title: 'Kadimetla Varsha — Frontend Engineer',
  description: 'Cinematic, motion-driven interactive portfolio.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${monoFont.variable} ${displayFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
