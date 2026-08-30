import { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { FlexDocContent } from '@/components/flexdoc-content';

export const metadata: Metadata = {
  title: 'FlexDoc 2.0 | OpenAPI Documentation & API Explorer',
  description:
    'FlexDoc is an open-source, self-hosted OpenAPI 3.0/3.1 documentation renderer and interactive API explorer with Try It, code samples and framework integrations.',
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
