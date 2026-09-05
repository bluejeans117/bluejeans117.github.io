import { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { FlexDocApiClientDemo } from '@/components/flexdoc-api-client-demo';

export const metadata: Metadata = {
  title: 'FlexDoc 2.3 API Client | Local Collections, Auth, Scripts & History',
  description:
    'Try the published FlexDoc 2.3 API Client workspace with nested collections, collection and environment variables, inherited auth and OAuth grants, scripts, tests, history and local persistence.',
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
