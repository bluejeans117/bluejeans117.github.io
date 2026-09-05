'use client';

import { ArrowLeft, ExternalLink, Maximize2, Minimize2, Play, Settings2, Sparkles, UploadCloud, Workflow } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { FlexDocClientWrapper } from './flexdoc-client-wrapper';

export function FlexDocDemo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const demoRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const syncFullscreen = () => setIsFullscreen(document.fullscreenElement === demoRef.current);
    document.addEventListener('fullscreenchange', syncFullscreen);
    return () => document.removeEventListener('fullscreenchange', syncFullscreen);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';
  const themeLabel = mounted ? (resolvedTheme || 'system') : 'light';

  const toggleFullscreen = async () => {
    if (!demoRef.current) return;
    if (document.fullscreenElement === demoRef.current) {
      await document.exitFullscreen();
      return;
    }
    await demoRef.current.requestFullscreen();
  };

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto max-w-[1500px] px-4 py-6 sm:py-10'>
        <div className='mb-7'>
          <a href='/flexdoc' className='mb-5 inline-flex items-center gap-2 text-sm text-blue-600 hover:underline dark:text-blue-300'>
            <ArrowLeft size={16} /> Back to FlexDoc 2.3
          </a>

          <div className='flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between'>
            <div className='max-w-4xl'>
              <div className='mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300'>
                <Sparkles size={14} /> Live package: @prauga/flexdoc-client 2.3.0
              </div>
              <h1 className='text-2xl font-semibold tracking-[-0.03em] sm:text-4xl'>FlexDoc 2.3 full-surface API explorer</h1>
              <p className='mt-3 text-sm leading-6 text-foreground/62 sm:text-base'>
                The default OpenAPI 3.1 fixture is intentionally broad: configured and custom servers, advanced parameter serialization, API key/Basic/Bearer/OAuth/OpenID metadata, JSON/form/multipart bodies, composed schemas, Try It, response inspection, API Client handoff and five generated request languages.
              </p>
              <div className='mt-4 flex flex-wrap gap-2 text-xs text-foreground/58'>
                {['OpenAPI 3.0/3.1', 'Try It → API Client', '5 auth families', 'matrix / label / deepObject', 'JSON / form / multipart', '5 code languages'].map((item) => (
                  <span key={item} className='rounded-full border border-border bg-card px-3 py-1.5'>{item}</span>
                ))}
              </div>
            </div>
            <div className='grid w-full grid-cols-2 gap-2.5 sm:w-auto lg:flex lg:flex-col lg:items-end lg:gap-3'>
              <a href='/flexdoc/playground' className='inline-flex min-w-0 items-center justify-center gap-2 rounded-xl border border-blue-500/25 bg-blue-500/10 px-3 py-2.5 text-center text-xs font-semibold text-blue-700 transition hover:bg-blue-500/15 sm:rounded-full sm:px-4 sm:py-2 sm:text-sm dark:text-blue-300'>
                <UploadCloud size={15} /> Try your own spec
              </a>
              <a href='/flexdoc/client' className='inline-flex min-w-0 items-center justify-center gap-2 rounded-xl border border-violet-500/25 bg-violet-500/10 px-3 py-2.5 text-center text-xs font-semibold text-violet-700 transition hover:bg-violet-500/15 sm:rounded-full sm:px-4 sm:py-2 sm:text-sm dark:text-violet-300'>
                <Workflow size={15} /> API Client Workspace
              </a>
              <div className='col-span-2 inline-flex items-center justify-center gap-2 text-xs text-foreground/50 lg:justify-end'>
                <Settings2 size={14} /> Theme follows this site: {themeLabel}
              </div>
            </div>
          </div>
        </div>

        <div ref={demoRef} className={`overflow-hidden rounded-2xl border shadow-2xl shadow-black/10 ${isFullscreen ? 'h-screen w-screen rounded-none border-0' : ''} ${isDark ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}>
          <div className={`flex flex-col gap-2 border-b px-4 py-3 sm:flex-row sm:items-center sm:justify-between ${isDark ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-slate-50'}`}>
            <div className='flex min-w-0 items-center gap-3'>
              <div className='flex gap-1.5' aria-hidden='true'>
                <div className='h-2.5 w-2.5 rounded-full bg-red-400' />
                <div className='h-2.5 w-2.5 rounded-full bg-amber-400' />
                <div className='h-2.5 w-2.5 rounded-full bg-emerald-400' />
              </div>
              <span className='truncate text-xs text-foreground/55'>FlexDoc 2.3 product showcase — client 2.3.0</span>
            </div>
            <div className='flex flex-wrap items-center gap-2 sm:justify-end'>
              <span className='inline-flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-300'>
                <Workflow size={13} /> Open an operation → Try It → Open in API Client
              </span>
              <button type='button' onClick={toggleFullscreen} className='inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/70 px-2.5 py-1.5 text-xs font-semibold text-foreground/65 transition hover:border-blue-500/35 hover:text-blue-600 dark:hover:text-blue-300' aria-pressed={isFullscreen} title={isFullscreen ? 'Exit fullscreen' : 'View FlexDoc fullscreen'}>
                {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                {isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
              </button>
            </div>
          </div>
          <div className={isFullscreen ? 'h-[calc(100vh-54px)] min-w-0 overflow-auto' : 'h-[68dvh] min-h-[500px] max-h-[620px] min-w-0 overflow-auto sm:h-[74dvh] sm:min-h-[620px] sm:max-h-[760px] lg:h-[800px] lg:max-h-none'}>
            <FlexDocClientWrapper theme={isDark ? 'dark' : 'light'} />
          </div>
        </div>

        <div className='mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-border bg-card/70 p-6 text-center sm:flex-row sm:text-left'>
          <div>
            <h2 className='font-semibold'>The same canonical renderer ships across the ecosystem.</h2>
            <p className='mt-1 text-sm text-foreground/58'>React and Node, ASP.NET Core, JVM frameworks, Python, PHP, Ruby, Go, Rust and Elixir all share the same renderer contract.</p>
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
