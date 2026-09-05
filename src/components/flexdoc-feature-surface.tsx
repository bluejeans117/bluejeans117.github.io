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
      'OAuth2 and OpenID Connect access-token injection from OpenAPI Try It',
      'OpenAPI security OR alternatives and multi-scheme AND requirements',
      'API Client collection/folder/request auth inheritance with explicit No auth overrides',
      'API Client OAuth manual tokens, Authorization Code + PKCE, Client Credentials, Password, Implicit and refresh-token reuse',
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
      'canonical Try It → API Client sessions preserving server and authorization context',
      'cURL, JavaScript, Python, Go and Java samples from the same canonical request',
      'light/dark themes, logos, CSS/theme tokens, tag groups, extensions and renderer options',
      'renderer expansion defaults and viewer settings exposed across adapter configuration',
    ],
  },
  {
    title: 'Local API Client workspace',
    icon: TerminalSquare,
    items: [
      'arbitrary HTTP requests with editable URL, query, headers, auth and bodies',
      'collections, arbitrarily nested folders and reusable saved requests',
      'collection variables plus named environments with deterministic {{variable}} precedence',
      'trusted pre-request JavaScript with run-local, collection and environment variables',
      'response tests/assertions plus captured script console output',
      'request history with resolved execution metadata, test results/logs, collection/folder identity and raw-template replay',
      'Postman Collection v2.1 and environment import into the canonical workspace with explicit compatibility warnings',
      'browser-local IndexedDB persistence with configurable workspace keys',
    ],
  },
];

const integrations = [
  ['Browser / Node', 'React + standalone renderer', 'Express · Fastify · NestJS · Hono'],
  ['.NET', 'ASP.NET Core endpoint routing', 'ASP.NET Core 8+'],
  ['JVM', 'framework-neutral host + Jakarta transport', 'Spring Boot · JAX-RS · Quarkus · Micronaut · Guice/Governator · Ktor'],
  ['Python', 'neutral host + ASGI / WSGI transports', 'FastAPI · Starlette · Flask · Django'],
  ['PHP', 'framework-neutral PHP host', 'Laravel · Symfony'],
  ['Ruby', 'host + Rack transport', 'Rack · Rails'],
  ['Go', 'standard net/http handler', 'net/http · Gin · Chi · Echo v5 · Fiber v3'],
  ['Rust', 'native transport crates', 'Axum · Actix Web'],
  ['Elixir', 'Plug', 'Plug · Phoenix'],
  ['CLI / static', 'JSON or YAML document', 'local serve/watch · self-contained static export'],
];

const constraints = [
  'OpenAPI Try It itself uses supplied OAuth/OpenID tokens; interactive OAuth grant acquisition lives in the API Client workspace and requires browser-compatible redirect/CORS behavior.',
  'OAuth client secrets entered in the browser are not confidential. Token acquisition/refresh is explicit, and expires_in is informational rather than an automatic refresh scheduler.',
  'deepObject is first-class for flat object properties; nested deep-object expansion is not recursive.',
  'multipart requests use FormData, but binary file picking is not yet a first-class renderer control.',
  'patternProperties / JSON Schema conditionals, webhooks, callbacks and XML metadata are retained or partially modeled but are not complete first-class interactive surfaces.',
  'Postman multipart/file fields cannot recreate browser File objects; they import as reviewable text with compatibility warnings, and unsupported Postman sandbox/auth behavior is never silently treated as equivalent.',
  'API Client scripts are trusted local JavaScript, not a security sandbox. Persisted workspace secrets are stored as entered in the browser origin.',
  'template expansion is one pass; request chaining (flex.sendRequest), cookie scripting APIs and external package imports remain future scripting layers.',
  'Swagger/OpenAPI 2.0 is not accepted; integrations should generate OpenAPI 3.x.',
];

export function FlexDocFeatureSurface() {
  return (
    <section className='border-y border-border bg-card/35 px-4 py-16 sm:py-24'>
      <div className='container mx-auto max-w-6xl'>
        <div className='max-w-3xl'>
          <div className='text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300'>2.8 published surface</div>
          <h2 className='mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl'>One request model, from reference docs to a local API workspace.</h2>
          <p className='mt-4 text-base leading-7 text-foreground/62'>
            FlexDoc 2.8 carries the complete 2.4–2.7 workspace work into one coordinated release and adds Postman import: nested collections, layered variables, hierarchical auth, OAuth grants, scripts, persisted tests/history, canonical Try It handoff and compatibility-aware migration all use the same request model.
          </p>
        </div>

        <div className='mobile-snap-row mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3'>
          {coverage.map(({ title, icon: Icon, items }) => (
            <article key={title} className='w-[82vw] max-w-[320px] shrink-0 snap-start rounded-2xl border border-border bg-background/70 p-5 sm:p-6 md:w-auto md:max-w-none md:shrink'>
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
            <div className='text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-300'>Framework coverage</div>
            <h3 className='mt-3 text-2xl font-semibold tracking-tight'>Native framework boundaries, not renderer forks.</h3>
            <p className='mt-3 text-sm leading-6 text-foreground/62'>FlexDoc keeps each ecosystem&apos;s own OpenAPI generator and HTTP primitives. Thin hosts serve the same packaged renderer contract, so adding a framework does not mean rebuilding navigation, schemas, Try It or the API Client.</p>
          </div>
          <div className='mt-6 overflow-hidden rounded-2xl border border-border bg-background/70'>
            <div className='hidden grid-cols-[0.65fr_1.15fr_1.6fr] gap-3 border-b border-border bg-card px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-foreground/45 sm:grid'>
              <span>Runtime</span><span>Native boundary</span><span>2.8 coverage</span>
            </div>
            {integrations.map(([runtime, boundary, frameworks]) => (
              <div key={runtime} className='grid grid-cols-1 gap-1 border-b border-border/70 px-4 py-4 text-sm last:border-b-0 sm:grid-cols-[0.65fr_1.15fr_1.6fr] sm:gap-3'>
                <strong>{runtime}</strong><span className='text-foreground/60'>{boundary}</span><span className='text-xs leading-5 text-foreground/70'>{frameworks}</span>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-10 rounded-2xl border border-amber-500/25 bg-amber-500/5 p-6'>
          <div className='flex items-start gap-3'>
            <AlertTriangle className='mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-300' />
            <div>
              <h3 className='font-semibold'>Deliberate boundaries</h3>
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
