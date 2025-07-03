// Define more specific types for OpenAPI spec components
interface OpenAPIInfo {
  title?: string;
  version?: string;
  description?: string;
  [key: string]: unknown;
}

interface OpenAPIPathItem {
  $ref?: string;
  summary?: string;
  description?: string;
  get?: unknown;
  put?: unknown;
  post?: unknown;
  delete?: unknown;
  options?: unknown;
  head?: unknown;
  patch?: unknown;
  trace?: unknown;
  [key: string]: unknown;
}

interface OpenAPIComponents {
  schemas?: Record<string, unknown>;
  responses?: Record<string, unknown>;
  parameters?: Record<string, unknown>;
  examples?: Record<string, unknown>;
  requestBodies?: Record<string, unknown>;
  headers?: Record<string, unknown>;
  securitySchemes?: Record<string, unknown>;
  links?: Record<string, unknown>;
  callbacks?: Record<string, unknown>;
  [key: string]: unknown;
}

declare module '@bluejeans/flexdoc-client' {
  export interface OpenAPISpec {
    openapi: string;
    info?: OpenAPIInfo;
    paths?: Record<string, OpenAPIPathItem>;
    components?: OpenAPIComponents;
    [key: string]: unknown;
  }

  export const sampleApis: OpenAPISpec;

  export interface ApiDocsDemoProps {
    /** OpenAPI specification object */
    spec?: OpenAPISpec;
    /** Theme preference */
    theme?: 'light' | 'dark';
    /** Additional styling options */
    options?: React.CSSProperties;
  }

  /**
   * Renders API documentation based on OpenAPI specification
   */
  export function ApiDocsDemo(props: ApiDocsDemoProps): JSX.Element;
}

