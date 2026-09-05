'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/flexdoc', label: 'Overview', key: 'overview' },
  { href: '/flexdoc/docs', label: 'Documentation', key: 'docs' },
  { href: '/flexdoc/demo', label: 'Demo', key: 'demo' },
  { href: '/flexdoc/client', label: 'API Client', key: 'client' },
  { href: '/flexdoc/playground', label: 'Playground', key: 'playground' },
] as const;

function activeKey(pathname: string | null): (typeof links)[number]['key'] {
  if (!pathname || pathname === '/flexdoc' || pathname === '/flexdoc/') return 'overview';
  if (pathname.startsWith('/flexdoc/docs')) return 'docs';
  if (pathname.startsWith('/flexdoc/demo')) return 'demo';
  if (pathname.startsWith('/flexdoc/client')) return 'client';
  if (pathname.startsWith('/flexdoc/playground')) return 'playground';
  return 'overview';
}

export function FlexDocProductNav() {
  const pathname = usePathname();
  const active = activeKey(pathname);

  return (
    <div className='sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85'>
      <div className='container mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2'>
        {links.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            aria-current={active === link.key ? 'page' : undefined}
            className={`shrink-0 rounded-lg px-3 py-2 text-sm transition ${active === link.key ? 'bg-foreground text-background' : 'text-foreground/60 hover:bg-card hover:text-foreground'}`}
          >
            {link.label}
          </Link>
        ))}
        <a
          href='https://github.com/Prauga/flexdoc'
          target='_blank'
          rel='noopener noreferrer'
          className='ml-auto shrink-0 rounded-lg px-3 py-2 text-sm text-foreground/60 transition hover:bg-card hover:text-foreground'
        >
          GitHub ↗
        </a>
      </div>
    </div>
  );
}
