import { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { FlexDocDemo } from '@/components/flexdoc-demo';

export const metadata: Metadata = {
  title: 'FlexDoc Live Demo - Interactive API Documentation',
  description:
    'Experience FlexDoc in action with this interactive demo showcasing beautiful API documentation generation.',
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
