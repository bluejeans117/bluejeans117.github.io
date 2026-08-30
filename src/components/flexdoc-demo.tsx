'use client';

import { ArrowLeft, ExternalLink, Play, Settings2, Sparkles, UploadCloud } from 'lucide-react';
import { useTheme } from 'next-themes';
import { FlexDocClientWrapper } from './flexdoc-client-wrapper';

export function FlexDocDemo() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto max-w-[1500px] px-3 py-8 sm:px-4 sm:py-10'>
        <div className='mb-7'>
          <a href='/flexdoc' className='mb-5 inline-flex items-center gap-2 text-sm text-blue-600 hover:underline dark:text-blue-300'>
            <ArrowLeft size={16} /> Back to FlexDoc 2.0
          </a>

          <div className='flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between'>
            <div className='max-w-3xl'>
              <div className='mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300'>
                <Sparkles size={14} /> Live package: @bluejeans/flexdoc-client 2.0.2
              </div>
              <h1 className='text-3xl font-semibold tracking-[-0.03em] sm:text-4xl'>FlexDoc live API explorer</h1>
              <p className='mt-3 text-sm leading-6 text-foreground/62 sm:text-base'>
                Browse the sample OpenAPI document, open an operation, edit request inputs, use Try It and switch between generated cURL, JavaScript, Python, Go and Java request samples.
              </p>
            </div>
            <div className='flex flex-col items-start gap-3 lg:items-end'>
              <a href='/flexdoc/playground' className='inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-500/15 dark:text-blue-300'>
                <UploadCloud size={15} /> Try your own spec
              </a>
              <div className='inline-flex items-center gap-2 text-xs text-foreground/50'>
                <Settings2 size={14} /> Theme follows this site: {resolvedTheme || 'system'}
              </div>
            </div>
          </div>
        </div>

        <div className={`overflow-hidden rounded-2xl border shadow-2xl shadow-black/10 ${isDark ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}>
          <div className={`flex items-center gap-3 border-b px-4 py-3 ${isDark ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-slate-50'}`}>
            <div className='flex gap-1.5' aria-hidden='true'>
              <div className='h-2.5 w-2.5 rounded-full bg-red-400' />
              <div className='h-2.5 w-2.5 rounded-full bg-amber-400' />
              <div className='h-2.5 w-2.5 rounded-full bg-emerald-400' />
            </div>
            <span className='truncate text-xs text-foreground/55'>FlexDoc 2.0.2 — sample API</span>
          </div>
          <div className='min-h-[760px] overflow-auto sm:h-[820px]'>
            <FlexDocClientWrapper theme={isDark ? 'dark' : 'light'} />
          </div>
        </div>

        <div className='mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-border bg-card/70 p-6 text-center sm:flex-row sm:text-left'>
          <div>
            <h2 className='font-semibold'>Use the same renderer in your own app.</h2>
            <p className='mt-1 text-sm text-foreground/58'>React, Express, Fastify and NestJS packages are documented in the repository.</p>
          </div>
          <div className='flex flex-wrap justify-center gap-3'>
            <a href='/flexdoc/playground' className='inline-flex items-center gap-2 rounded-full border border-blue-500/25 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-500/5 dark:text-blue-300'>
              <UploadCloud size={15} /> Upload a spec
            </a>
            <a href='/flexdoc' className='inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold transition hover:border-blue-500/30'>
              <Play size={15} /> Documentation
            </a>
            <a href='https://github.com/bluejeans117/flexdoc' target='_blank' rel='noopener noreferrer' className='inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:opacity-90'>
              GitHub <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
