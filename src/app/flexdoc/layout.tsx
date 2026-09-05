import type { ReactNode } from 'react';
import { Nav } from '@/components/nav';
import { FlexDocProductNav } from '@/components/flexdoc-product-nav';

export default function FlexDocLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Nav />
      <FlexDocProductNav />
      <main className='flex-1'>{children}</main>
    </div>
  );
}
