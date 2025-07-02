import { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { FlexDocContent } from '@/components/flexdoc-content';

export const metadata: Metadata = {
  title: 'FlexDoc - Modern API Documentation',
  description:
    'FlexDoc is a modern, customizable API documentation tool for NestJS and Express applications.',
};

export default function FlexDocPage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Nav />
      <main className='flex-1'>
        <FlexDocContent />
      </main>
    </div>
  );
}

