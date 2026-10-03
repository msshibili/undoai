import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { PortfolioProvider } from '@/context/PortfolioContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

export const metadata = {
  title: 'undo.ai — Next-Gen Digital & Creative Media Studio',
  description: 'Designing immersive digital experiences, high-converting visual assets, 3D motion graphics, and elite branding for visionary companies.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased bg-[#07080d] text-slate-100 selection:bg-purple-500/30 selection:text-purple-200">
        <LanguageProvider>
          <PortfolioProvider>
            {children}
          </PortfolioProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
