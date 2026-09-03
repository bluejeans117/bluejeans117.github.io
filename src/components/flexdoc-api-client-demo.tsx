'use client';

import dynamic from 'next/dynamic';
import { ArrowLeft, ExternalLink, Network, PackageCheck, Sparkles, Workflow } from 'lucide-react';
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
      <div className='container mx-auto max-w-[1450px] px-4 py-6 sm:py-10'>
        <a href='/flexdoc' className='mb-6 inline-flex items-center gap-2 text-sm text-blue-600 hover:underline dark:text-blue-300'>
          <ArrowLeft size={16} /> Back to FlexDoc 2.3
        </a>

        <div className='grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end'>
          <div>
            <div className='mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300'>
              <Sparkles size={14} /> Product milestone 2.3 · published client 2.2.0
            </div>
            <h1 className='text-2xl font-semibold tracking-[-0.03em] sm:text-4xl'>The canonical HTTP request editor behind the 2.3 workspace.</h1>
            <p className='mt-3 max-w-3xl text-sm leading-6 text-foreground/62 sm:text-base'>
              The live portfolio stays on the published npm client: edit any HTTP method, URL, ordered query/header pairs, authorization, content type, body and server using the same request model as Try It. The 2.3 source milestone layers collections, environments, variables, scripts, tests and history around this editor.
            </p>
          </div>
          <div className='rounded-2xl border border-border bg-card/70 p-5 text-sm leading-6 text-foreground/60'>
            <div className='flex items-center gap-2 font-semibold text-foreground'><PackageCheck size={16} /> Published-artifact demo</div>
            <p className='mt-2'>This page intentionally imports only APIs present in <code className='rounded bg-background px-1.5 py-0.5'>@prauga/flexdoc-client@2.2.0</code>. The richer <code className='rounded bg-background px-1.5 py-0.5'>ApiClientWorkspace</code> surface is documented from current 2.3 source without vendoring unpublished npm code into the portfolio.</p>
          </div>
        </div>

        <div className='mt-8 grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]'>
          <div className={`overflow-hidden rounded-2xl border shadow-2xl shadow-black/10 ${isDark ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}>
            <div className={`flex flex-col items-start gap-2 border-b px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 ${isDark ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-slate-50'}`}>
              <span className='text-xs font-semibold text-foreground/55'>FlexDoc API Client · published client 2.2.0</span>
              <span className='inline-flex flex-wrap items-center gap-1.5 text-xs text-blue-600 dark:text-blue-300'><Workflow size={13} /> canonical HTTP request editor</span>
            </div>
            <div className='min-w-0 overflow-x-auto p-2 sm:p-4'>
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
                    { key: 'product', value: '2.3', enabled: true },
                  ],
                  headers: [{ key: 'X-Demo-Trace', value: 'flexdoc-2-3', enabled: true }],
                  contentType: 'application/json',
                  body: JSON.stringify({ message: 'Hello from FlexDoc', productMilestone: '2.3' }, null, 2),
                  auth: { type: 'none' },
                }}
                requestInterceptor={(next) => {
                  const headers = new Headers(next.headers);
                  headers.set('X-FlexDoc-Portfolio', '2.3');
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
            <div className='mt-6 rounded-xl border border-border bg-background/70 p-3 text-xs leading-5 text-foreground/52'>
              <div className='mb-1 flex items-center gap-1.5 font-semibold text-foreground/70'><Network size={13} /> Live request note</div>
              Nothing is sent until you press Send request. The default URL is the third-party httpbin echo service and can be changed before execution.
            </div>
            <a href='https://github.com/prauga/flexdoc/blob/main/packages/client/src/components/ApiClientWorkspace.tsx' target='_blank' rel='noopener noreferrer' className='mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline dark:text-blue-300'>2.3 workspace source <ExternalLink size={13} /></a>
          </aside>
        </div>
      </div>
    </div>
  );
}