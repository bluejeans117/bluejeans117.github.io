import { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { FlexDocContent } from '@/components/flexdoc-content';

export const metadata: Metadata = {
  title: 'FlexDoc 2.3 by Prauga | OpenAPI Documentation & API Explorer',
  description:
    "FlexDoc is Prauga's open-source, self-hosted OpenAPI 3.0/3.1 documentation renderer and API explorer with Try It, a local API Client workspace, advanced request serialization, code samples, CLI/static export and broad framework coverage across Node, .NET, JVM, Python, PHP, Ruby, Go, Rust and Elixir.",
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
