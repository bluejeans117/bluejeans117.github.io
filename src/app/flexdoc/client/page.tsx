import { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { FlexDocApiClientDemo } from '@/components/flexdoc-api-client-demo';

export const metadata: Metadata = {
  title: 'FlexDoc 2.3 API Client | Canonical HTTP Request Editor',
  description:
    'Try the published FlexDoc HTTP request editor used by the 2.3 product surface, and explore the current 2.3 source direction for collections, environments, scripts, tests and history.',
};

export default function FlexDocApiClientPage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Nav />
      <main className='flex-1'>
        <FlexDocApiClientDemo />
      </main>
    </div>
  );
}
