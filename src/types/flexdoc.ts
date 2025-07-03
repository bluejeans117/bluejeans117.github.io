export interface OpenAPISpec {
  openapi: string;
  info: {
    title: string;
    version: string;
    description?: string;
    contact?: {
      name?: string;
      email?: string;
      url?: string;
    };
    license?: {
      name: string;
      url?: string;
    };
  };
  servers?: Array<{
    url: string;
    description?: string;
  }>;
  paths: Record<string, PathItem>;
  components?: {
    schemas?: Record<string, Schema>;
    securitySchemes?: Record<string, SecurityScheme>;
  };
  tags?: Array<{
    name: string;
    description?: string;
  }>;
}

export interface PathItem {
  [method: string]: Operation;
}

export interface Operation {
  tags?: string[];
  summary?: string;
  description?: string;
  operationId?: string;
  parameters?: Parameter[];
  requestBody?: RequestBody;
  responses: Record<string, Response>;
  security?: Array<Record<string, string[]>>;
}

export interface Parameter {
  name: string;
  in: 'query' | 'header' | 'path' | 'cookie';
  description?: string;
  required?: boolean;
  schema: Schema;
}

export interface RequestBody {
  description?: string;
  required?: boolean;
  content: Record<string, MediaType>;
}

export interface Response {
  description: string;
  content?: Record<string, MediaType>;
}

export interface MediaType {
  schema?: Schema;
  example?: any;
  examples?: Record<string, Example>;
}

export interface Example {
  summary?: string;
  description?: string;
  value?: any;
}

export interface Schema {
  type?: string;
  format?: string;
  properties?: Record<string, Schema>;
  items?: Schema;
  required?: string[];
  enum?: any[];
  example?: any;
  $ref?: string;
  allOf?: Schema[];
  oneOf?: Schema[];
  anyOf?: Schema[];
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  description?: string;
}

export interface SecurityScheme {
  type: 'http' | 'apiKey' | 'oauth2' | 'openIdConnect';
  scheme?: string;
  bearerFormat?: string;
  name?: string;
  in?: 'query' | 'header' | 'cookie';
  flows?: any;
  openIdConnectUrl?: string;
}

export interface FlexDocTheme {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface FlexDocOptions {
  title?: string;
  hideHostname?: boolean;
  pathInMiddlePanel?: boolean;
  defaultModelsExpandDepth?: number;
  displayOperationId?: boolean;
  displayRequestDuration?: boolean;
  filter?: boolean;
  showExtensions?: boolean;
  showCommonExtensions?: boolean;
  tryItOutEnabled?: boolean;
  supportedSubmitMethods?: string[];
  validatorUrl?: string | null;
  docExpansion?: 'list' | 'full' | 'none';
  defaultModelRendering?: 'example' | 'model';
  showMutatedRequest?: boolean;
  sortTagsAlphabetically?: boolean;
  maxDisplayedTags?: number;
  operationsSorter?: 'alpha' | 'method' | ((a: any, b: any) => number);
  tagsSorter?: 'alpha' | ((a: any, b: any) => number);
  deepLinking?: boolean;
  displayRequestDuration?: boolean;
  defaultModelExpandDepth?: number;
  defaultModelsExpandDepth?: number;
  showExtensions?: boolean;
  showCommonExtensions?: boolean;
  useUnsafeMarkdown?: boolean;
}

export interface FlexDocProps {
  spec: OpenAPISpec;
  options?: FlexDocOptions;
  theme?: 'light' | 'dark' | 'auto';
  customTheme?: Partial<FlexDocTheme>;
  className?: string;
  style?: React.CSSProperties;
}
