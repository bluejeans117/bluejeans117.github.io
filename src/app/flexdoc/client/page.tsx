import { Metadata } from 'next';
import { FlexDocApiClientDemo } from '@/components/flexdoc-api-client-demo';

export const metadata: Metadata = {
  title: 'FlexDoc 2.8 API Client | Postman Import, Collections, Auth & Scripts',
  description:
    'Try the FlexDoc 2.8 standalone API workspace with Postman Collection/environment import, nested collections, variables, inherited auth and OAuth, scripts, persisted tests/history and local IndexedDB state.',
};

export default function FlexDocApiClientPage() {
  return <FlexDocApiClientDemo />;
}
