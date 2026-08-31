'use client';

import { ArrowLeft, FileJson, RefreshCw, UploadCloud } from 'lucide-react';
import { useTheme } from 'next-themes';
import { ChangeEvent, DragEvent, useCallback, useEffect, useState } from 'react';
import { FlexDocClientWrapper } from './flexdoc-client-wrapper';
import { sampleEcommerceSpec } from '@/data/sample-openapi-spec';

type ParserModule = {
  OpenAPIParser: {
    parseSpec(input: string | object): Promise<unknown>;
  };
};

export function FlexDocPlayground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = mounted && resolvedTheme === 'dark';
  const [spec, setSpec] = useState<unknown>(sampleEcommerceSpec);
  const [fileName, setFileName] = useState('Sample e-commerce API');
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const parseFile = useCallback(async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      const text = await file.text();
      const module = (await import('@prauga/flexdoc-client')) as unknown as ParserModule;
      const parsed = await module.OpenAPIParser.parseSpec(text);
      setSpec(parsed);
      setFileName(file.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not parse this OpenAPI document.');
    } finally {
      setLoading(false);
    }
  }, []);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) void parseFile(file);
    event.target.value = '';
  };

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) void parseFile(file);
  };

  const reset = () => {
    setSpec(sampleEcommerceSpec);
    setFileName('Sample e-commerce API');
    setError(null);
  };

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto max-w-[1500px] px-3 py-8 sm:px-4 sm:py-10'>
        <a href='/flexdoc' className='mb-6 inline-flex items-center gap-2 text-sm text-blue-600 hover:underline dark:text-blue-300'>
          <ArrowLeft size={16} /> Back to FlexDoc
        </a>

        <div className='mb-7 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end'>
          <div>
            <div className='mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300'>
              <UploadCloud size={14} /> Your spec, rendered locally
            </div>
            <h1 className='text-3xl font-semibold tracking-[-0.03em] sm:text-4xl'>Try FlexDoc with your own OpenAPI document</h1>
            <p className='mt-3 max-w-3xl text-sm leading-6 text-foreground/62 sm:text-base'>
              Drop an OpenAPI 3.0 or 3.1 JSON/YAML file below. The file is read and parsed in your browser; this portfolio does not upload the specification anywhere.
            </p>
          </div>

          <div className='flex flex-col gap-3 sm:flex-row lg:justify-end'>
            <label
              onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed px-5 py-3 text-sm font-semibold transition ${dragging ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-300' : 'border-border bg-card hover:border-blue-500/40'}`}
            >
              <UploadCloud size={17} /> {loading ? 'Parsing…' : 'Choose or drop a spec'}
              <input className='sr-only' type='file' accept='.json,.yaml,.yml,application/json,application/yaml,text/yaml,text/x-yaml' onChange={onFileChange} disabled={loading} />
            </label>
            <button onClick={reset} className='inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold transition hover:border-blue-500/30'>
              <RefreshCw size={16} /> Reset sample
            </button>
          </div>
        </div>

        {error && (
          <div className='mb-5 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300'>
            {error}
          </div>
        )}

        <div className='overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/10'>
          <div className='flex flex-col gap-2 border-b border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex min-w-0 items-center gap-2 text-sm font-semibold'>
              <FileJson size={16} className='shrink-0 text-blue-600 dark:text-blue-300' />
              <span className='truncate'>{fileName}</span>
            </div>
            <span className='text-xs text-foreground/45'>FlexDoc 2.1.0 · {isDark ? 'dark' : 'light'} theme</span>
          </div>
          <div className='min-h-[760px] overflow-auto sm:h-[820px]'>
            <FlexDocClientWrapper theme={isDark ? 'dark' : 'light'} spec={spec} title={fileName} />
          </div>
        </div>
      </div>
    </div>
  );
}
