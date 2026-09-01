import { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { FlexDocDemo } from '@/components/flexdoc-demo';

export const metadata: Metadata = {
  title: 'FlexDoc 2.2 Live Demo | Try It + API Client',
  description:
    'Try FlexDoc 2.2 in the browser: explore a full OpenAPI 3.1 surface, execute Try It requests, hand them into the API Client and inspect generated request code.',
};

export default function FlexDocDemoPage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Nav />
      <main className='flex-1'>
        <FlexDocDemo />
      </main>
    </div>
  );
}
