import { Metadata } from 'next';
import { FlexDocContent } from '@/components/flexdoc-content';

export const metadata: Metadata = {
  title: 'FlexDoc 2.8 by Prauga | OpenAPI Documentation & API Explorer',
  description:
    "FlexDoc is Prauga's open-source, self-hosted OpenAPI 3.0/3.1 documentation renderer and API explorer with Try It, a local API Client workspace, advanced request serialization, code samples, CLI/static export and broad framework coverage across Node, .NET, JVM, Python, PHP, Ruby, Go, Rust and Elixir.",
};

export default function FlexDocPage() {
  return <FlexDocContent />;
}
