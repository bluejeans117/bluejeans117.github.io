'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { sampleApis } from '@bluejeans/flexdoc-client';
import '@bluejeans/flexdoc-client/styles.css';

// Import the ApiDocsDemo component dynamically with SSR disabled
const ApiDocsDemo = dynamic(
  () => import('@bluejeans/flexdoc-client').then((mod) => mod.ApiDocsDemo),
  { ssr: false }
);

interface FlexDocClientWrapperProps {
  theme: 'light' | 'dark';
}

export function FlexDocClientWrapper({ theme }: FlexDocClientWrapperProps) {
  // Use client-side only rendering
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return a placeholder with the same height until client-side rendering takes over
    return (
      <div className='h-full w-full bg-slate-800 flex items-center justify-center text-white'>
        Loading API documentation...
      </div>
    );
  }

  return <ApiDocsDemo spec={sampleApis} theme={theme} />;
}

