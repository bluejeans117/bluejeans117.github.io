import { Footer } from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'Vishnu Rajesh | Backend Engineer & Builder',
    template: '%s | Vishnu Rajesh',
  },
  description:
    'Senior backend software engineer, Co-founder & CTO at Prauga, and creator of FlexDoc. Building distributed systems, developer tooling and cloud-native products.',
  keywords: [
    'Vishnu Rajesh',
    'backend engineer',
    'Golang',
    'distributed systems',
    'OpenAPI',
    'FlexDoc',
    'developer tooling',
    'Bengaluru',
  ],
  authors: [{ name: 'Vishnu Rajesh' }],
  openGraph: {
    type: 'website',
    title: 'Vishnu Rajesh | Backend Engineer & Builder',
    description:
      'Backend engineer, product builder and creator of FlexDoc — an open-source OpenAPI documentation renderer and API explorer.',
  },
  icons: {
    icon: [
      { url: '/img/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/img/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/img/favicon/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/img/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
      </head>
      <body className={`${inter.className} relative min-h-screen antialiased`}>
        <div className='pointer-events-none fixed inset-0 -z-10 overflow-hidden' aria-hidden='true'>
          <div className='absolute -left-32 -top-40 h-[520px] w-[520px] rounded-full bg-blue-500/[0.055] blur-3xl dark:bg-blue-400/[0.045]' />
          <div className='absolute -right-32 top-[32%] h-[480px] w-[480px] rounded-full bg-violet-500/[0.045] blur-3xl dark:bg-violet-400/[0.035]' />
        </div>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <div className='relative z-0 flex min-h-screen flex-col'>
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
