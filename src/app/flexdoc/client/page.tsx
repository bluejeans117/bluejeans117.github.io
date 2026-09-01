import { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { FlexDocApiClientDemo } from '@/components/flexdoc-api-client-demo';

export const metadata: Metadata = {
  title: 'FlexDoc 2.2 API Client | Standalone HTTP Request Workspace',
  description:
    'Try the standalone FlexDoc 2.2 API Client: arbitrary HTTP methods and URLs, query parameters, headers, auth, request bodies, server overrides and response inspection.',
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
