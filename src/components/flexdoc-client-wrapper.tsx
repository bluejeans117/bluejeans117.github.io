'use client';

import dynamic from 'next/dynamic';
import type { FlexDocProps, FlexDocRendererOptions, OpenAPISpec } from '@prauga/flexdoc-client';
import '@prauga/flexdoc-client/styles.css';
import showcaseSpec from '@/data/flexdoc-showcase-openapi.json';

const FlexDoc = dynamic<FlexDocProps>(
  () => import('@prauga/flexdoc-client').then((mod) => mod.FlexDoc),
  { ssr: false }
);

const logo = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="34" viewBox="0 0 120 34"%3E%3Crect width="120" height="34" rx="9" fill="%230f172a"/%3E%3Ccircle cx="17" cy="17" r="7" fill="%2360a5fa"/%3E%3Ctext x="31" y="22" fill="white" font-family="Arial,sans-serif" font-size="15" font-weight="700"%3EFlexDoc 2.8%3C/text%3E%3C/svg%3E';

function fullSurfaceOptions(theme: 'light' | 'dark', title: string): FlexDocRendererOptions {
  return {
    contractVersion: '1',
    title,
    description: 'Complete FlexDoc 2.8 product showcase across the canonical renderer, Try It and API Client.',
    altDescription: 'OpenAPI documentation that can execute and hand off requests.',
    version: '2.8.0',
    tagGroups: [
      { name: 'Core API', tags: ['Pets', 'Search'] },
      { name: 'Bodies & auth', tags: ['Forms', 'Admin'] },
    ],
    theme: {
      colors: {
        primary: { main: '#2563eb', light: '#60a5fa', dark: '#1d4ed8' },
        success: { main: '#16a34a', light: '#4ade80', dark: '#15803d' },
        error: { main: '#dc2626', light: '#f87171', dark: '#b91c1c' },
        text: {
          primary: theme === 'dark' ? '#f8fafc' : '#0f172a',
          secondary: theme === 'dark' ? '#cbd5e1' : '#475569',
        },
        gray: { 50: '#f8fafc', 100: '#f1f5f9' },
        border: { light: '#e2e8f0', dark: '#334155' },
      },
      typography: {
        fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
        fontSize: '15px',
        lineHeight: '1.6',
        headings: { fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif', fontWeight: '700' },
        code: {
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: '13px',
          lineHeight: '1.55',
          wrap: true,
        },
      },
      sidebar: {
        backgroundColor: '#f8fafc',
        backgroundColorDark: '#0f172a',
        textColor: '#334155',
        textColorDark: '#cbd5e1',
        activeTextColor: '#1d4ed8',
        activeTextColorDark: '#93c5fd',
        borderColor: '#e2e8f0',
        borderColorDark: '#334155',
        groupItems: { textTransform: 'uppercase' },
      },
      methodColors: {
        get: { bg: theme === 'dark' ? '#172554' : '#dbeafe', border: '#3b82f6' },
        post: { bg: theme === 'dark' ? '#052e16' : '#dcfce7', border: '#22c55e' },
        put: { bg: theme === 'dark' ? '#422006' : '#fef3c7', border: '#f59e0b' },
        patch: { bg: theme === 'dark' ? '#3b0764' : '#f3e8ff', border: '#a855f7' },
        delete: { bg: theme === 'dark' ? '#450a0a' : '#fee2e2', border: '#ef4444' },
      },
    },
    logo: { url: logo, alt: 'FlexDoc 2.8', maxHeight: 34, maxWidth: 120, clickable: false },
    customCss: '.flexdoc-root { --portfolio-flexdoc-surface: 2.8; }',
    hideDownloadButton: false,
    hideTopbar: false,
    expand: 'none',
    defaultModelsExpandDepth: 2,
    showExtensions: true,
    showCommonExtensions: true,
    hideHostname: false,
    hideLoading: false,
    nativeScrollbars: true,
    pathInMiddlePanel: true,
    requiredPropsFirst: true,
    sortPropsAlphabetically: true,
    showRequestHeaders: true,
    noAutoAuth: false,
    lazyRendering: false,
    scrollYOffset: 64,
    suppressWarnings: false,
    payloadSampleIdx: 1,
    tryIt: {
      enabled: true,
      defaultServer: 'https://staging.api.example.test/v1',
      credentials: 'same-origin',
      requestInterceptor: (request) => ({
        ...request,
        headers: { ...request.headers, 'X-FlexDoc-Portfolio': '2.8-full-surface' },
      }),
    },
    codeSamples: {
      enabled: true,
      languages: ['curl', 'javascript', 'python', 'go', 'java'],
    },
    footer: {
      copyright: 'Prauga FlexDoc 2.8 full-surface showcase',
      link: [
        { text: 'Repository', url: 'https://github.com/prauga/flexdoc' },
        { text: 'AGPL-3.0', url: 'https://www.gnu.org/licenses/agpl-3.0.html' },
      ],
    },
  };
}

export interface FlexDocClientWrapperProps {
  theme: 'light' | 'dark';
  spec?: OpenAPISpec | unknown;
  title?: string;
}

export function FlexDocClientWrapper({
  theme,
  spec = showcaseSpec as unknown as OpenAPISpec,
  title = 'FlexDoc 2.8 full-surface showcase',
}: FlexDocClientWrapperProps) {
  return (
    <FlexDoc
      spec={spec as OpenAPISpec}
      theme={theme}
      options={fullSurfaceOptions(theme, title)}
    />
  );
}
