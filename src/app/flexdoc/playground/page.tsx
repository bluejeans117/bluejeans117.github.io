import type { Metadata } from 'next';
import { FlexDocPlayground } from '@/components/flexdoc-playground';

export const metadata: Metadata = {
  title: 'Try FlexDoc with your OpenAPI spec',
  description: 'Upload an OpenAPI JSON or YAML file and render it locally with the canonical FlexDoc renderer used by the 2.8 product milestone.',
};

export default function FlexDocPlaygroundPage() {
  return <FlexDocPlayground />;
}
