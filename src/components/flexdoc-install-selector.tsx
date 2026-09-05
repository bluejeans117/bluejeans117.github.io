'use client';

import { useMemo, useRef, useState } from 'react';
import {
  Check,
  ChevronDown,
  Copy,
  Cog,
  ExternalLink,
  Hexagon,
  Package,
  Search,
  TerminalSquare,
} from 'lucide-react';

type InstallTarget = {
  id: string;
  runtime: string;
  framework: string;
  packageName: string;
  version: string;
  registry: string;
  registryHref: string;
  installLabel: string;
  install: string;
  codeLanguage: string;
  usage: string;
  note?: string;
  exampleHref: string;
};

const targets: InstallTarget[] = [
  {
    id: 'react', runtime: 'JavaScript / TypeScript', framework: 'React',
    packageName: '@prauga/flexdoc-client', version: '2.3.0', registry: 'npm',
    registryHref: 'https://www.npmjs.com/package/@prauga/flexdoc-client',
    installLabel: 'Install the client', install: 'npm install @prauga/flexdoc-client@2.3.0', codeLanguage: 'tsx',
    usage: `import { FlexDoc } from '@prauga/flexdoc-client';\nimport '@prauga/flexdoc-client/styles.css';\n\nexport function Docs({ spec }) {\n  return <FlexDoc spec={spec} options={{ tryIt: { enabled: true } }} />;\n}`,
    note: 'FlexDoc 2.3 ships FlexDoc, the low-level ApiClient and the persistent ApiClientWorkspace, including nested folders, collection variables and hierarchical auth.',
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/main/examples/basic-usage',
  },
  {
    id: 'api-client', runtime: 'JavaScript / TypeScript', framework: 'Standalone API Client',
    packageName: '@prauga/flexdoc-client', version: '2.3.0', registry: 'npm',
    registryHref: 'https://www.npmjs.com/package/@prauga/flexdoc-client',
    installLabel: 'Install the client', install: 'npm install @prauga/flexdoc-client@2.3.0', codeLanguage: 'tsx',
    usage: `import { ApiClient } from '@prauga/flexdoc-client';
import '@prauga/flexdoc-client/styles.css';

export function RequestPanel() {
  return <ApiClient initialRequest={{ method: 'GET', url: 'https://api.example.com/pets' }} />;
}`,
    note: 'ApiClient is the standalone HTTP editor/executor. It does not require an OpenAPI document, collections or workspace persistence.',
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/js/v2.3.0/packages/client',
  },
  {
    id: 'api-client-workspace', runtime: 'JavaScript / TypeScript', framework: 'API Client Workspace',
    packageName: '@prauga/flexdoc-client', version: '2.3.0', registry: 'npm',
    registryHref: 'https://www.npmjs.com/package/@prauga/flexdoc-client',
    installLabel: 'Install the client', install: 'npm install @prauga/flexdoc-client@2.3.0', codeLanguage: 'tsx',
    usage: `import { ApiClientWorkspace } from '@prauga/flexdoc-client';
import '@prauga/flexdoc-client/styles.css';

export function RequestWorkspace() {
  return <ApiClientWorkspace persistenceKey='my-api' initialRequest={{ method: 'GET', url: '{{baseUrl}}/pets' }} />;
}`,
    note: 'ApiClientWorkspace wraps the same canonical editor with collections, nested folders, variables, inherited auth/OAuth, scripts, tests, history and optional IndexedDB persistence.',
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/js/v2.3.0/examples/api-client',
  },
  {
    id: 'express', runtime: 'JavaScript / TypeScript', framework: 'Express',
    packageName: '@prauga/flexdoc-backend', version: '2.3.0', registry: 'npm',
    registryHref: 'https://www.npmjs.com/package/@prauga/flexdoc-backend',
    installLabel: 'Install the Node adapter', install: 'npm install @prauga/flexdoc-backend@2.3.0', codeLanguage: 'js',
    usage: `import { setupExpressFlexDoc } from '@prauga/flexdoc-backend';\n\nsetupExpressFlexDoc(app, '/docs', {\n  specUrl: '/openapi.json',\n  options: { title: 'My API' },\n});`,
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/main/examples/javascript-express',
  },
  {
    id: 'fastify', runtime: 'JavaScript / TypeScript', framework: 'Fastify',
    packageName: '@prauga/flexdoc-backend', version: '2.3.0', registry: 'npm',
    registryHref: 'https://www.npmjs.com/package/@prauga/flexdoc-backend',
    installLabel: 'Install the Node adapter', install: 'npm install @prauga/flexdoc-backend@2.3.0', codeLanguage: 'js',
    usage: `import { setupFastifyFlexDoc } from '@prauga/flexdoc-backend';\n\nsetupFastifyFlexDoc(app, '/docs', {\n  spec,\n  options: { title: 'My API' },\n});`,
    note: 'If you already use @fastify/swagger, setupFastifySwaggerFlexDoc can consume its generated document directly.',
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/main/examples/javascript-fastify',
  },
  {
    id: 'nestjs', runtime: 'JavaScript / TypeScript', framework: 'NestJS',
    packageName: '@prauga/flexdoc-backend', version: '2.3.0', registry: 'npm',
    registryHref: 'https://www.npmjs.com/package/@prauga/flexdoc-backend',
    installLabel: 'Install the Node adapter', install: 'npm install @prauga/flexdoc-backend@2.3.0', codeLanguage: 'ts',
    usage: `import { DocumentBuilder } from '@nestjs/swagger';\nimport { setupNestFlexDoc } from '@prauga/flexdoc-backend';\n\nconst openApi = new DocumentBuilder().setTitle('My API').setVersion('1.0').build();\nsetupNestFlexDoc(app, '/docs', openApi, { options: { title: 'My API' } });`,
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/main/examples/nestjs',
  },
  {
    id: 'hono', runtime: 'JavaScript / TypeScript', framework: 'Hono',
    packageName: '@prauga/flexdoc-backend', version: '2.3.0', registry: 'npm',
    registryHref: 'https://www.npmjs.com/package/@prauga/flexdoc-backend',
    installLabel: 'Install the Node adapter', install: 'npm install @prauga/flexdoc-backend@2.3.0', codeLanguage: 'ts',
    usage: `import { Hono } from 'hono';
import { setupHonoFlexDoc } from '@prauga/flexdoc-backend';

const app = new Hono();
setupHonoFlexDoc(app, '/docs', {
  specUrl: '/openapi.json',
  options: { title: 'My API' },
});`,
    note: 'The Hono helper is dependency-free inside the backend package; Hono remains an application dependency, not a FlexDoc runtime dependency.',
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/main/examples/javascript-hono',
  },
  {
    id: 'cli', runtime: 'JavaScript / TypeScript', framework: 'CLI / static export',
    packageName: '@prauga/flexdoc-cli', version: '0.3.0', registry: 'npm',
    registryHref: 'https://www.npmjs.com/package/@prauga/flexdoc-cli',
    installLabel: 'Install the CLI', install: 'npm install --save-dev @prauga/flexdoc-cli@0.3.0', codeLanguage: 'bash',
    usage: `# Local docs with live reload\nnpx @prauga/flexdoc-cli serve openapi.yaml --watch\n\n# Self-contained static output\nnpx @prauga/flexdoc-cli build openapi.yaml --out ./docs`,
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/main/tools/flexdoc-cli',
  },
  {
    id: 'aspnet', runtime: '.NET', framework: 'ASP.NET Core',
    packageName: 'Prauga.FlexDoc.AspNetCore', version: '0.2.0', registry: 'NuGet',
    registryHref: 'https://www.nuget.org/packages/Prauga.FlexDoc.AspNetCore',
    installLabel: 'Install the NuGet package', install: 'dotnet add package Prauga.FlexDoc.AspNetCore --version 0.2.0', codeLanguage: 'csharp',
    usage: `using Prauga.FlexDoc.AspNetCore;\n\napp.MapFlexDoc(options =>\n{\n    options.Path = "/docs";\n    options.SpecUrl = "/openapi.json";\n    options.Title = "My API";\n});`,
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/main/examples/dotnet-aspnetcore',
  },
  {
    id: 'spring', runtime: 'JVM', framework: 'Spring Boot',
    packageName: 'com.prauga.flexdoc:flexdoc-spring-boot-starter', version: '0.5.0', registry: 'Maven Central',
    registryHref: 'https://central.sonatype.com/artifact/com.prauga.flexdoc/flexdoc-spring-boot-starter',
    installLabel: 'Add the Maven dependency',
    install: `<dependency>\n  <groupId>com.prauga.flexdoc</groupId>\n  <artifactId>flexdoc-spring-boot-starter</artifactId>\n  <version>0.5.0</version>\n</dependency>`,
    codeLanguage: 'yaml',
    usage: `flexdoc:\n  path: /docs\n  spec-url: /v3/api-docs\n  title: My API\n  try-it-enabled: true`,
    note: 'With springdoc at /v3/api-docs, adding the starter is enough; the renderer and assets are served locally.',
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/main/examples/java-spring',
  },
  {
    id: 'jaxrs', runtime: 'JVM', framework: 'Jakarta REST / JAX-RS',
    packageName: 'com.prauga.flexdoc:flexdoc-jaxrs', version: '0.5.0', registry: 'Maven Central',
    registryHref: 'https://central.sonatype.com/artifact/com.prauga.flexdoc/flexdoc-jaxrs',
    installLabel: 'Add the Maven dependency',
    install: `<dependency>\n  <groupId>com.prauga.flexdoc</groupId>\n  <artifactId>flexdoc-jaxrs</artifactId>\n  <version>0.5.0</version>\n</dependency>`,
    codeLanguage: 'java',
    usage: `FlexDocHost host = new FlexDocHost(\n    FlexDocConfig.builder()\n        .path("/docs")\n        .specUrl("/openapi.json")\n        .title("My API")\n        .build());\n\n// Inject the host into FlexDocJaxRsResource (rooted at /docs).`,
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/main/adapters/java-jaxrs',
  },
  {
    id: 'quarkus', runtime: 'JVM', framework: 'Quarkus',
    packageName: 'com.prauga.flexdoc:flexdoc-jaxrs', version: '0.5.0', registry: 'Maven Central',
    registryHref: 'https://central.sonatype.com/artifact/com.prauga.flexdoc/flexdoc-jaxrs',
    installLabel: 'Add the Maven dependency',
    install: `<dependency>\n  <groupId>com.prauga.flexdoc</groupId>\n  <artifactId>flexdoc-jaxrs</artifactId>\n  <version>0.5.0</version>\n</dependency>`,
    codeLanguage: 'java',
    usage: `@Produces\n@Singleton\nFlexDocHost flexDocHost() {\n  return new FlexDocHost(FlexDocConfig.builder()\n      .path("/docs").specUrl("/openapi.json").title("My API").build());\n}\n\n// Delegate your @Path("/docs") resource to FlexDocJaxRsResource.`,
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/main/examples/java-quarkus',
  },
  {
    id: 'micronaut', runtime: 'JVM', framework: 'Micronaut',
    packageName: 'com.prauga.flexdoc:flexdoc-jvm', version: '0.5.0', registry: 'Maven Central',
    registryHref: 'https://central.sonatype.com/artifact/com.prauga.flexdoc/flexdoc-jvm',
    installLabel: 'Add the Maven dependency',
    install: `<dependency>\n  <groupId>com.prauga.flexdoc</groupId>\n  <artifactId>flexdoc-jvm</artifactId>\n  <version>0.5.0</version>\n</dependency>`,
    codeLanguage: 'java',
    usage: `@Factory\nclass FlexDocFactory {\n  @Singleton\n  FlexDocHost flexDocHost() {\n    return new FlexDocHost(FlexDocConfig.builder()\n        .path("/docs").specUrl("/openapi.json").title("My API").build());\n  }\n}\n\n// Map docs + renderer asset routes to the neutral host responses.`,
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/main/examples/java-micronaut',
  },
  {
    id: 'guice', runtime: 'JVM', framework: 'Guice / Governator',
    packageName: 'com.prauga.flexdoc:flexdoc-jvm', version: '0.5.0', registry: 'Maven Central',
    registryHref: 'https://central.sonatype.com/artifact/com.prauga.flexdoc/flexdoc-jvm',
    installLabel: 'Add the Maven dependency',
    install: `<dependency>\n  <groupId>com.prauga.flexdoc</groupId>\n  <artifactId>flexdoc-jvm</artifactId>\n  <version>0.5.0</version>\n</dependency>`,
    codeLanguage: 'java',
    usage: `bind(FlexDocHost.class).toInstance(new FlexDocHost(\n    FlexDocConfig.builder()\n        .path("/docs")\n        .specUrl("/openapi.json")\n        .title("My API")\n        .build()));\n\n// Translate FlexDocHttpResponse through your existing HTTP layer.`,
    note: 'Governator is Guice lifecycle/DI, so it uses the same framework-neutral host rather than a separate renderer package.',
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/main/examples/java-guice',
  },
  {
    id: 'ktor', runtime: 'JVM', framework: 'Kotlin Ktor',
    packageName: 'com.prauga.flexdoc:flexdoc-jvm', version: '0.5.0', registry: 'Maven Central',
    registryHref: 'https://central.sonatype.com/artifact/com.prauga.flexdoc/flexdoc-jvm',
    installLabel: 'Add the JVM dependency',
    install: `implementation("com.prauga.flexdoc:flexdoc-jvm:0.5.0")`,
    codeLanguage: 'kotlin',
    usage: `val host = FlexDocHost(FlexDocConfig.builder()\n    .path("/docs").specUrl("/openapi.json").title("My API").build())\n\nrouting {\n    get("/docs") { call.respondFlexDoc(host.documentation()) }\n    get("/docs/__flexdoc/renderer.js") { call.respondFlexDoc(host.rendererJavaScript()) }\n    get("/docs/__flexdoc/renderer.css") { call.respondFlexDoc(host.rendererCss()) }\n}`,
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/main/examples/kotlin-ktor',
  },
  {
    id: 'fastapi', runtime: 'Python', framework: 'FastAPI / Starlette / ASGI',
    packageName: 'prauga-flexdoc', version: '0.4.0', registry: 'PyPI',
    registryHref: 'https://pypi.org/project/prauga-flexdoc/',
    installLabel: 'Install the Python adapter', install: 'pip install prauga-flexdoc==0.4.0', codeLanguage: 'python',
    usage: `from fastapi import FastAPI\nfrom prauga_flexdoc import setup_fastapi_flexdoc\n\napp = FastAPI(docs_url=None, redoc_url=None)\nsetup_fastapi_flexdoc(app, '/docs', title='My API')`,
    note: 'Generic ASGI applications can mount FlexDocASGI(FlexDocConfig(...)) directly.',
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/main/examples/python-fastapi',
  },
  {
    id: 'flask', runtime: 'Python', framework: 'Flask / WSGI',
    packageName: 'prauga-flexdoc', version: '0.4.0', registry: 'PyPI',
    registryHref: 'https://pypi.org/project/prauga-flexdoc/',
    installLabel: 'Install the Python adapter', install: 'pip install prauga-flexdoc==0.4.0', codeLanguage: 'python',
    usage: `from flask import Flask\nfrom prauga_flexdoc import setup_flask_flexdoc\n\napp = Flask(__name__)\nsetup_flask_flexdoc(app, '/docs', spec_url='/openapi.json', title='My API')`,
    note: 'Other WSGI frameworks can host FlexDocWSGI(FlexDocConfig(...)) directly.',
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/main/examples/python-flask',
  },
  {
    id: 'django', runtime: 'Python', framework: 'Django',
    packageName: 'prauga-flexdoc', version: '0.4.0', registry: 'PyPI',
    registryHref: 'https://pypi.org/project/prauga-flexdoc/',
    installLabel: 'Install the Python adapter', install: 'pip install prauga-flexdoc==0.4.0', codeLanguage: 'python',
    usage: `from django.urls import path\nfrom prauga_flexdoc import django_urlpatterns\n\nurlpatterns = [\n    # your API/OpenAPI routes\n    *django_urlpatterns('/docs', spec_url='/openapi.json', title='My API'),\n]`,
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/main/examples/python-django',
  },
  {
    id: 'laravel', runtime: 'PHP', framework: 'Laravel',
    packageName: 'prauga/flexdoc', version: '0.2.0', registry: 'Packagist',
    registryHref: 'https://packagist.org/packages/prauga/flexdoc',
    installLabel: 'Install with Composer', install: 'composer require prauga/flexdoc:^0.2.0', codeLanguage: 'php',
    usage: `use Prauga\\FlexDoc\\FlexDocConfig;\nuse Prauga\\FlexDoc\\FlexDocHost;\nuse Prauga\\FlexDoc\\Laravel\\LaravelFlexDoc;\n\n$host = new FlexDocHost(new FlexDocConfig(\n    path: '/docs', specUrl: '/openapi.json', title: 'My API'\n));\nLaravelFlexDoc::register($router, $host);`,
    note: 'Laravel package auto-discovery can also register the routes from flexdoc.path/spec_url/title configuration.',
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/main/examples/php-laravel',
  },
  {
    id: 'symfony', runtime: 'PHP', framework: 'Symfony',
    packageName: 'prauga/flexdoc', version: '0.2.0', registry: 'Packagist',
    registryHref: 'https://packagist.org/packages/prauga/flexdoc',
    installLabel: 'Install with Composer', install: 'composer require prauga/flexdoc:^0.2.0', codeLanguage: 'php',
    usage: `use Prauga\\FlexDoc\\FlexDocConfig;\nuse Prauga\\FlexDoc\\FlexDocHost;\n\n$host = new FlexDocHost(new FlexDocConfig(\n    path: '/docs', specUrl: '/openapi.json', title: 'My API'\n));\n\n// Register the host as a service and route docs + renderer assets\n// through Prauga\\FlexDoc\\Symfony\\FlexDocController.`,
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/main/examples/php-symfony',
  },
  {
    id: 'rack', runtime: 'Ruby', framework: 'Rack',
    packageName: 'prauga-flexdoc', version: '0.2.0', registry: 'RubyGems',
    registryHref: 'https://rubygems.org/gems/prauga-flexdoc',
    installLabel: 'Add the gem', install: `gem "prauga-flexdoc", "~> 0.2.0"`, codeLanguage: 'ruby',
    usage: `require "prauga/flexdoc"\n\nhost = Prauga::FlexDoc::Host.new(\n  Prauga::FlexDoc::Config.new(path: "/docs", spec_url: "/openapi.json", title: "My API")\n)\nrun Prauga::FlexDoc::RackApp.new(host)`,
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/main/examples/ruby-rack',
  },
  {
    id: 'rails', runtime: 'Ruby', framework: 'Rails',
    packageName: 'prauga-flexdoc', version: '0.2.0', registry: 'RubyGems',
    registryHref: 'https://rubygems.org/gems/prauga-flexdoc',
    installLabel: 'Add the gem', install: `gem "prauga-flexdoc", "~> 0.2.0"`, codeLanguage: 'ruby',
    usage: `host = Prauga::FlexDoc::Host.new(\n  Prauga::FlexDoc::Config.new(path: "/docs", spec_url: "/openapi.json", title: "My API")\n)\n\n# config/routes.rb\nPrauga::FlexDoc::Rails.mount(self, host: host, at: "/docs")`,
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/main/examples/ruby-rails',
  },
  {
    id: 'go-http', runtime: 'Go', framework: 'net/http',
    packageName: 'github.com/prauga/flexdoc/adapters/go', version: '0.3.0', registry: 'Go module',
    registryHref: 'https://pkg.go.dev/github.com/prauga/flexdoc/adapters/go',
    installLabel: 'Install the Go module', install: 'go get github.com/prauga/flexdoc/adapters/go@v0.3.0', codeLanguage: 'go',
    usage: `import flexdoc "github.com/prauga/flexdoc/adapters/go"\n\ndocs := flexdoc.Handler(flexdoc.Config{\n    Path: "/docs", SpecURL: "/openapi.json", Title: "My API", TryItEnabled: true,\n})\nhttp.Handle("/docs", docs)\nhttp.Handle("/docs/", docs)`,
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/main/examples/go-net-http',
  },
  {
    id: 'gin', runtime: 'Go', framework: 'Gin',
    packageName: 'github.com/prauga/flexdoc/adapters/go', version: '0.3.0', registry: 'Go module',
    registryHref: 'https://pkg.go.dev/github.com/prauga/flexdoc/adapters/go',
    installLabel: 'Install the Go module', install: 'go get github.com/prauga/flexdoc/adapters/go@v0.3.0', codeLanguage: 'go',
    usage: `docs := flexdoc.Handler(flexdoc.Config{Path: "/docs", SpecURL: "/openapi.json", Title: "My API"})\nr.GET("/docs", gin.WrapH(docs))\nr.Any("/docs/*path", gin.WrapH(docs))`,
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/main/examples/go-gin',
  },
  {
    id: 'chi', runtime: 'Go', framework: 'Chi',
    packageName: 'github.com/prauga/flexdoc/adapters/go', version: '0.3.0', registry: 'Go module',
    registryHref: 'https://pkg.go.dev/github.com/prauga/flexdoc/adapters/go',
    installLabel: 'Install the Go module', install: 'go get github.com/prauga/flexdoc/adapters/go@v0.3.0', codeLanguage: 'go',
    usage: `docs := flexdoc.Handler(flexdoc.Config{Path: "/docs", SpecURL: "/openapi.json", Title: "My API"})\nr.Handle("/docs", docs)\nr.Handle("/docs/*", docs)`,
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/main/examples/go-chi',
  },
  {
    id: 'echo', runtime: 'Go', framework: 'Echo v5',
    packageName: 'github.com/prauga/flexdoc/adapters/go', version: '0.3.0', registry: 'Go module',
    registryHref: 'https://pkg.go.dev/github.com/prauga/flexdoc/adapters/go',
    installLabel: 'Install the Go module', install: 'go get github.com/prauga/flexdoc/adapters/go@v0.3.0', codeLanguage: 'go',
    usage: `docs := echo.WrapHandler(flexdoc.Handler(flexdoc.Config{\n    Path: "/docs", SpecURL: "/openapi.json", Title: "My API",\n}))\ne.Any("/docs", docs)\ne.Any("/docs/*", docs)`,
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/main/examples/go-echo',
  },
  {
    id: 'fiber', runtime: 'Go', framework: 'Fiber v3',
    packageName: 'github.com/prauga/flexdoc/adapters/go', version: '0.3.0', registry: 'Go module',
    registryHref: 'https://pkg.go.dev/github.com/prauga/flexdoc/adapters/go',
    installLabel: 'Install the Go module', install: 'go get github.com/prauga/flexdoc/adapters/go@v0.3.0', codeLanguage: 'go',
    usage: `docs := flexdoc.Handler(flexdoc.Config{Path: "/docs", SpecURL: "/openapi.json", Title: "My API"})\n// Fiber v3 directly accepts standard net/http handlers.\napp.Get("/docs", docs)\napp.Get("/docs/*", docs)`,
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/main/examples/go-fiber',
  },
  {
    id: 'axum', runtime: 'Rust', framework: 'Axum',
    packageName: 'prauga-flexdoc-axum', version: '0.3.0', registry: 'crates.io',
    registryHref: 'https://crates.io/crates/prauga-flexdoc-axum',
    installLabel: 'Install the crate', install: 'cargo add prauga-flexdoc-axum@0.3.0', codeLanguage: 'rust',
    usage: `let docs = prauga_flexdoc_axum::router(prauga_flexdoc_axum::Config {\n    path: "/docs".into(),\n    spec_url: "/openapi.json".into(),\n    ..Default::default()\n});\n\nlet app = Router::new().merge(docs);`,
    note: 'For utoipa, router_with_openapi accepts the generated OpenAPI document directly.',
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/main/examples/rust-axum',
  },
  {
    id: 'actix', runtime: 'Rust', framework: 'Actix Web',
    packageName: 'prauga-flexdoc-actix', version: '0.2.0', registry: 'crates.io',
    registryHref: 'https://crates.io/crates/prauga-flexdoc-actix',
    installLabel: 'Install the crate', install: 'cargo add prauga-flexdoc-actix@0.2.0', codeLanguage: 'rust',
    usage: `use prauga_flexdoc_actix::{scope, Config};\n\nApp::new()\n    .route("/openapi.json", web::get().to(openapi))\n    .service(scope(Config {\n        title: "My API".into(),\n        ..Default::default()\n    }))`,
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/main/examples/rust-actix',
  },
  {
    id: 'plug', runtime: 'Elixir', framework: 'Plug',
    packageName: 'prauga_flexdoc', version: '0.2.0', registry: 'Hex',
    registryHref: 'https://hex.pm/packages/prauga_flexdoc',
    installLabel: 'Add the Mix dependency', install: `{:prauga_flexdoc, "~> 0.2.0"}`, codeLanguage: 'elixir',
    usage: `plug PraugaFlexDoc.Plug,\n  path: "/docs",\n  spec_url: "/openapi.json",\n  title: "My API"`,
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/main/adapters/elixir',
  },
  {
    id: 'phoenix', runtime: 'Elixir', framework: 'Phoenix',
    packageName: 'prauga_flexdoc', version: '0.2.0', registry: 'Hex',
    registryHref: 'https://hex.pm/packages/prauga_flexdoc',
    installLabel: 'Add the Mix dependency', install: `{:prauga_flexdoc, "~> 0.2.0"}`, codeLanguage: 'elixir',
    usage: `forward "/docs", PraugaFlexDoc.Plug,\n  path: "/docs",\n  spec_url: "/openapi.json",\n  title: "My API"`,
    note: 'Phoenix forwards to the same Plug; there is no Phoenix-specific renderer implementation.',
    exampleHref: 'https://github.com/Prauga/flexdoc/tree/main/examples/elixir-phoenix',
  },
];

const runtimes = [...new Set(targets.map((target) => target.runtime))];

function RegistryMark({ registry, compact = false }: { registry: string; compact?: boolean }) {
  const box = compact ? 'h-7 w-7 rounded-lg' : 'h-9 w-9 rounded-xl';
  const common = `${box} inline-flex shrink-0 items-center justify-center border border-border bg-card text-foreground shadow-sm`;
  if (registry === 'npm') {
    return <span className={common} aria-label='npm'><svg viewBox='0 0 24 24' className={compact ? 'h-4 w-4' : 'h-5 w-5'} fill='currentColor' aria-hidden='true'><path d='M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z'/></svg></span>;
  }
  if (registry === 'NuGet') {
    return <span className={common} aria-label='NuGet'><svg viewBox='0 0 24 24' className={compact ? 'h-4 w-4' : 'h-5 w-5'} fill='currentColor' aria-hidden='true'><path d='M1.998.342a1.997 1.997 0 1 0 0 3.995 1.997 1.997 0 0 0 0-3.995zm9.18 4.34a6.156 6.156 0 0 0-6.153 6.155v6.667c0 3.4 2.756 6.154 6.154 6.154h6.667c3.4 0 6.154-2.755 6.154-6.154v-6.667a6.154 6.154 0 0 0-6.154-6.155zm-1.477 2.8a2.496 2.496 0 1 1 0 4.993 2.496 2.496 0 0 1 0-4.993zm7.968 6.16a3.996 3.996 0 1 1-.002 7.992 3.996 3.996 0 0 1 .002-7.992z'/></svg></span>;
  }
  if (registry === 'RubyGems') {
    return <span className={common} aria-label='RubyGems'><svg viewBox='0 0 24 24' className={compact ? 'h-4 w-4' : 'h-5 w-5'} fill='currentColor' aria-hidden='true'><path d='M7.81 7.9l-2.97 2.95 7.19 7.18 2.96-2.95 4.22-4.23-2.96-2.96v-.01H7.8zM12 0L1.53 6v12L12 24l10.47-6V6L12 0zm8.47 16.85L12 21.73l-8.47-4.88V7.12L12 2.24l8.47 4.88v9.73z'/></svg></span>;
  }
  if (registry === 'Maven Central') return <span className={`${common} font-serif text-base font-black`} aria-label='Maven Central'>M</span>;
  if (registry === 'PyPI') return <span className={`${common} font-mono text-[10px] font-black`} aria-label='PyPI'>Py</span>;
  if (registry === 'Go module') return <span className={`${common} font-mono text-[10px] font-black`} aria-label='Go module'>Go</span>;
  if (registry === 'crates.io') return <span className={common} aria-label='crates.io'><Cog className={compact ? 'h-4 w-4' : 'h-5 w-5'} /></span>;
  if (registry === 'Hex') return <span className={common} aria-label='Hex'><Hexagon className={compact ? 'h-4 w-4' : 'h-5 w-5'} /></span>;
  return <span className={common} aria-label={registry}><Package className={compact ? 'h-4 w-4' : 'h-5 w-5'} /></span>;
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type='button'
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1400);
      }}
      className='inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white'
      aria-label={`Copy ${label}`}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function CodeCard({ title, language, value }: { title: string; language: string; value: string }) {
  return (
    <div className='min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-inner'>
      <div className='flex items-start justify-between gap-3 border-b border-white/10 px-3 py-2.5 sm:items-center sm:px-4'>
        <div>
          <div className='text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400'>{title}</div>
          <div className='mt-0.5 text-[10px] text-slate-600'>{language}</div>
        </div>
        <CopyButton value={value} label={title} />
      </div>
      <pre className='max-h-[300px] overflow-auto p-3 text-[11px] leading-5 text-slate-200 sm:max-h-[340px] sm:p-4 sm:text-[12px] sm:leading-6'><code>{value}</code></pre>
    </div>
  );
}

export function FlexDocInstallSelector() {
  const [selectedId, setSelectedId] = useState('react');
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const selected = targets.find((target) => target.id === selectedId) || targets[0];

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return targets;
    return targets.filter((target) =>
      `${target.runtime} ${target.framework} ${target.packageName}`.toLowerCase().includes(needle)
    );
  }, [query]);

  const choose = (id: string) => {
    setSelectedId(id);
    setOpen(false);
    setQuery('');
  };

  return (
    <div className='mt-8 w-full min-w-0 max-w-full rounded-2xl border border-border bg-card/70 p-3 shadow-xl shadow-black/5 sm:mt-10 sm:rounded-3xl sm:p-6'>
      <div className='grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[0.82fr_1.18fr]'>
        <div className='min-w-0'>
          <div className='text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-300'>Choose your stack</div>
          <h3 className='mt-2 break-words text-2xl font-semibold tracking-tight'>Install one adapter. Keep your framework.</h3>
          <p className='mt-3 text-sm leading-6 text-foreground/60'>
            FlexDoc 2.3 uses one renderer contract across independently versioned packages. Pick the framework you already run and this panel shows the package, exact version and smallest useful integration path.
          </p>

          <div className='relative mt-6'>
            <button
              type='button'
              onClick={() => {
                setOpen((current) => !current);
                window.setTimeout(() => searchRef.current?.focus(), 0);
              }}
              className='flex w-full min-w-0 max-w-full items-center justify-between gap-4 rounded-2xl border border-border bg-background px-4 py-3.5 text-left transition hover:border-blue-500/35'
              aria-haspopup='listbox'
              aria-expanded={open}
            >
              <div className='flex min-w-0 items-center gap-3'>
                <RegistryMark registry={selected.registry} />
                <div className='min-w-0'>
                  <div className='text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/42'>{selected.runtime}</div>
                <div className='mt-1 truncate font-semibold'>{selected.framework}</div>
                </div>
              </div>
              <ChevronDown className={`h-5 w-5 shrink-0 text-foreground/45 transition ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
              <div className='absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-2xl border border-border bg-background shadow-2xl'>
                <div className='border-b border-border p-3'>
                  <div className='flex items-center gap-2 rounded-xl border border-border bg-card px-3'>
                    <Search size={15} className='text-foreground/40' />
                    <input
                      ref={searchRef}
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder='Search React, API Client, Hono, Spring…'
                      className='w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-foreground/35'
                    />
                  </div>
                </div>
                <div className='max-h-[min(52dvh,390px)] overflow-y-auto overscroll-contain p-2' role='listbox' aria-label='FlexDoc framework'>
                  {runtimes.map((runtime) => {
                    const options = filtered.filter((target) => target.runtime === runtime);
                    if (!options.length) return null;
                    return (
                      <div key={runtime} className='py-1'>
                        <div className='px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground/35'>{runtime}</div>
                        {options.map((target) => (
                          <button
                            key={target.id}
                            type='button'
                            role='option'
                            aria-selected={target.id === selectedId}
                            onClick={() => choose(target.id)}
                            className='flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition hover:bg-blue-500/10'
                          >
                            <div className='flex min-w-0 items-center gap-3'>
                              <RegistryMark registry={target.registry} compact />
                              <div className='min-w-0'>
                                <div className='font-medium'>{target.framework}</div>
                              <div className='mt-0.5 truncate font-mono text-[10px] text-foreground/42'>{target.packageName}</div>
                              </div>
                            </div>
                            {target.id === selectedId && <Check className='h-4 w-4 shrink-0 text-blue-500' />}
                          </button>
                        ))}
                      </div>
                    );
                  })}
                  {!filtered.length && <div className='px-4 py-8 text-center text-sm text-foreground/45'>No matching framework.</div>}
                </div>
              </div>
            )}
          </div>

          <div className='mt-4 rounded-2xl border border-border bg-background/65 p-4'>
            <div className='flex items-start justify-between gap-4'>
              <div className='min-w-0'>
                <div className='flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-foreground/42'><RegistryMark registry={selected.registry} compact /> Package</div>
                <div className='mt-2 break-all font-mono text-sm font-semibold'>{selected.packageName}</div>
              </div>
              <span className='shrink-0 rounded-full border border-blue-500/20 bg-blue-500/8 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300'>v{selected.version}</span>
            </div>
            <div className='mt-4 flex flex-wrap items-center gap-3 text-xs text-foreground/52'>
              <a href={selected.registryHref} target='_blank' rel='noopener noreferrer' className='inline-flex items-center gap-1.5 font-semibold text-blue-600 hover:underline dark:text-blue-300'>
                <RegistryMark registry={selected.registry} compact /> {selected.registry} <ExternalLink size={12} />
              </a>
              <span>•</span>
              <a href={selected.exampleHref} target='_blank' rel='noopener noreferrer' className='inline-flex items-center gap-1.5 font-semibold hover:text-blue-600 hover:underline dark:hover:text-blue-300'>
                runnable example <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {selected.note && (
            <div className='mt-4 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 text-sm leading-6 text-foreground/62'>{selected.note}</div>
          )}
        </div>

        <div className='min-w-0 space-y-4'>
          <CodeCard title={`1. ${selected.installLabel}`} language='install' value={selected.install} />
          <CodeCard title='2. Mount FlexDoc' language={selected.codeLanguage} value={selected.usage} />
          <div className='flex items-start gap-3 rounded-2xl border border-border bg-background/60 p-4 text-sm leading-6 text-foreground/58'>
            <TerminalSquare className='mt-0.5 h-4 w-4 shrink-0 text-blue-500' />
            <span>Open <code className='rounded bg-card px-1.5 py-0.5'>/docs</code>. Renderer assets are packaged locally with the selected integration, so no FlexDoc account or runtime CDN is required.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
