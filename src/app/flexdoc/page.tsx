import { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { FlexDocContent } from '@/components/flexdoc-content';

export const metadata: Metadata = {
  title: 'FlexDoc 2.2 by Prauga | OpenAPI Documentation & API Explorer',
  description:
    "FlexDoc is Prauga's open-source, self-hosted OpenAPI 3.0/3.1 documentation renderer and API explorer with Try It, API Client handoff, advanced request serialization, code samples, CLI/static export and cross-language framework integrations.",
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
