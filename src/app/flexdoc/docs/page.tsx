import { Metadata } from 'next';
import { FlexDocDocs } from '@/components/flexdoc-docs';

export const metadata: Metadata = {
  title: 'FlexDoc 2.8 Documentation | Setup, Try It, API Client & Postman Import',
  description:
    'FlexDoc 2.8 documentation covering renderer setup, Try It, authentication, code samples, standalone API Client, workspace collections and variables, OAuth, scripts, tests, Postman import, persistence, CLI/static export and framework adapters.',
};

export default function FlexDocDocsPage() {
  return <FlexDocDocs />;
}
