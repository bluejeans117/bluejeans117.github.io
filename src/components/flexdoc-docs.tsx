import Link from 'next/link';

const toc = [
  ['getting-started', 'Getting started'],
  ['render-openapi', 'Render OpenAPI'],
  ['renderer-options', 'Renderer options'],
  ['try-it', 'Try It'],
  ['openapi-auth', 'OpenAPI authentication'],
  ['code-samples', 'Code samples'],
  ['standalone-client', 'Standalone API Client'],
  ['workspace', 'API Client Workspace'],
  ['collections', 'Collections & folders'],
  ['variables', 'Variables'],
  ['workspace-auth', 'Workspace auth & OAuth'],
  ['scripts-tests', 'Scripts & tests'],
  ['history', 'History'],
  ['postman-import', 'Postman import'],
  ['persistence', 'Persistence'],
  ['cli-static', 'CLI & static export'],
  ['frameworks', 'Framework adapters'],
  ['limitations', 'Current boundaries'],
] as const;

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className='mt-4 overflow-x-auto rounded-xl border border-border bg-zinc-950 px-4 py-4 text-[13px] leading-6 text-zinc-100'>
      <code>{children}</code>
    </pre>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return <div className='mt-5 rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-3 text-sm leading-6 text-foreground/70'>{children}</div>;
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className='scroll-mt-28 border-b border-border/70 py-10 first:pt-0 last:border-b-0'>
      <h2 className='text-2xl font-semibold tracking-[-0.025em]'>{title}</h2>
      <div className='mt-4 space-y-4 text-[15px] leading-7 text-foreground/68'>{children}</div>
    </section>
  );
}

export function FlexDocDocs() {
  return (
    <div className='container mx-auto max-w-7xl px-4 py-10 sm:py-14'>
      <div className='grid gap-10 lg:grid-cols-[230px_minmax(0,760px)] lg:justify-center xl:grid-cols-[250px_minmax(0,820px)]'>
        <aside className='lg:sticky lg:top-28 lg:h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto lg:pr-4'>
          <div className='text-xs font-semibold uppercase tracking-[0.16em] text-foreground/40'>FlexDoc 2.8</div>
          <div className='mt-2 text-sm font-semibold'>Documentation</div>
          <nav className='mt-5 grid grid-cols-2 gap-x-3 gap-y-1 sm:grid-cols-3 lg:grid-cols-1'>
            {toc.map(([id, label]) => (
              <a key={id} href={`#${id}`} className='rounded-md px-2 py-1.5 text-sm text-foreground/55 transition hover:bg-card hover:text-foreground'>
                {label}
              </a>
            ))}
          </nav>
        </aside>

        <main className='min-w-0'>
          <div className='border-b border-border pb-9'>
            <div className='text-sm font-medium text-blue-600 dark:text-blue-300'>FlexDoc 2.8 documentation</div>
            <h1 className='mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl'>Using FlexDoc</h1>
            <p className='mt-5 max-w-3xl text-base leading-7 text-foreground/62'>
              FlexDoc is a self-hosted OpenAPI 3.0/3.1 documentation renderer, Try It explorer and browser-local API workspace. This page covers the normal setup and the public 2.8 feature surface.
            </p>
            <div className='mt-5 flex flex-wrap gap-3 text-sm'>
              <Link href='/flexdoc/demo' className='font-semibold text-blue-600 hover:underline dark:text-blue-300'>Live demo →</Link>
              <Link href='/flexdoc/client' className='font-semibold text-blue-600 hover:underline dark:text-blue-300'>API Client →</Link>
              <a href='https://github.com/Prauga/flexdoc/tree/js/v2.8.0' target='_blank' rel='noopener noreferrer' className='font-semibold text-blue-600 hover:underline dark:text-blue-300'>2.8 source ↗</a>
            </div>
          </div>

          <Section id='getting-started' title='Getting started'>
            <p>For React applications, install the canonical client package and its stylesheet:</p>
            <CodeBlock>{`npm install @prauga/flexdoc-client@2.8.0`}</CodeBlock>
            <p>For backend frameworks, use the native adapter for your stack. The renderer assets are served locally by the adapter; a FlexDoc account or runtime CDN is not required.</p>
            <p><Link href='/flexdoc#install' className='font-semibold text-blue-600 hover:underline dark:text-blue-300'>See every framework install command →</Link></p>
          </Section>

          <Section id='render-openapi' title='Render an OpenAPI document'>
            <p>Pass an OpenAPI 3.0 or 3.1 document to <code>FlexDoc</code>. JSON objects can be imported directly; backend adapters can also point the renderer at a served specification URL.</p>
            <CodeBlock>{`import { FlexDoc } from '@prauga/flexdoc-client';
import '@prauga/flexdoc-client/styles.css';
import spec from './openapi.json';

export function ApiDocs() {
  return <FlexDoc spec={spec} />;
}`}</CodeBlock>
            <p>FlexDoc resolves local JSON Pointer references as well as external, nested and circular references. OpenAPI 2.0 / Swagger 2.0 is not accepted; convert it to OpenAPI 3.x first.</p>
          </Section>

          <Section id='renderer-options' title='Renderer options'>
            <p>Use the <code>options</code> prop to configure the reference UI, initial expansion state, Try It, code samples, themes and other renderer behavior.</p>
            <CodeBlock>{`<FlexDoc
  spec={spec}
  theme='dark'
  options={{
    title: 'Payments API',
    expand: 'none',
    pathInMiddlePanel: true,
    showRequestHeaders: true,
    tryIt: { enabled: true },
    codeSamples: {
      enabled: true,
      languages: ['curl', 'javascript', 'python', 'go', 'java'],
    },
  }}
/>`}</CodeBlock>
            <Note><code>expand: 'none'</code> starts endpoint sections collapsed. Viewer Settings can still override the host default for that browser.</Note>
          </Section>

          <Section id='try-it' title='Try It'>
            <p>Enable Try It to turn each OpenAPI operation into an executable request editor. Users can edit parameters, request bodies, authentication and the selected server before sending.</p>
            <CodeBlock>{`<FlexDoc
  spec={spec}
  options={{
    tryIt: {
      enabled: true,
      defaultServer: 'https://staging.api.example.com',
      credentials: 'same-origin',
      requestInterceptor: (request) => ({
        ...request,
        headers: {
          ...request.headers,
          'X-Docs-Client': 'flexdoc',
        },
      }),
    },
  }}
/>`}</CodeBlock>
            <p>Try It uses the same canonical request model as generated code samples and API Client handoff, including server variables and supported OpenAPI parameter serialization styles.</p>
          </Section>

          <Section id='openapi-auth' title='OpenAPI authentication'>
            <p>Define security schemes in the OpenAPI document as usual. FlexDoc supports Basic and Bearer HTTP authentication, API keys in headers/query/cookies, and OAuth 2.0/OpenID Connect access-token injection.</p>
            <CodeBlock>{`components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
    apiKeyAuth:
      type: apiKey
      in: header
      name: X-API-Key

security:
  - bearerAuth: []`}</CodeBlock>
            <p>OpenAPI security alternatives are respected, including OR alternatives and multi-scheme AND requirements. Interactive OAuth grant acquisition lives in the API Client workspace; OpenAPI Try It accepts supplied OAuth/OpenID tokens.</p>
          </Section>

          <Section id='code-samples' title='Request code samples'>
            <p>When code samples are enabled, FlexDoc derives them from the same request that Try It builds. The 2.8 renderer supports cURL, JavaScript, Python, Go and Java samples.</p>
            <CodeBlock>{`options={{
  codeSamples: {
    enabled: true,
    languages: ['curl', 'javascript', 'python', 'go', 'java'],
  },
}}`}</CodeBlock>
          </Section>

          <Section id='standalone-client' title='Standalone API Client'>
            <p>Use <code>ApiClient</code> when you want an embeddable HTTP request editor/executor without requiring an OpenAPI document or persisted workspace.</p>
            <CodeBlock>{`import { ApiClient } from '@prauga/flexdoc-client';
import '@prauga/flexdoc-client/styles.css';

export function RequestPanel() {
  return (
    <ApiClient
      initialRequest={{
        method: 'GET',
        url: 'https://api.example.com/pets',
      }}
      credentials='omit'
      onExecutionComplete={(result) => {
        console.log(result.status, result.responseTime);
      }}
    />
  );
}`}</CodeBlock>
            <p>The standalone component supports editable URL/query/headers/body/auth, request interceptors, variables, server choices, scripts, tests and response inspection. It does not create collections or persist state by itself.</p>
          </Section>

          <Section id='workspace' title='API Client Workspace'>
            <p><code>ApiClientWorkspace</code> wraps the same request editor with collections, folders, environments, history, auth inheritance, scripts/tests, Postman import and optional IndexedDB persistence.</p>
            <CodeBlock>{`import { ApiClientWorkspace } from '@prauga/flexdoc-client';
import '@prauga/flexdoc-client/styles.css';

export function Workspace() {
  return (
    <ApiClientWorkspace
      persistenceKey='payments-api'
      initialRequest={{
        method: 'GET',
        url: '{{baseUrl}}/payments',
        auth: { type: 'inherit' },
      }}
    />
  );
}`}</CodeBlock>
            <p>The workspace is standalone: it can be used as an API-development surface even when there is no OpenAPI document on the page.</p>
          </Section>

          <Section id='collections' title='Collections & folders'>
            <p>Create collections to group saved requests. Folders can be nested to arbitrary depth, and saved requests retain their collection/folder identity for history and replay.</p>
            <p>Use collection-level configuration for shared variables and auth, then override them on a folder or individual request only when necessary.</p>
          </Section>

          <Section id='variables' title='Variables'>
            <p>Use <code>{'{{variableName}}'}</code> placeholders in request URLs, query parameters, headers and bodies. The workspace supplies collection variables and the active environment to the normal request builder.</p>
            <CodeBlock>{`GET {{baseUrl}}/pets/{{petId}}

Authorization: Bearer {{token}}`}</CodeBlock>
            <p>At execution time, collection variables are combined with host-provided variables and the active environment. Environment values take precedence when the same key appears in more than one layer.</p>
            <Note>Template substitution is one pass. FlexDoc does not recursively expand templates inside values.</Note>
          </Section>

          <Section id='workspace-auth' title='Workspace authentication & OAuth'>
            <p>Collections, folders and requests can use <strong>Inherit auth</strong>, <strong>No auth</strong>, Bearer, Basic, API key or OAuth 2.0. The closest explicit child setting wins; otherwise the request inherits from its parent hierarchy.</p>
            <p>OAuth supports manual access tokens, Authorization Code with PKCE, Client Credentials, Password, Implicit and explicit refresh-token reuse. Browser OAuth flows still depend on the provider allowing the relevant redirect and CORS behavior.</p>
            <Note>OAuth client secrets entered in a browser are not confidential. FlexDoc treats browser-entered credentials as local workspace data, not as a secure secret store.</Note>
          </Section>

          <Section id='scripts-tests' title='Pre-request scripts & response tests'>
            <p>Requests can run trusted JavaScript before execution and tests after the response. The shared <code>flex.*</code> runtime can mutate request data, collection variables and environment variables, record test results and capture console output.</p>
            <CodeBlock>{`// Pre-request
flex.request.headers.set('X-Run-Id', String(Date.now()));
flex.collection.set('lastRequest', 'pets');

// Post-response tests
flex.test('status is 200', () =>
  flex.expect(flex.response.code).to.equal(200)
);

flex.environment.set(
  'lastPetId',
  String(flex.response.json().id)
);

console.log('tested', flex.response.code);`}</CodeBlock>
            <Note>Scripts are trusted local JavaScript, not a security sandbox. External package imports and a full Postman sandbox API are not provided.</Note>
          </Section>

          <Section id='history' title='Request history'>
            <p>The workspace keeps bounded request history with resolved execution metadata, response test results, captured script logs and originating collection/folder identity.</p>
            <p>Replaying an entry restores the editable raw request template rather than replacing it with the fully resolved execution URL. This keeps <code>{'{{variables}}'}</code> useful after replay.</p>
          </Section>

          <Section id='postman-import' title='Postman import'>
            <p>FlexDoc 2.8 imports Postman Collection v2.1 JSON and Postman environment JSON directly into the canonical workspace.</p>
            <ol className='list-decimal space-y-2 pl-5'>
              <li>Open the API Client Workspace.</li>
              <li>Choose <strong>Import Postman</strong>.</li>
              <li>Select a Collection v2.1 JSON file, an environment JSON file, or both.</li>
              <li>Review any compatibility warnings and import.</li>
            </ol>
            <p>Supported folders, requests, variables, common auth, request bodies and compatible scripts become normal FlexDoc workspace data immediately. There is no separate Postman request engine or persistence layer.</p>
            <Note>Unsupported auth/sandbox behavior is reported as a warning instead of being silently approximated. Browser <code>File</code> objects cannot be recreated from exported multipart file fields, so those fields require review.</Note>
          </Section>

          <Section id='persistence' title='Workspace persistence'>
            <p>By default, <code>ApiClientWorkspace</code> persists browser-local state in origin-scoped IndexedDB. Give each embedded workspace a stable key.</p>
            <CodeBlock>{`<ApiClientWorkspace persistenceKey='payments-api' />

// Disable persistence entirely:
<ApiClientWorkspace persistenceKey={false} />`}</CodeBlock>
            <p>Collections, folders, saved requests, variables, environments, auth values, scripts and history are stored as entered. FlexDoc does not encrypt persisted workspace values.</p>
          </Section>

          <Section id='cli-static' title='CLI & static export'>
            <p>Use the CLI to serve a local specification with live reload or generate a self-contained static documentation bundle.</p>
            <CodeBlock>{`npm install --save-dev @prauga/flexdoc-cli@0.4.0

# Serve locally
npx @prauga/flexdoc-cli serve openapi.yaml --watch

# Build static documentation
npx @prauga/flexdoc-cli build openapi.yaml --out ./docs`}</CodeBlock>
            <p>The generated renderer assets are local to the output; a runtime FlexDoc CDN is not required.</p>
          </Section>

          <Section id='frameworks' title='Framework adapters'>
            <p>Backend adapters expose the same renderer contract through native framework routing. They do not implement separate copies of Try It, schemas, API Client behavior or theming.</p>
            <CodeBlock>{`// Express
import { setupExpressFlexDoc } from '@prauga/flexdoc-backend';

setupExpressFlexDoc(app, '/docs', {
  specUrl: '/openapi.json',
  options: { title: 'My API', expand: 'none' },
});`}</CodeBlock>
            <p>2.8 packages are available for Express, Fastify, NestJS, Hono, ASP.NET Core, Spring Boot/JAX-RS and other JVM hosts, FastAPI/Starlette/Flask/Django, Laravel/Symfony, Rack/Rails, Go HTTP frameworks, Axum/Actix and Plug/Phoenix.</p>
            <p><Link href='/flexdoc#install' className='font-semibold text-blue-600 hover:underline dark:text-blue-300'>Open the framework install selector →</Link></p>
          </Section>

          <Section id='limitations' title='Current boundaries'>
            <ul className='list-disc space-y-2 pl-5'>
              <li>OpenAPI 3.0.x and 3.1.x are supported; Swagger/OpenAPI 2.0 is not.</li>
              <li>Nested <code>deepObject</code> expansion is not recursive.</li>
              <li>Binary file picking is not yet a first-class renderer control for multipart Try It requests.</li>
              <li>Webhooks, callbacks, XML metadata and advanced JSON Schema conditionals are not complete first-class interactive surfaces.</li>
              <li>API Client scripts are trusted local JavaScript rather than a sandbox.</li>
              <li>Persisted workspace secrets are stored as entered in the browser origin.</li>
              <li>Postman compatibility is intentionally explicit: unsupported source behavior produces warnings.</li>
            </ul>
            <p>For implementation details and the exact release source, see the <a href='https://github.com/Prauga/flexdoc/tree/js/v2.8.0' target='_blank' rel='noopener noreferrer' className='font-semibold text-blue-600 hover:underline dark:text-blue-300'>FlexDoc 2.8 tag ↗</a>.</p>
          </Section>
        </main>
      </div>
    </div>
  );
}
