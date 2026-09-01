'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ThemeToggle } from './theme-toggle';

const links = [
  { href: '/about', label: 'About' },
  { href: '/experience', label: 'Experience' },
  { href: '/work', label: 'Projects' },
  { href: '/flexdoc', label: 'FlexDoc' },
  { href: '/contact', label: 'Contact' },
  { href: 'https://blog.realogs.in/', label: 'Blog', external: true },
];

export function Nav() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const previous = previousPathname.current;
    previousPathname.current = pathname;

    // FlexDoc's package stylesheet is intentionally loaded only for renderer/client routes,
    // but Next.js keeps route CSS in the current document during client-side
    // navigation in development. If we leave those routes, force one clean document
    // load so no package-level html/body rules can leak into the portfolio shell.
    const rendererRoutes = ['/flexdoc/demo', '/flexdoc/playground', '/flexdoc/client'];
    const wasRendererRoute = rendererRoutes.some((route) => previous.startsWith(route));
    const isRendererRoute = rendererRoutes.some((route) => pathname.startsWith(route));
    if (wasRendererRoute && !isRendererRoute) {
      window.location.reload();
      return;
    }

    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className='sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-xl'>
      <div className='container mx-auto flex h-16 max-w-7xl items-center justify-between px-4'>
        <Link href='/' className='font-semibold tracking-tight transition hover:text-accent'>
          bluejeans117
        </Link>

        <div className='hidden items-center gap-1 md:flex'>
          <nav className='mr-3 flex items-center rounded-full border border-border bg-card/60 p-1 shadow-sm'>
            {links.map((link) => {
              const active = !link.external && (pathname === link.href || (link.href === '/flexdoc' && pathname.startsWith('/flexdoc/')));
              const className = `rounded-full px-3 py-1.5 text-sm transition ${active ? 'bg-foreground text-background shadow-sm' : 'text-foreground/58 hover:text-foreground'}`;
              return link.external ? (
                <a key={link.href} href={link.href} target='_blank' rel='noopener noreferrer' className={className}>{link.label}</a>
              ) : (
                <Link key={link.href} href={link.href} className={className}>{link.label}</Link>
              );
            })}
          </nav>
          <ThemeToggle />
        </div>

        <div className='flex items-center gap-2 md:hidden'>
          <ThemeToggle />
          <button
            type='button'
            onClick={() => setIsMenuOpen((open) => !open)}
            className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card'
            aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className='fixed inset-x-0 top-16 z-50 h-[calc(100dvh-4rem)] border-t border-border bg-background/95 px-4 py-6 backdrop-blur-2xl md:hidden'>
          <nav className='container mx-auto grid max-w-lg gap-2'>
            <Link href='/' className={`rounded-xl px-4 py-3 text-base font-medium ${pathname === '/' ? 'bg-accent/10 text-accent' : 'text-foreground/70'}`}>Home</Link>
            {links.map((link) => {
              const active = !link.external && (pathname === link.href || (link.href === '/flexdoc' && pathname.startsWith('/flexdoc/')));
              const className = `rounded-xl px-4 py-3 text-base font-medium ${active ? 'bg-accent/10 text-accent' : 'text-foreground/70'}`;
              return link.external ? (
                <a key={link.href} href={link.href} target='_blank' rel='noopener noreferrer' className={className}>{link.label} ↗</a>
              ) : (
                <Link key={link.href} href={link.href} className={className}>{link.label}</Link>
              );
            })}
          </nav>
          <div className='container mx-auto mt-6 max-w-lg rounded-2xl border border-blue-500/15 bg-blue-500/5 p-4'>
            <div className='text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-300'>Now shipping</div>
            <Link href='/flexdoc' className='mt-2 block font-semibold'>FlexDoc 2.2 →</Link>
          </div>
        </div>
      )}
    </header>
  );
}
