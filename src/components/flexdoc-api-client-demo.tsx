'use client';

import dynamic from 'next/dynamic';
import { Database, ExternalLink, FileUp, History, Maximize2, Minimize2, Network, PackageCheck, ShieldCheck, Sparkles, Workflow } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import type { ApiClientWorkspaceProps, BuiltRequest } from '@prauga/flexdoc-client';
import '@prauga/flexdoc-client/styles.css';

const ApiClientWorkspace = dynamic<ApiClientWorkspaceProps>(
  () => import('@prauga/flexdoc-client').then((mod) => mod.ApiClientWorkspace),
  { ssr: false }
);

const servers: NonNullable<ApiClientWorkspaceProps['serverOptions']> = [
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const workspaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const syncFullscreen = () => setIsFullscreen(document.fullscreenElement === workspaceRef.current);
    document.addEventListener('fullscreenchange', syncFullscreen);
    return () => document.removeEventListener('fullscreenchange', syncFullscreen);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  const toggleFullscreen = async () => {
    if (!workspaceRef.current) return;
    if (document.fullscreenElement === workspaceRef.current) {
      await document.exitFullscreen();
      return;
    }
    await workspaceRef.current.requestFullscreen();
  };

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto max-w-[1500px] px-4 py-6 sm:py-10'>
        <div className='grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end'>
          <div>
            <div className='mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300'>
              <Sparkles size={14} /> FlexDoc 2.8 · published workspace
            </div>
            <h1 className='text-2xl font-semibold tracking-[-0.03em] sm:text-4xl'>A local API workspace built on the same request engine as Try It.</h1>
            <p className='mt-3 max-w-3xl text-sm leading-6 text-foreground/62 sm:text-base'>
              FlexDoc 2.8 completes the standalone API Client workspace and adds Postman Collection v2.1 plus environment import. Imported folders, requests, variables, supported auth/body modes and compatible scripts become ordinary FlexDoc workspace data, with explicit warnings wherever Postman behavior cannot be represented faithfully.
            </p>
          </div>
          <div className='rounded-2xl border border-border bg-card/70 p-5 text-sm leading-6 text-foreground/60'>
            <div className='flex items-center gap-2 font-semibold text-foreground'><PackageCheck size={16} /> Published 2.8 artifact</div>
            <p className='mt-2'>This page runs <code className='rounded bg-background px-1.5 py-0.5'>ApiClientWorkspace</code> from <code className='rounded bg-background px-1.5 py-0.5'>@prauga/flexdoc-client@2.8.0</code>. Workspace state is browser-local and persists through IndexedDB unless persistence is disabled.</p>
          </div>
        </div>

        <div className='mt-8 grid gap-4 md:grid-cols-2'>
          <div className='rounded-2xl border border-border bg-card/60 p-5'>
            <div className='text-xs font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-300'>Standalone embed</div>
            <h2 className='mt-2 text-lg font-semibold'><code>ApiClient</code></h2>
            <p className='mt-2 text-sm leading-6 text-foreground/60'>Use the request editor/executor by itself when you want arbitrary HTTP requests without an OpenAPI document, collections or persisted workspace state.</p>
            <div className='mt-4 overflow-x-auto rounded-xl border border-border bg-background/70 px-3 py-2 font-mono text-xs text-foreground/70'>import {'{'} ApiClient {'}'} from '@prauga/flexdoc-client'</div>
          </div>
          <div className='rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5'>
            <div className='text-xs font-semibold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300'>Persistent workspace</div>
            <h2 className='mt-2 text-lg font-semibold'><code>ApiClientWorkspace</code></h2>
            <p className='mt-2 text-sm leading-6 text-foreground/60'>Choose the workspace when you also need collections, nested folders, variables, inherited auth/OAuth, scripts, tests, history, Postman import and optional IndexedDB persistence.</p>
            <div className='mt-4 overflow-x-auto rounded-xl border border-border bg-background/70 px-3 py-2 font-mono text-xs text-foreground/70'>import {'{'} ApiClientWorkspace {'}'} from '@prauga/flexdoc-client'</div>
          </div>
        </div>

        <div className='mt-4 flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5'>
          <FileUp className='mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-300' />
          <div>
            <div className='font-semibold'>Import Postman directly into the canonical workspace</div>
            <p className='mt-1 text-sm leading-6 text-foreground/60'>Select Postman Collection v2.1 and environment JSON files together. Supported content is converted into native FlexDoc collections, folders, requests, variables, auth and scripts; unsupported auth, multipart/file and sandbox-specific behavior is surfaced as a compatibility warning instead of silently approximated.</p>
          </div>
        </div>

        <div className='mt-8 grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]'>
          <div ref={workspaceRef} data-flexdoc-api-workspace='true' className={`min-w-0 overflow-hidden rounded-2xl border shadow-2xl shadow-black/10 ${isFullscreen ? 'h-screen w-screen rounded-none border-0' : ''} ${isDark ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}>
            <div className={`flex flex-col items-start gap-2 border-b px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 ${isDark ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-slate-50'}`}>
              <span className='text-xs font-semibold text-foreground/55'>FlexDoc API Client Workspace · 2.8.0</span>
              <div className='flex flex-wrap items-center gap-2'>
                <span className='inline-flex flex-wrap items-center gap-1.5 text-xs text-blue-600 dark:text-blue-300'><Workflow size={13} /> collections · Postman import · variables · auth · scripts · history</span>
                <button type='button' onClick={toggleFullscreen} className='inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/70 px-2.5 py-1.5 text-xs font-semibold text-foreground/65 transition hover:border-blue-500/35 hover:text-blue-600 dark:hover:text-blue-300' aria-pressed={isFullscreen} title={isFullscreen ? 'Exit fullscreen' : 'View API Client fullscreen'}>
                  {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                  {isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                </button>
              </div>
            </div>
            <div className={isFullscreen ? 'h-[calc(100vh-54px)] min-w-0 overflow-auto p-2 sm:p-4' : 'min-w-0 overflow-x-auto p-2 sm:p-4'}>
              <ApiClientWorkspace
                theme={isDark ? 'dark' : 'light'}
                persistenceKey='flexdoc-portfolio-2-8-workspace'
                credentials='omit'
                serverOptions={servers}
                initialServerUrl='https://httpbin.org'
                initialRequest={{
                  method: 'POST',
                  url: 'https://httpbin.org/anything',
                  query: [
                    { key: 'source', value: 'flexdoc-portfolio', enabled: true },
                    { key: 'product', value: '2.8', enabled: true },
                  ],
                  headers: [{ key: 'X-Demo-Trace', value: 'flexdoc-2-8', enabled: true }],
                  contentType: 'application/json',
                  body: JSON.stringify({ message: 'Hello from FlexDoc', productMilestone: '2.8' }, null, 2),
                  auth: { type: 'inherit' },
                }}
                initialScripts={{
                  preRequest: "flex.request.headers.set('X-Workspace-Script', '2.8');\nflex.collection.set('lastDemo', 'portfolio');\nconsole.log('prepared by FlexDoc 2.8');",
                  tests: "flex.test('status is successful', () => flex.expect(flex.response.code).to.be.below(400));",
                }}
                requestInterceptor={(next) => {
                  const headers = new Headers(next.headers);
                  headers.set('X-FlexDoc-Portfolio', '2.8');
                  return { ...next, headers };
                }}
                onRequestChange={setRequest}
              />
            </div>
          </div>

          <aside className='h-fit rounded-2xl border border-border bg-card/70 p-5'>
            <div className='text-xs font-semibold uppercase tracking-[0.17em] text-blue-600 dark:text-blue-300'>2.8 workspace</div>
            <h2 className='mt-2 font-semibold'>Local-first, reusable requests</h2>
            <div className='mt-4 space-y-3 text-sm leading-6 text-foreground/60'>
              <div className='flex gap-2.5'><FileUp className='mt-1 h-4 w-4 shrink-0 text-blue-500' /><span>Postman Collection v2.1 and environment exports import through the browser into the same canonical workspace model, with compatibility warnings for unsupported behavior.</span></div>
              <div className='flex gap-2.5'><Database className='mt-1 h-4 w-4 shrink-0 text-blue-500' /><span>Collections, arbitrarily nested folders, saved requests, collection variables and named environments persist in origin-scoped IndexedDB.</span></div>
              <div className='flex gap-2.5'><ShieldCheck className='mt-1 h-4 w-4 shrink-0 text-blue-500' /><span>Collection, folder and request auth can inherit or override Bearer, Basic, API keys and OAuth 2.0; OAuth supports manual tokens plus browser-compatible grant flows.</span></div>
              <div className='flex gap-2.5'><Workflow className='mt-1 h-4 w-4 shrink-0 text-blue-500' /><span>Trusted pre-request JavaScript can mutate requests, collection variables and environments; post-response tests render pass/fail output and captured logs.</span></div>
              <div className='flex gap-2.5'><History className='mt-1 h-4 w-4 shrink-0 text-blue-500' /><span>History keeps resolved execution metadata, test results, logs and originating collection/folder identity while replay restores the raw editable template.</span></div>
            </div>

            {request && (
              <div className='mt-6 border-t border-border pt-5 text-sm'>
                <div className='text-xs font-semibold uppercase tracking-[0.14em] text-foreground/42'>Canonical request preview</div>
                <div className='mt-3'><span className='text-foreground/45'>Method</span><div className='mt-1 font-mono font-semibold'>{request.method}</div></div>
                <div className='mt-3'><span className='text-foreground/45'>URL</span><div className='mt-1 break-all font-mono text-xs leading-5'>{request.url}</div></div>
              </div>
            )}

            <div className='mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs leading-5 text-foreground/55'>
              <div className='mb-1 flex items-center gap-1.5 font-semibold text-foreground/75'><Network size={13} /> Local data & execution</div>
              Saved auth values, collection/environment variables, scripts and history are stored as entered and are not encrypted by FlexDoc. Scripts are trusted local JavaScript, not a sandbox. Nothing is sent until you press Send request.
            </div>
            <a href='https://github.com/Prauga/flexdoc/tree/js/v2.8.0/examples/api-client' target='_blank' rel='noopener noreferrer' className='mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline dark:text-blue-300'>2.8 API Client example <ExternalLink size={13} /></a>
          </aside>
        </div>
      </div>
    </div>
  );
}
