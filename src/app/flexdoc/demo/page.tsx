import { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { FlexDocDemo } from '@/components/flexdoc-demo';

export const metadata: Metadata = {
  title: 'FlexDoc 2.0 Live Demo | Try the API Explorer',
  description:
    'Try FlexDoc 2.0 in the browser: navigate an OpenAPI reference, use the interactive Try It flow and inspect generated request code samples.',
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
