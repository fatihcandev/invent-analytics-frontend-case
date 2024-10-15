import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from './providers';
import { ThemeProvider } from './components';
import './globals.css';

export const metadata: Metadata = {
  title: 'Movie Lens',
  description: 'Find the movies you love, from blockbusters to hidden gems.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ThemeProvider>{children}</ThemeProvider>
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
