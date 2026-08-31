'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import '@prauga/flexdoc-client/styles.css';
import { sampleEcommerceSpec } from '@/data/sample-openapi-spec';

type FlexDocRuntimeProps = {
  spec: unknown;
  theme?: 'light' | 'dark';
  options?: {
    title?: string;
    tryIt?: { enabled?: boolean };
    codeSamples?: {
      enabled?: boolean;
      languages?: Array<'curl' | 'javascript' | 'python' | 'go' | 'java'>;
    };
  };
};

type FlexDocRuntimeModule = {
  FlexDoc: ComponentType<FlexDocRuntimeProps>;
};

const FlexDoc = dynamic(
  () =>
    import('@prauga/flexdoc-client').then(
      (mod) => (mod as unknown as FlexDocRuntimeModule).FlexDoc
    ),
  { ssr: false }
);

interface FlexDocClientWrapperProps {
  theme: 'light' | 'dark';
  spec?: unknown;
  title?: string;
}

export function FlexDocClientWrapper({
  theme,
  spec = sampleEcommerceSpec,
  title = 'FlexDoc 2.1 Demo API',
}: FlexDocClientWrapperProps) {
  return (
    <FlexDoc
      spec={spec}
      theme={theme}
      options={{
        title,
        tryIt: { enabled: true },
        codeSamples: {
          enabled: true,
          languages: ['curl', 'javascript', 'python', 'go', 'java'],
        },
      }}
    />
  );
}
