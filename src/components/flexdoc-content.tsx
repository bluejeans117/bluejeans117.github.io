'use client';

import Link from 'next/link';
import { FlexDocFeatureSurface } from './flexdoc-feature-surface';
import { FlexDocInstallSelector } from './flexdoc-install-selector';
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
    icon: Workflow,
    title: 'Try It → API Client',
    description:
      'Snapshot the built OpenAPI request into an editable HTTP client with method, URL, query, headers, auth, body, custom servers and response inspection.',
  },
  {
    icon: Layers3,
    title: 'One canonical renderer',
    description:
      'React/Node, .NET, JVM, Python, PHP, Ruby, Go, Rust and Elixir hosts share the renderer contract instead of reimplementing OpenAPI behavior per framework.',
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
  '2.3 workspace source adds collections, environments, variables, scripts, tests and history around the API Client',
  'JSON, form-urlencoded and multipart request bodies',
  'deepObject, matrix, label, pipe/space-delimited and explode parameter semantics',
  'light/dark themes plus typed renderer configuration',
  'responsive mobile navigation and operation deep links',
  'CLI local serving, static export and standalone JS/CSS for non-React hosts',
];



export function FlexDocContent() {
  return (
    <div className='overflow-hidden'>
      <section className='relative border-b border-border px-4 pb-16 pt-12 sm:pb-24 sm:pt-24'>
        <div className='pointer-events-none absolute left-1/2 top-8 -z-10 h-[520px] w-[850px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl' />
        <div className='container mx-auto max-w-6xl'>
          <div className='mx-auto max-w-4xl text-left sm:text-center'>
            <div className='mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-600 dark:text-blue-300'>
              <Sparkles size={15} /> FlexDoc 2.3 · one renderer across the stack
            </div>
            <h1 className='text-pretty text-[2.4rem] font-semibold leading-[1.04] tracking-[-0.05em] sm:text-balance sm:text-6xl md:text-7xl'>
              Your OpenAPI spec should be more than a static reference.
            </h1>
            <p className='mx-auto mt-6 max-w-3xl text-balance text-base leading-7 text-foreground/65 sm:mt-7 sm:text-xl sm:leading-8'>
              FlexDoc is Prauga's open-source, self-hosted OpenAPI documentation renderer, Try It explorer and local API workspace. The 2.3 milestone closes broad framework coverage while keeping one canonical renderer and request model across docs, execution, API Client handoff, saved workspaces and generated code.
            </p>
            <div className='mt-8 grid grid-cols-2 gap-2.5 sm:mt-9 sm:flex sm:justify-center sm:gap-3'>
              <Link
                href='/flexdoc/demo'
                className='inline-flex min-w-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-3 text-xs sm:rounded-full sm:px-6 sm:text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500'
              >
                <Play size={16} /> Try the live demo
              </Link>
              <Link
                href='/flexdoc/client'
                className='inline-flex min-w-0 items-center justify-center gap-2 rounded-xl border border-violet-500/25 bg-violet-500/10 px-3 py-3 text-xs sm:rounded-full sm:px-6 sm:text-sm font-semibold text-violet-700 transition hover:-translate-y-0.5 hover:bg-violet-500/15 dark:text-violet-300'
              >
                <Workflow size={16} /> Open API Client
              </Link>
              <a
                href='https://github.com/prauga/flexdoc'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex min-w-0 items-center justify-center gap-2 rounded-xl border border-border bg-card px-3 py-3 text-xs sm:rounded-full sm:px-6 sm:text-sm font-semibold transition hover:border-blue-500/30'
              >
                <Github size={16} /> GitHub <ExternalLink size={13} />
              </a>
              <a
                href='#install'
                className='inline-flex min-w-0 items-center justify-center gap-2 rounded-xl border border-border bg-card px-3 py-3 text-xs sm:rounded-full sm:px-6 sm:text-sm font-semibold transition hover:border-blue-500/30'
              >
                <Package size={16} /> Install
              </a>
            </div>
          </div>

          <div className='mx-auto mt-16 grid max-w-4xl gap-3 sm:grid-cols-3'>
            {[
              ['OpenAPI', '3.0 + 3.1'],
              ['Product milestone', '2.3.0'],
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

      <section id='install' className='border-b border-border px-4 py-14 sm:py-20'>
        <div className='container mx-auto max-w-6xl'>
          <div className='max-w-3xl'>
            <div className='text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300'>Install</div>
            <h2 className='mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl'>Pick your framework. Get the exact setup.</h2>
            <p className='mt-4 text-base leading-7 text-foreground/62'>
              FlexDoc 2.3 is a product milestone, not a forced package-version lockstep. Choose the framework you already run and get the independently versioned package, install command and minimal native integration for that stack.
            </p>
          </div>
          <FlexDocInstallSelector />
        </div>
      </section>

      <section className='px-4 py-16 sm:py-24'>
        <div className='container mx-auto max-w-6xl'>
          <div className='flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
            <div className='max-w-3xl'>
              <div className='text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300'>Real FlexDoc renderer · Chromium capture</div>
              <h2 className='mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl'>See the full renderer, Try It and API Client workflow.</h2>
              <p className='mt-4 text-base leading-7 text-foreground/62'>
                These screenshots are captured from this portfolio running Prauga's canonical renderer with a full-surface OpenAPI setup: regional server variables, authentication, advanced parameters, nested schemas, Try It, live response inspection and generated request code. The images automatically match this site&apos;s light or dark theme.
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
                  The capture fills advanced request inputs, sends the request, renders the response and hands the exact built request into the editable API Client — all through the same canonical request model.
                </p>
                <div className='mt-5 flex flex-wrap gap-2 text-xs text-foreground/58'>
                  {['Try It → API Client', '5 auth families', 'Custom servers', 'Advanced serialization', 'Response viewer', '5 code languages'].map((item) => (
                    <span key={item} className='rounded-full border border-border bg-background/70 px-3 py-1.5'>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='border-t border-border px-4 pb-20 sm:pb-24'>
        <div className='container mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-center'>
          <div className='rounded-3xl border border-violet-500/20 bg-violet-500/5 p-7'>
            <div className='text-xs font-semibold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-300'>API Client foundation</div>
            <h3 className='mt-3 text-2xl font-semibold tracking-tight'>The published editor is the base of the 2.3 workspace.</h3>
            <p className='mt-3 text-sm leading-6 text-foreground/62'>The live portfolio screenshot uses the published low-level API Client. Current 2.3 source layers collections, folders, named environments, variables, trusted pre-request scripts, response tests and history around that same canonical editor without vendoring unpublished npm code here.</p>
            <Link href='/flexdoc/client' className='mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:underline dark:text-violet-300'>Open published API client <ArrowRight size={14} /></Link>
          </div>
          <figure className='overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-black/10'>
            <img src='/img/flexdoc/showcase-api-client-light.jpg' alt='FlexDoc published API Client in light mode' className='block h-auto w-full dark:hidden' loading='lazy' />
            <img src='/img/flexdoc/showcase-api-client-dark.jpg' alt='FlexDoc published API Client in dark mode' className='hidden h-auto w-full dark:block' loading='lazy' />
          </figure>
        </div>
      </section>

      <section className='px-4 py-16 sm:py-24'>
        <div className='container mx-auto max-w-6xl'>
          <div className='max-w-3xl'>
            <div className='text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300'>FlexDoc today</div>
            <h2 className='mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl'>
              The renderer grew into an API exploration engine.
            </h2>
            <p className='mt-4 text-base leading-7 text-foreground/62'>
              FlexDoc 2.3 turns the API Client into a reusable local workspace and closes the framework-coverage stack. The same renderer contract now spans React and Node, ASP.NET Core, the JVM ecosystem, Python ASGI/WSGI, PHP, Ruby, Go, Rust and Elixir, plus CLI/static distribution.
            </p>
          </div>

          <div className='mobile-snap-row mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3'>
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className='glass-card w-[82vw] max-w-[320px] shrink-0 snap-start rounded-2xl p-5 sm:p-6 md:w-auto md:max-w-none md:shrink'>
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

      <FlexDocFeatureSurface />

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
                  [Blocks, 'React component plus standalone browser renderer'],
                  [ServerCog, 'Express, Fastify, NestJS and Hono on Node'],
                  [Workflow, '.NET, JVM, Python, PHP, Ruby, Go, Rust and Elixir hosts'],
                  [Globe2, 'CLI/static export and self-contained assets with no runtime CDN'],
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
                  {['React / Node', '.NET / JVM', 'Python / PHP / Ruby', 'Go / Rust / Elixir'].map((target) => (
                    <div key={target} className='rounded-lg border border-blue-400/20 bg-blue-400/10 px-3 py-2 text-center text-xs text-blue-200'>{target}</div>
                  ))}
                </div>
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
              <h2 className='text-2xl font-semibold tracking-tight'>API Client grew into a local workspace</h2>
              <p className='mt-3 text-sm leading-6 text-foreground/62'>
                The browser workspace now persists collections, folders, saved requests, environments, scripts, response tests and request history locally. Try It still hands off the same canonical request, so workspace features build on request semantics instead of duplicating them.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='px-4 py-16 sm:py-24'>
        <div className='container mx-auto max-w-4xl text-center'>
          <h2 className='text-3xl font-semibold tracking-[-0.03em] sm:text-4xl'>Open the spec. Explore it. Call it.</h2>
          <p className='mx-auto mt-4 max-w-2xl text-base leading-7 text-foreground/62'>
            FlexDoc 2.3 is open source under AGPL-3.0-or-later. Use the live demo, use the install selector above, or inspect the architecture on GitHub.
          </p>
          <div className='mt-8 flex flex-col justify-center gap-3 sm:flex-row'>
            <Link href='/flexdoc/demo' className='inline-flex min-w-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-3 text-xs sm:rounded-full sm:px-6 sm:text-sm font-semibold text-white transition hover:bg-blue-500'>
              Launch demo <ArrowRight size={16} />
            </Link>
            <a href='https://github.com/prauga/flexdoc' target='_blank' rel='noopener noreferrer' className='inline-flex min-w-0 items-center justify-center gap-2 rounded-xl border border-border bg-card px-3 py-3 text-xs sm:rounded-full sm:px-6 sm:text-sm font-semibold transition hover:border-blue-500/30'>
              <Github size={16} /> View source
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
