import { Footer } from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portfolio | Vishnu Rajesh',
  description: 'Solutions Architect and Software Engineer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link
          rel='stylesheet'
          href='https://use.fontawesome.com/releases/v5.7.2/css/all.css'
          integrity='sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr'
          crossOrigin='anonymous'
        />
      </head>
      <body
        className={`${inter.className} relative min-h-screen bg-background/95 antialiased`}
      >
        <div className='fixed inset-0 -z-10'>
          <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 dark:opacity-25'
            style={{
              backgroundImage: "url('/img/background.jpg')",
              backgroundBlendMode: 'soft-light',
            }}
          />
        </div>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div className='relative z-0'>
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
