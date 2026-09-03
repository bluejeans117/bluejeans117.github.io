import type { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { FlexDocPlayground } from '@/components/flexdoc-playground';

export const metadata: Metadata = {
  title: 'Try FlexDoc with your OpenAPI spec',
  description: 'Upload an OpenAPI JSON or YAML file and render it locally with the canonical FlexDoc renderer used by the 2.3 product milestone.',
};

export default function FlexDocPlaygroundPage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Nav />
      <main className='flex-1'>
        <FlexDocPlayground />
      </main>
    </div>
  );
}
