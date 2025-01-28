'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './theme-toggle';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/experience', label: 'Experience' },
  { href: '/work', label: 'Work' },
  { href: '/contact', label: 'Contact' },
  { href: 'https://blog.realogs.in/', label: 'Blog', external: true },
];

export function Nav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Backdrop for mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-background/60 backdrop-blur-xl transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden='true'
      />

      <nav className='sticky top-0 z-50 w-full border-b border-accent/20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='container flex h-14 items-center justify-between px-4'>
          {/* Logo - visible on all screens */}
          <Link
            className='flex items-center space-x-2 font-bold text-accent hover:opacity-80 transition-opacity'
            href='/'
          >
            Bluejeans117
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex md:items-center md:space-x-8'>
            <nav className='flex items-center space-x-8 text-sm font-medium'>
              {links.map((link) => {
                const isActive = pathname === link.href;
                return link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`relative transition-colors hover:text-accent ${
                      isActive ? 'text-accent' : 'text-foreground/60'
                    }`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative transition-colors hover:text-accent ${
                      isActive ? 'text-accent' : 'text-foreground/60'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className='absolute -bottom-[22px] left-0 right-0 h-px bg-accent' />
                    )}
                  </Link>
                );
              })}
            </nav>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            className='relative z-50 -mr-2 mt-4 p-2 md:hidden'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label='Toggle menu'
          >
            <div className='relative h-5 w-6'>
              <span
                className={`absolute block h-0.5 w-full transform bg-current transition duration-500 ease-in-out ${
                  isMenuOpen ? 'rotate-45' : '-translate-y-1.5'
                }`}
              />
              <span
                className={`absolute block h-0.5 w-full transform bg-current transition-opacity duration-500 ease-in-out ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute block h-0.5 w-full transform bg-current transition duration-500 ease-in-out ${
                  isMenuOpen ? '-rotate-45' : 'translate-y-1.5'
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <nav className='flex h-full flex-col items-center pt-24'>
            <div className='flex flex-col items-center space-y-6'>
              {links.map((link) => {
                const isActive = pathname === link.href;
                return link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`transform text-lg transition-all duration-200 hover:scale-110 hover:text-accent ${
                      isActive ? 'text-accent' : 'text-foreground/60'
                    }`}
                    target='_blank'
                    rel='noopener noreferrer'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`transform text-lg transition-all duration-200 hover:scale-110 hover:text-accent ${
                      isActive ? 'text-accent' : 'text-foreground/60'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <div className='mt-12'>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </nav>
    </>
  );
}
