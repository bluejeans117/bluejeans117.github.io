import { Footer } from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portfolio | Vishnu Rajesh',
  description: 'Solutions Architect and Software Engineer',
  icons: {
    icon: [
      {
        url: '/img/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/img/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      { url: '/img/favicon/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
    ],
    apple: [
      {
        url: '/img/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/img/favicon/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/img/favicon/android-chrome-512x512.png',
      },
    ],
  },
  manifest: '/site.webmanifest',
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
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
          integrity='sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=='
          crossOrigin='anonymous'
          referrerPolicy='no-referrer'
        />
        <link
          rel='icon'
          type='image/png'
          href='/img/favicon/favicon-16x16.png'
          sizes='16x16'
        />
        <link
          rel='icon'
          type='image/png'
          href='/img/favicon/favicon-32x32.png'
          sizes='32x32'
        />
        <link
          rel='icon'
          type='image/x-icon'
          href='/img/favicon/favicon.ico'
          sizes='48x48'
        />
        <link
          rel='apple-touch-icon'
          type='image/png'
          href='/img/favicon/apple-touch-icon.png'
          sizes='180x180'
        />
        <link
          rel='android-chrome-192x192'
          href='/img/favicon/android-chrome-192x192.png'
        />
        <link
          rel='android-chrome-512x512'
          href='/img/favicon/android-chrome-512x512.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
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
