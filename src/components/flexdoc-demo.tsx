'use client';

import { ArrowLeft, ExternalLink, Play, Settings2, Sparkles, UploadCloud, Workflow } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FlexDocClientWrapper } from './flexdoc-client-wrapper';

export function FlexDocDemo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === 'dark';
  const themeLabel = mounted ? (resolvedTheme || 'system') : 'light';

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto max-w-[1500px] px-3 py-8 sm:px-4 sm:py-10'>
        <div className='mb-7'>
          <a href='/flexdoc' className='mb-5 inline-flex items-center gap-2 text-sm text-blue-600 hover:underline dark:text-blue-300'>
            <ArrowLeft size={16} /> Back to FlexDoc 2.2
          </a>

          <div className='flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between'>
            <div className='max-w-4xl'>
              <div className='mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300'>
                <Sparkles size={14} /> Live package: @prauga/flexdoc-client 2.2.0
              </div>
              <h1 className='text-3xl font-semibold tracking-[-0.03em] sm:text-4xl'>FlexDoc 2.2 full-surface API explorer</h1>
              <p className='mt-3 text-sm leading-6 text-foreground/62 sm:text-base'>
                The default OpenAPI 3.1 fixture is intentionally broad: configured and custom servers, advanced parameter serialization, API key/Basic/Bearer/OAuth/OpenID metadata, JSON/form/multipart bodies, composed schemas, Try It, response inspection, API Client handoff and five generated request languages.
              </p>
              <div className='mt-4 flex flex-wrap gap-2 text-xs text-foreground/58'>
                {['OpenAPI 3.0/3.1', 'Try It → API Client', '5 auth families', 'matrix / label / deepObject', 'JSON / form / multipart', '5 code languages'].map((item) => (
                  <span key={item} className='rounded-full border border-border bg-card px-3 py-1.5'>{item}</span>
                ))}
              </div>
            </div>
            <div className='flex flex-col items-start gap-3 lg:items-end'>
              <a href='/flexdoc/playground' className='inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-500/15 dark:text-blue-300'>
                <UploadCloud size={15} /> Try your own spec
              </a>
              <a href='/flexdoc/client' className='inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-500/15 dark:text-violet-300'>
                <Workflow size={15} /> Standalone API Client
              </a>
              <div className='inline-flex items-center gap-2 text-xs text-foreground/50'>
                <Settings2 size={14} /> Theme follows this site: {themeLabel}
              </div>
            </div>
          </div>
        </div>

        <div className={`overflow-hidden rounded-2xl border shadow-2xl shadow-black/10 ${isDark ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}>
          <div className={`flex flex-col gap-2 border-b px-4 py-3 sm:flex-row sm:items-center sm:justify-between ${isDark ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-slate-50'}`}>
            <div className='flex items-center gap-3'>
              <div className='flex gap-1.5' aria-hidden='true'>
                <div className='h-2.5 w-2.5 rounded-full bg-red-400' />
                <div className='h-2.5 w-2.5 rounded-full bg-amber-400' />
                <div className='h-2.5 w-2.5 rounded-full bg-emerald-400' />
              </div>
              <span className='truncate text-xs text-foreground/55'>FlexDoc 2.2.0 — full feature showcase</span>
            </div>
            <span className='inline-flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-300'>
              <Workflow size={13} /> Open an operation → Try It → Open in API Client
            </span>
          </div>
          <div className='min-h-[760px] overflow-auto sm:h-[860px]'>
            <FlexDocClientWrapper theme={isDark ? 'dark' : 'light'} />
          </div>
        </div>

        <div className='mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-border bg-card/70 p-6 text-center sm:flex-row sm:text-left'>
          <div>
            <h2 className='font-semibold'>The same canonical renderer ships across the ecosystem.</h2>
            <p className='mt-1 text-sm text-foreground/58'>React, standalone/CLI, Express, Fastify, NestJS, Spring Boot, Go, Python and Rust share the renderer contract.</p>
          </div>
          <div className='flex flex-wrap justify-center gap-3'>
            <a href='/flexdoc/playground' className='inline-flex items-center gap-2 rounded-full border border-blue-500/25 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-500/5 dark:text-blue-300'>
              <UploadCloud size={15} /> Upload a spec
            </a>
            <a href='/flexdoc' className='inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold transition hover:border-blue-500/30'>
              <Play size={15} /> Documentation
            </a>
            <a href='https://github.com/prauga/flexdoc' target='_blank' rel='noopener noreferrer' className='inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:opacity-90'>
              GitHub <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
