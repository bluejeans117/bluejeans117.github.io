import { AlertTriangle, Check, Code2, Layers3, Route, ShieldCheck, TerminalSquare, Workflow } from 'lucide-react';

const coverage = [
  {
    title: 'Specifications & references',
    icon: Layers3,
    items: [
      'OpenAPI 3.0.x and 3.1.x in JSON or YAML',
      'local JSON Pointer references, including escaped tokens',
      'external, nested and circular $ref bundling, including references back to the root document',
      'referenced parameters, request bodies and responses',
      'recursive component schemas without infinite expansion',
    ],
  },
  {
    title: 'Servers & parameters',
    icon: Route,
    items: [
      'root, path and operation server precedence',
      'server variables with defaults/enums plus arbitrary custom server overrides',
      'query form arrays/objects with explode true or false',
      'spaceDelimited, pipeDelimited and flat deepObject query serialization',
      'simple, label and matrix path serialization',
      'header and cookie parameters plus allowReserved values',
    ],
  },
  {
    title: 'Authentication & security',
    icon: ShieldCheck,
    items: [
      'Bearer and Basic HTTP authentication',
      'API keys in header, query and cookie locations',
      'OAuth2 and OpenID Connect access-token injection as Bearer',
      'OpenAPI security OR alternatives and multi-scheme AND requirements',
      'request interceptors and configurable Fetch credentials behavior',
    ],
  },
  {
    title: 'Bodies, responses & schemas',
    icon: Code2,
    items: [
      'JSON, application/x-www-form-urlencoded and multipart/form-data bodies',
      'response status, headers and body inspection',
      'allOf, oneOf and anyOf composition plus recursive schemas',
      'OpenAPI 3.0 nullable and OpenAPI 3.1 type arrays containing null',
      'const, enum, defaults, examples and schema-valued additionalProperties',
    ],
  },
  {
    title: 'Docs, Try It & code generation',
    icon: Workflow,
    items: [
      'responsive reference UI, endpoint search and stable deep links',
      'Try It request editing and execution from OpenAPI operations',
      'Try It → API Client handoff without rebuilding the request',
      'cURL, JavaScript, Python, Go and Java samples from the same canonical request',
      'light/dark themes, logos, CSS/theme tokens, tag groups, extensions and renderer options',
    ],
  },
  {
    title: 'Standalone API Client',
    icon: TerminalSquare,
    items: [
      'arbitrary GET/POST/PUT/PATCH/DELETE/HEAD/OPTIONS requests',
      'editable URL, ordered query parameters and headers',
      'None, Bearer, Basic and API-key authorization',
      'editable content type and request body',
      'configured server selection, custom server URL and canonical request-change callbacks',
      'live response status, headers and body rendering',
    ],
  },
];

const integrations = [
  ['React', '@prauga/flexdoc-client', 'Direct FlexDoc + ApiClient components'],
  ['Express', 'swagger-jsdoc or explicit spec', 'setupExpressFlexDoc'],
  ['Fastify', '@fastify/swagger', 'setupFastifySwaggerFlexDoc / setupFastifyFlexDoc'],
  ['NestJS', '@nestjs/swagger decorators', 'setupNestFlexDoc'],
  ['Spring Boot', 'springdoc annotations', 'flexdoc-spring-boot-starter'],
  ['Python', 'FastAPI OpenAPI or generic ASGI', 'setup_fastapi_flexdoc / FlexDocASGI'],
  ['Go', 'Huma or any JSON-serializable OpenAPI 3.x value', 'HandlerFromOpenAPI / Handler'],
  ['Rust', 'utoipa / utoipa-axum', 'router_with_openapi / router'],
  ['CLI / static', 'JSON or YAML document', 'serve --watch / build --out'],
  ['Standalone browser', 'packaged JS + CSS', 'No runtime CDN dependency'],
];

const constraints = [
  'OAuth2/OpenID support injects a supplied access token; FlexDoc 2.2 does not implement the OAuth authorization-code flow itself.',
  'deepObject is first-class for flat object properties; nested deep-object expansion is not recursive.',
  'multipart requests use FormData, but binary file picking is not yet a first-class renderer control.',
  'patternProperties / JSON Schema conditionals, webhooks, callbacks and XML metadata are retained or partially modeled but are not complete first-class interactive surfaces.',
  'Swagger/OpenAPI 2.0 is not accepted; integrations should generate OpenAPI 3.x.',
];

export function FlexDocFeatureSurface() {
  return (
    <section className='border-y border-border bg-card/35 px-4 py-20 sm:py-24'>
      <div className='container mx-auto max-w-6xl'>
        <div className='max-w-3xl'>
          <div className='text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300'>2.2 feature surface</div>
          <h2 className='mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl'>Coverage down to the request semantics.</h2>
          <p className='mt-4 text-base leading-7 text-foreground/62'>
            This is the shipped 2.2 surface, not a roadmap list. The OpenAPI items below mirror FlexDoc&apos;s tested compatibility corpus; the live showcase exercises the first-class interactive behaviors and the playground accepts your own 3.0/3.1 document.
          </p>
        </div>

        <div className='mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {coverage.map(({ title, icon: Icon, items }) => (
            <article key={title} className='rounded-2xl border border-border bg-background/70 p-6'>
              <div className='mb-4 inline-flex rounded-xl bg-blue-500/10 p-2.5 text-blue-600 dark:text-blue-300'><Icon size={19} /></div>
              <h3 className='font-semibold'>{title}</h3>
              <div className='mt-4 space-y-2.5'>
                {items.map((item) => (
                  <div key={item} className='flex gap-2.5 text-sm leading-5 text-foreground/64'>
                    <Check className='mt-0.5 h-4 w-4 shrink-0 text-emerald-500' />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className='mt-12'>
          <div className='max-w-3xl'>
            <div className='text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-300'>Code-first & distribution coverage</div>
            <h3 className='mt-3 text-2xl font-semibold tracking-tight'>Use each ecosystem&apos;s native OpenAPI generator.</h3>
            <p className='mt-3 text-sm leading-6 text-foreground/62'>FlexDoc does not invent a competing annotation system. Framework-native schemas, decorators, annotations, types and macros remain the source of truth; thin adapters feed the resulting OpenAPI document into the canonical renderer.</p>
          </div>
          <div className='mt-6 overflow-hidden rounded-2xl border border-border bg-background/70'>
            <div className='hidden grid-cols-[0.7fr_1.25fr_1.35fr] gap-3 border-b border-border bg-card px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-foreground/45 sm:grid'>
              <span>Ecosystem</span><span>OpenAPI source</span><span>FlexDoc surface</span>
            </div>
            {integrations.map(([ecosystem, source, surface]) => (
              <div key={ecosystem} className='grid grid-cols-1 gap-1 border-b border-border/70 px-4 py-4 text-sm last:border-b-0 sm:grid-cols-[0.7fr_1.25fr_1.35fr] sm:gap-3'>
                <strong>{ecosystem}</strong><span className='text-foreground/60'>{source}</span><span className='font-mono text-xs leading-5 text-foreground/70'>{surface}</span>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-10 rounded-2xl border border-amber-500/25 bg-amber-500/5 p-6'>
          <div className='flex items-start gap-3'>
            <AlertTriangle className='mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-300' />
            <div>
              <h3 className='font-semibold'>Deliberate 2.2 boundaries</h3>
              <div className='mt-3 space-y-2 text-sm leading-6 text-foreground/62'>
                {constraints.map((item) => <p key={item}>{item}</p>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
