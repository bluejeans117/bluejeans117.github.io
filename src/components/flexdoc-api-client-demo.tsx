'use client';

import dynamic from 'next/dynamic';
import { ArrowLeft, ExternalLink, Network, Sparkles, Workflow } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import type { ApiClientProps, BuiltRequest } from '@prauga/flexdoc-client';
import '@prauga/flexdoc-client/styles.css';

const ApiClient = dynamic<ApiClientProps>(
  () => import('@prauga/flexdoc-client').then((mod) => mod.ApiClient),
  { ssr: false }
);

const servers: NonNullable<ApiClientProps['serverOptions']> = [
  { url: 'https://httpbin.org', description: 'Public echo service' },
  {
    url: 'https://{environment}.api.example.test/v1',
    description: 'Variable server example',
    variables: { environment: { default: 'staging', enum: ['staging', 'canary', 'production'] } },
  },
];

export function FlexDocApiClientDemo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [request, setRequest] = useState<BuiltRequest | null>(null);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto max-w-[1450px] px-3 py-8 sm:px-4 sm:py-10'>
        <a href='/flexdoc' className='mb-6 inline-flex items-center gap-2 text-sm text-blue-600 hover:underline dark:text-blue-300'>
          <ArrowLeft size={16} /> Back to FlexDoc 2.2
        </a>

        <div className='grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end'>
          <div>
            <div className='mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300'>
              <Sparkles size={14} /> Standalone @prauga/flexdoc-client 2.2.0
            </div>
            <h1 className='text-3xl font-semibold tracking-[-0.03em] sm:text-4xl'>The API Client without an OpenAPI document.</h1>
            <p className='mt-3 max-w-3xl text-sm leading-6 text-foreground/62 sm:text-base'>
              Edit any HTTP request directly: method, URL, ordered query/header pairs, authorization, content type, body and server. The same canonical request representation is used when Try It hands an OpenAPI request into this workspace.
            </p>
          </div>
          <div className='rounded-2xl border border-border bg-card/70 p-5 text-sm leading-6 text-foreground/60'>
            <div className='flex items-center gap-2 font-semibold text-foreground'><Network size={16} /> Live request note</div>
            <p className='mt-2'>The default request targets <code className='rounded bg-background px-1.5 py-0.5'>httpbin.org/anything</code>, a third-party echo endpoint. Nothing is sent until you press Send request. Change the URL or custom server before sending if you prefer.</p>
          </div>
        </div>

        <div className='mt-8 grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]'>
          <div className={`overflow-hidden rounded-2xl border shadow-2xl shadow-black/10 ${isDark ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}>
            <div className={`flex items-center justify-between gap-3 border-b px-4 py-3 ${isDark ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-slate-50'}`}>
              <span className='text-xs font-semibold text-foreground/55'>FlexDoc API Client 2.2</span>
              <span className='inline-flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-300'><Workflow size={13} /> canonical HTTP request editor</span>
            </div>
            <div className='p-3 sm:p-4'>
              <ApiClient
                theme={isDark ? 'dark' : 'light'}
                credentials='omit'
                serverOptions={servers}
                initialServerUrl='https://httpbin.org'
                initialRequest={{
                  method: 'POST',
                  url: 'https://httpbin.org/anything',
                  query: [
                    { key: 'source', value: 'flexdoc-portfolio', enabled: true },
                    { key: 'version', value: '2.2.0', enabled: true },
                  ],
                  headers: [{ key: 'X-Demo-Trace', value: 'flexdoc-2-2', enabled: true }],
                  contentType: 'application/json',
                  body: JSON.stringify({ message: 'Hello from FlexDoc 2.2', surface: 'standalone-api-client' }, null, 2),
                  auth: { type: 'none' },
                }}
                requestInterceptor={(next) => {
                  const headers = new Headers(next.headers);
                  headers.set('X-FlexDoc-Portfolio', '2.2');
                  return { ...next, headers };
                }}
                onRequestChange={setRequest}
              />
            </div>
          </div>

          <aside className='h-fit rounded-2xl border border-border bg-card/70 p-5'>
            <div className='text-xs font-semibold uppercase tracking-[0.17em] text-blue-600 dark:text-blue-300'>Canonical request</div>
            <h2 className='mt-2 font-semibold'>Live build preview</h2>
            {request ? (
              <div className='mt-4 space-y-3 text-sm'>
                <div><span className='text-foreground/45'>Method</span><div className='mt-1 font-mono font-semibold'>{request.method}</div></div>
                <div><span className='text-foreground/45'>URL</span><div className='mt-1 break-all font-mono text-xs leading-5'>{request.url}</div></div>
                <div><span className='text-foreground/45'>Headers</span><div className='mt-1 font-mono text-xs'>{Object.keys(request.headers).length}</div></div>
                <div><span className='text-foreground/45'>Body kind</span><div className='mt-1 font-mono text-xs'>{request.bodyKind || 'none'}</div></div>
              </div>
            ) : <p className='mt-4 text-sm leading-6 text-foreground/55'>The preview appears as soon as the client builds the initial request.</p>}
            <a href='https://github.com/prauga/flexdoc/blob/main/packages/client/src/components/ApiClient.tsx' target='_blank' rel='noopener noreferrer' className='mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline dark:text-blue-300'>Source <ExternalLink size={13} /></a>
          </aside>
        </div>
      </div>
    </div>
  );
}
