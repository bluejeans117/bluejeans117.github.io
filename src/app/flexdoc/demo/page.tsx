import { Metadata } from 'next';
import { FlexDocDemo } from '@/components/flexdoc-demo';

export const metadata: Metadata = {
  title: 'FlexDoc 2.8 Live Demo | Try It + API Client',
  description:
    'Try FlexDoc 2.8 in the browser: explore a full OpenAPI 3.1 surface, execute Try It requests, hand them into the API Client and inspect generated request code.',
};

export default function FlexDocDemoPage() {
  return <FlexDocDemo />;
}
