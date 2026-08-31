'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Blocks,
  Braces,
  Check,
  Code2,
  ExternalLink,
  Github,
  Globe2,
  Layers3,
  LockKeyhole,
  Package,
  Play,
  Route,
  Search,
  ServerCog,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Workflow,
  Zap,
} from 'lucide-react';

const features = [
  {
    icon: Play,
    title: 'A real Try It flow',
    description:
      'Edit parameters, bodies and authentication, choose servers, send the request and inspect the live response without leaving the docs.',
  },
  {
    icon: Layers3,
    title: 'One canonical renderer',
    description:
      'React, standalone browser assets, Node adapters and Spring Boot use the same renderer instead of reimplementing OpenAPI behavior in every framework.',
  },
  {
    icon: Braces,
    title: 'OpenAPI 3.0 + 3.1',
    description:
      'Normalization, composition, recursive schemas, local and relative external references, server variables and richer parameter serialization.',
  },
  {
    icon: Code2,
    title: 'Request-derived code samples',
    description:
      'cURL, JavaScript, Python, Go and Java samples are generated from the same canonical request model that powers Try It.',
  },
  {
    icon: Search,
    title: 'Search + deep links',
    description:
      'Responsive navigation, endpoint search and stable operation hashes make large API references easier to browse and share.',
  },
  {
    icon: ShieldCheck,
    title: 'Self-hosted by default',
    description:
      'No FlexDoc account, hosted dashboard, telemetry service or runtime CDN is required. Renderer assets ship with the integration.',
  },
];

const details = [
  'API key, Basic, Bearer and OAuth2/OpenID bearer request authentication',
  'JSON, form-urlencoded and multipart request bodies',
  'deepObject, matrix, label, pipe/space-delimited and explode parameter semantics',
  'light/dark themes plus typed renderer configuration',
  'responsive mobile navigation and operation deep links',
  'CLI local serving, static export and standalone JS/CSS for non-React hosts',
];

const integrations = [
  {
    title: 'React',
    description: 'Embed the canonical renderer directly in a React application.',
    install: 'npm install @prauga/flexdoc-client@^2',
    code: `import { FlexDoc } from '@prauga/flexdoc-client';\nimport '@prauga/flexdoc-client/styles.css';\n\nexport function Docs({ spec }) {\n  return (\n    <FlexDoc\n      spec={spec}\n      theme="light"\n      options={{ tryIt: { enabled: true } }}\n    />\n  );\n}`,
  },
  {
    title: 'Express',
    description: 'Mount FlexDoc beside the API without creating a separate docs application.',
    install: 'npm install @prauga/flexdoc-backend@^2',
    code: `import express from 'express';\nimport { setupExpressFlexDoc } from '@prauga/flexdoc-backend';\n\nconst app = express();\n\nsetupExpressFlexDoc(app, {\n  path: '/docs',\n  specUrl: 'https://example.com/openapi.json',\n  options: { title: 'Example API' },\n});`,
  },
  {
    title: 'NestJS',
    description: 'Generate through @nestjs/swagger and serve it through the same FlexDoc renderer.',
    install: 'npm install @prauga/flexdoc-backend@^2',
    code: `import { setupNestFlexDoc } from '@prauga/flexdoc-backend';\n\nawait setupNestFlexDoc(app, {\n  path: '/docs',\n  options: { title: 'My API' },\n});`,
  },
];

const packageLinks = [
  {
    ecosystem: 'React',
    packageName: '@prauga/flexdoc-client',
    version: '2.1.0',
    registry: 'npm',
    href: 'https://www.npmjs.com/package/@prauga/flexdoc-client',
  },
  {
    ecosystem: 'Node',
    packageName: '@prauga/flexdoc-backend',
    version: '2.1.0',
    registry: 'npm',
    href: 'https://www.npmjs.com/package/@prauga/flexdoc-backend',
  },
  {
    ecosystem: 'CLI',
    packageName: '@prauga/flexdoc-cli',
    version: '0.1.0',
    registry: 'npm',
    href: 'https://www.npmjs.com/package/@prauga/flexdoc-cli',
  },
  {
    ecosystem: 'Java',
    packageName: 'com.prauga.flexdoc:flexdoc-spring-boot-starter',
    version: '0.2.0',
    registry: 'Maven Central',
    href: 'https://central.sonatype.com/artifact/com.prauga.flexdoc/flexdoc-spring-boot-starter',
  },
  {
    ecosystem: 'Go',
    packageName: 'github.com/prauga/flexdoc/adapters/go',
    version: '0.1.0',
    registry: 'pkg.go.dev',
    href: 'https://pkg.go.dev/github.com/prauga/flexdoc/adapters/go',
  },
  {
    ecosystem: 'Python',
    packageName: 'prauga-flexdoc',
    version: '0.1.0',
    registry: 'PyPI',
    href: 'https://pypi.org/project/prauga-flexdoc/',
  },
  {
    ecosystem: 'Rust',
    packageName: 'prauga-flexdoc-axum',
    version: '0.1.0',
    registry: 'crates.io',
    href: 'https://crates.io/crates/prauga-flexdoc-axum',
  },
];

function CodePanel({ children }: { children: string }) {
  return (
    <pre className='overflow-x-auto rounded-xl border border-white/10 bg-slate-950 p-4 text-[13px] leading-6 text-slate-200 shadow-inner'>
      <code>{children}</code>
    </pre>
  );
}

export function FlexDocContent() {
  return (
    <div className='overflow-hidden'>
      <section className='relative border-b border-border px-4 pb-20 pt-16 sm:pb-24 sm:pt-24'>
        <div className='pointer-events-none absolute left-1/2 top-8 -z-10 h-[520px] w-[850px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl' />
        <div className='container mx-auto max-w-6xl'>
          <div className='mx-auto max-w-4xl text-center'>
            <div className='mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-600 dark:text-blue-300'>
              <Sparkles size={15} /> FlexDoc 2.1 · now a Prauga project
            </div>
            <h1 className='text-balance text-5xl font-semibold tracking-[-0.05em] sm:text-6xl md:text-7xl'>
              Your OpenAPI spec should be more than a static reference.
            </h1>
            <p className='mx-auto mt-7 max-w-3xl text-balance text-lg leading-8 text-foreground/65 sm:text-xl'>
              FlexDoc is Prauga's open-source, self-hosted OpenAPI documentation renderer and API explorer. One canonical renderer now spans React, backend integrations, CLI/static export and language adapters without a hosted FlexDoc service.
            </p>
            <div className='mt-9 flex flex-col justify-center gap-3 sm:flex-row'>
              <Link
                href='/flexdoc/demo'
                className='inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500'
              >
                <Play size={16} /> Try the live demo
              </Link>
              <a
                href='https://github.com/prauga/flexdoc'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition hover:border-blue-500/30'
              >
                <Github size={16} /> GitHub <ExternalLink size={13} />
              </a>
              <a
                href='https://www.npmjs.com/package/@prauga/flexdoc-client'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition hover:border-blue-500/30'
              >
                <Package size={16} /> npm client
              </a>
            </div>
          </div>

          <div className='mx-auto mt-16 grid max-w-4xl gap-3 sm:grid-cols-3'>
            {[
              ['OpenAPI', '3.0 + 3.1'],
              ['Prauga client', '2.1.0'],
              ['Runtime CDN', 'None required'],
            ].map(([label, value]) => (
              <div key={label} className='rounded-2xl border border-border bg-card/70 p-5 text-center backdrop-blur'>
                <div className='text-xs font-semibold uppercase tracking-[0.18em] text-foreground/45'>{label}</div>
                <div className='mt-2 font-semibold'>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='border-b border-border px-4 py-16 sm:py-20'>
        <div className='container mx-auto max-w-6xl'>
          <div className='max-w-3xl'>
            <div className='text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300'>Package family</div>
            <h2 className='mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl'>Install FlexDoc in the ecosystem you already use.</h2>
            <p className='mt-4 text-base leading-7 text-foreground/62'>
              Prauga publishes the canonical renderer and thin adapters across npm, Maven Central, Go, PyPI and crates.io. Each integration ships version-matched renderer assets rather than depending on a hosted FlexDoc runtime.
            </p>
          </div>

          <div className='mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {packageLinks.map((pkg) => (
              <a
                key={pkg.packageName}
                href={pkg.href}
                target='_blank'
                rel='noopener noreferrer'
                className='group rounded-2xl border border-border bg-card/70 p-5 transition hover:-translate-y-0.5 hover:border-blue-500/35 hover:shadow-lg'
              >
                <div className='flex items-start justify-between gap-4'>
                  <div>
                    <div className='text-xs font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-300'>{pkg.ecosystem}</div>
                    <div className='mt-2 break-all font-mono text-sm font-semibold'>{pkg.packageName}</div>
                  </div>
                  <ExternalLink className='mt-1 h-4 w-4 shrink-0 text-foreground/35 transition group-hover:text-blue-500' />
                </div>
                <div className='mt-4 flex items-center justify-between gap-3 text-xs text-foreground/50'>
                  <span>{pkg.registry}</span>
                  <span>v{pkg.version}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className='px-4 py-20 sm:py-24'>
        <div className='container mx-auto max-w-6xl'>
          <div className='flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
            <div className='max-w-3xl'>
              <div className='text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300'>Real renderer · Chromium capture</div>
              <h2 className='mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl'>See FlexDoc configured like a production API surface.</h2>
              <p className='mt-4 text-base leading-7 text-foreground/62'>
                These screenshots are captured from the real Prauga FlexDoc browser renderer with a feature-heavy OpenAPI setup: regional server variables, authentication, advanced parameters, nested schemas, Try It, live response inspection and generated request code. The images automatically match this site&apos;s light or dark theme.
              </p>
            </div>
            <Link href='/flexdoc/demo' className='inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-blue-600 hover:underline dark:text-blue-300'>
              Open the interactive demo <ArrowRight size={15} />
            </Link>
          </div>

          <div className='mt-10 space-y-6'>
            <figure className='overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-black/10'>
              <img src='/img/flexdoc/showcase-overview-light.jpg' alt='FlexDoc production-style API overview in light mode' className='block h-auto w-full dark:hidden' loading='lazy' />
              <img src='/img/flexdoc/showcase-overview-dark.jpg' alt='FlexDoc production-style API overview in dark mode' className='hidden h-auto w-full dark:block' loading='lazy' />
              <figcaption className='border-t border-border px-5 py-4 text-sm text-foreground/58'>
                Full API overview with navigation, OpenAPI metadata, multiple operations and configurable servers.
              </figcaption>
            </figure>

            <div className='grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-center'>
              <figure className='overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-black/10'>
                <img src='/img/flexdoc/showcase-try-it-light.jpg' alt='FlexDoc Try It request, response and code generation in light mode' className='block h-auto w-full dark:hidden' loading='lazy' />
                <img src='/img/flexdoc/showcase-try-it-dark.jpg' alt='FlexDoc Try It request, response and code generation in dark mode' className='hidden h-auto w-full dark:block' loading='lazy' />
              </figure>
              <div className='rounded-3xl border border-blue-500/20 bg-blue-500/5 p-7'>
                <div className='text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-300'>Try It, end to end</div>
                <h3 className='mt-3 text-2xl font-semibold tracking-tight'>The docs execute the request they describe.</h3>
                <p className='mt-3 text-sm leading-6 text-foreground/62'>
                  The capture fills path, query, deep-object, header, cookie and bearer inputs, sends a request, renders the response and switches to a generated JavaScript sample — all through the same canonical request model.
                </p>
                <div className='mt-5 flex flex-wrap gap-2 text-xs text-foreground/58'>
                  {['Bearer auth', 'Server variables', 'deepObject', 'Response viewer', '5 code languages'].map((item) => (
                    <span key={item} className='rounded-full border border-border bg-background/70 px-3 py-1.5'>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='px-4 py-20 sm:py-24'>
        <div className='container mx-auto max-w-6xl'>
          <div className='max-w-3xl'>
            <div className='text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300'>FlexDoc today</div>
            <h2 className='mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl'>
              The renderer grew into an API exploration engine.
            </h2>
            <p className='mt-4 text-base leading-7 text-foreground/62'>
              FlexDoc 2.1 builds on the canonical renderer introduced in 2.0 and moves the project under Prauga. The same OpenAPI behavior now powers React, Node integrations, CLI/static export, Spring Boot, Go, Python and Rust adapters.
            </p>
          </div>

          <div className='mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className='glass-card rounded-2xl p-6'>
                <div className='mb-5 inline-flex rounded-xl bg-blue-500/10 p-2.5 text-blue-600 dark:text-blue-300'><Icon size={20} /></div>
                <h3 className='font-semibold tracking-tight'>{title}</h3>
                <p className='mt-2 text-sm leading-6 text-foreground/60'>{description}</p>
              </div>
            ))}
          </div>

          <div className='mt-8 grid gap-3 rounded-2xl border border-border bg-card/60 p-6 sm:grid-cols-2'>
            {details.map((detail) => (
              <div key={detail} className='flex gap-3 text-sm leading-6 text-foreground/68'>
                <Check className='mt-1 h-4 w-4 shrink-0 text-emerald-500' />
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='border-y border-border bg-card/45 px-4 py-20 sm:py-24'>
        <div className='container mx-auto max-w-6xl'>
          <div className='grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center'>
            <div>
              <div className='text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300'>Architecture</div>
              <h2 className='mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl'>One renderer. Many ways to ship it.</h2>
              <p className='mt-5 text-base leading-7 text-foreground/62'>
                Framework adapters no longer implement their own parsing, schemas, code generation or Try It behavior. They obtain the OpenAPI document and host version-matched FlexDoc renderer assets.
              </p>
              <div className='mt-7 space-y-3'>
                {[
                  [Blocks, 'React component and standalone browser renderer'],
                  [ServerCog, 'Express, Fastify and NestJS adapters'],
                  [Globe2, 'Self-contained assets with no runtime third-party CDN'],
                  [Workflow, 'CLI/static export plus Go, Python and Rust adapters'],
                ].map(([Icon, text]) => {
                  const ItemIcon = Icon as typeof Blocks;
                  return (
                    <div key={text as string} className='flex items-center gap-3 text-sm text-foreground/70'>
                      <div className='rounded-lg border border-border bg-background p-2 text-blue-600 dark:text-blue-300'><ItemIcon size={17} /></div>
                      <span>{text as string}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className='rounded-3xl border border-border bg-slate-950 p-6 text-slate-200 shadow-2xl'>
              <div className='mb-5 flex items-center gap-2 border-b border-white/10 pb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400'>
                <Route size={15} /> Renderer flow
              </div>
              <div className='space-y-3 font-mono text-sm'>
                {[
                  'OpenAPI document',
                  'normalization + reference resolution',
                  'canonical renderer + request model',
                ].map((step, index) => (
                  <div key={step}>
                    <div className='rounded-xl border border-white/10 bg-white/5 px-4 py-3'>{step}</div>
                    {index < 2 && <div className='py-1 text-center text-slate-500'>↓</div>}
                  </div>
                ))}
                <div className='grid gap-2 pt-2 sm:grid-cols-2'>
                  {['React', 'CLI / static', 'Node / Spring', 'Go / Python / Rust'].map((target) => (
                    <div key={target} className='rounded-lg border border-blue-400/20 bg-blue-400/10 px-3 py-2 text-center text-xs text-blue-200'>{target}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='px-4 py-20 sm:py-24'>
        <div className='container mx-auto max-w-6xl'>
          <div className='max-w-3xl'>
            <div className='text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300'>Get running</div>
            <h2 className='mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl'>Use FlexDoc where your API already lives.</h2>
          </div>

          <div className='mt-10 grid gap-5 lg:grid-cols-3'>
            {integrations.map((integration) => (
              <article key={integration.title} className='flex flex-col rounded-2xl border border-border bg-card/70 p-5'>
                <div className='flex items-center gap-3'>
                  <div className='rounded-lg bg-blue-500/10 p-2 text-blue-600 dark:text-blue-300'><TerminalSquare size={18} /></div>
                  <h3 className='text-lg font-semibold'>{integration.title}</h3>
                </div>
                <p className='mt-3 min-h-12 text-sm leading-6 text-foreground/60'>{integration.description}</p>
                <div className='mt-4 rounded-lg border border-border bg-background px-3 py-2 font-mono text-xs text-foreground/70'>{integration.install}</div>
                <div className='mt-3'><CodePanel>{integration.code}</CodePanel></div>
              </article>
            ))}
          </div>

          <div className='mt-5 rounded-2xl border border-border bg-card/60 p-6'>
            <div className='flex items-start gap-4'>
              <div className='rounded-xl bg-amber-500/10 p-2.5 text-amber-600 dark:text-amber-300'><Zap size={20} /></div>
              <div>
                <h3 className='font-semibold'>The same renderer now spans multiple ecosystems</h3>
                <p className='mt-2 text-sm leading-6 text-foreground/60'>
                  Prauga maintains the React renderer and Node adapters alongside the Spring Boot starter, Go <code className='rounded bg-background px-1.5 py-0.5'>net/http</code>, Python ASGI and Rust Axum integrations. The CLI can also serve a spec locally or export a self-contained static documentation bundle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='border-y border-border bg-card/45 px-4 py-20 sm:py-24'>
        <div className='container mx-auto max-w-6xl'>
          <div className='grid gap-8 lg:grid-cols-2'>
            <div className='rounded-3xl border border-border bg-background/70 p-7'>
              <div className='mb-4 inline-flex rounded-xl bg-emerald-500/10 p-2.5 text-emerald-600 dark:text-emerald-300'><LockKeyhole size={20} /></div>
              <h2 className='text-2xl font-semibold tracking-tight'>Designed to self-host cleanly</h2>
              <p className='mt-3 text-sm leading-6 text-foreground/62'>
                FlexDoc renderer assets are packaged with the integration. Documentation-route credentials are validated server-side and are not serialized into browser configuration. You control the API, the docs route and the deployment.
              </p>
            </div>
            <div className='rounded-3xl border border-blue-500/20 bg-blue-500/5 p-7'>
              <div className='mb-4 inline-flex rounded-xl bg-blue-500/10 p-2.5 text-blue-600 dark:text-blue-300'><Sparkles size={20} /></div>
              <h2 className='text-2xl font-semibold tracking-tight'>Where FlexDoc goes next</h2>
              <p className='mt-3 text-sm leading-6 text-foreground/62'>
                Try It already provides the request engine. The next major product surface is a browser API-client workspace: saved requests, environments, scripting and assertions built on the same canonical request model — documentation and API testing without duplicating the engine.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='px-4 py-20 sm:py-24'>
        <div className='container mx-auto max-w-4xl text-center'>
          <h2 className='text-3xl font-semibold tracking-[-0.03em] sm:text-4xl'>Open the spec. Explore it. Call it.</h2>
          <p className='mx-auto mt-4 max-w-2xl text-base leading-7 text-foreground/62'>
            FlexDoc 2.1 is open source under AGPL-3.0-or-later. Use the live demo, install the package or inspect the architecture on GitHub.
          </p>
          <div className='mt-8 flex flex-col justify-center gap-3 sm:flex-row'>
            <Link href='/flexdoc/demo' className='inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500'>
              Launch demo <ArrowRight size={16} />
            </Link>
            <a href='https://github.com/prauga/flexdoc' target='_blank' rel='noopener noreferrer' className='inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition hover:border-blue-500/30'>
              <Github size={16} /> View source
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
