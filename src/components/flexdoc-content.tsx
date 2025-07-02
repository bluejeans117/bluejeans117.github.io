'use client';

import Link from 'next/link';
import { CodeExample, CodePopup } from '@/components/code-popup';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import {
  Sun,
  Moon,
  Tag,
  Shield,
  FileCode,
  Palette,
  ClipboardPlus,
  Settings,
  FileText,
  Code,
} from 'lucide-react';
import Image from 'next/image';

export function FlexDocContent() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(
    undefined
  );
  const [isCodePopupOpen, setIsCodePopupOpen] = useState(false);
  const [codePopupTitle, setCodePopupTitle] = useState('');
  const [codeExamples, setCodeExamples] = useState<
    Array<{ title: string; language: string; code: string; filename?: string }>
  >([]);

  // After mounting, we can access the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setCurrentTheme(theme === 'system' ? systemTheme : theme);
    }
  }, [theme, systemTheme, mounted]);

  // Code examples for different frameworks
  const reactExamples = [
    {
      title: 'React Component',
      language: 'typescript',
      code: `// Install the client package
npm install @flexdoc/client

// In your React component
import { FlexDoc } from '@flexdoc/client';
import { openApiSpec } from './your-spec';

function App() {
  return (
    <FlexDoc 
      spec={openApiSpec}
      theme='light'
      customStyles={{ fontFamily: 'Inter' }}
    />
  );
}`,
    },
    {
      title: 'Next.js Integration',
      language: 'typescript',
      code: `// pages/api-docs.tsx
import { FlexDoc } from '@flexdoc/client';
import { openApiSpec } from '../lib/api-spec';

export default function ApiDocs() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">API Documentation</h1>
      <FlexDoc 
        spec={openApiSpec}
        theme="system"
        options={{
          hideHostname: true,
          showSidebar: true,
          defaultEndpointExpanded: false
        }}
      />
    </div>
  );
}`,
      filename: 'pages/api-docs.tsx',
    },
  ];

  const nestjsExamples = [
    {
      title: 'Basic Setup',
      language: 'typescript',
      code: `// Install the backend package
npm install @bluejeans/flexdoc-backend

// app.module.ts
import { Module } from '@nestjs/common';
import { FlexDocModule } from '@bluejeans/flexdoc-backend';

@Module({
  imports: [
    // Your other modules...
    FlexDocModule.forRoot({
      path: 'api-docs',
      options: {
        title: 'My API Documentation',
        hideHostname: true,
        pathInMiddlePanel: true,
      },
    }),
  ],
})
export class AppModule {}`,
      filename: 'app.module.ts',
    },
    {
      title: 'With Authentication',
      language: 'typescript',
      code: `// app.module.ts with authentication
import { Module } from '@nestjs/common';
import { FlexDocModule } from '@bluejeans/flexdoc-backend';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // Your other modules...
    FlexDocModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        path: 'api-docs',
        options: {
          title: 'My API Documentation',
          hideHostname: true,
          // Enable authentication
          auth: {
            type: 'bearer',
            secretKey: configService.get('API_DOCS_SECRET_KEY'),
          },
          // Custom theme
          theme: {
            colors: {
              primary: configService.get('BRAND_COLOR'),
            },
          },
        },
      }),
    }),
  ],
})
export class AppModule {}`,
      filename: 'app.module.ts',
    },
  ];

  const expressExamples = [
    {
      title: 'Basic Setup',
      language: 'javascript',
      code: `// Install the backend package
npm install @bluejeans/flexdoc-backend

// app.js
import express from 'express';
import { setupFlexDoc } from '@bluejeans/flexdoc-backend';

const app = express();

// Your other routes and middleware...

// Set up FlexDoc
setupFlexDoc(app, {
  path: 'api-docs',
  options: {
    title: 'My API Documentation',
    hideHostname: true,
    pathInMiddlePanel: true,
  },
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});`,
      filename: 'app.js',
    },
    {
      title: 'With OpenAPI Spec',
      language: 'javascript',
      code: `// app.js with custom OpenAPI spec
import express from 'express';
import { setupFlexDoc } from '@bluejeans/flexdoc-backend';
import swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';

const app = express();

// Generate OpenAPI spec from JSDoc comments
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation with FlexDoc',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const openapiSpec = swaggerJsdoc(options);

// Save spec to file (optional)
fs.writeFileSync('./openapi-spec.json', JSON.stringify(openapiSpec, null, 2));

// Set up FlexDoc with the generated spec
setupFlexDoc(app, {
  path: 'api-docs',
  options: {
    title: 'My API Documentation',
    spec: openapiSpec,
    // Custom footer
    footer: {
      copyright: '© 2025 My Company',
      links: [
        { text: 'Terms', url: '/terms' },
        { text: 'Privacy', url: '/privacy' },
      ],
    },
  },
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/api-docs');
});`,
      filename: 'app.js',
    },
  ];

  const configExamples = [
    {
      title: 'Theme Configuration',
      language: 'typescript',
      code: `// flexdoc.config.js
module.exports = {
  // Basic metadata
  title: 'My API Documentation',
  description: 'Documentation for my awesome API',
  
  // Theme configuration
  theme: {
    colors: {
      primary: {
        main: '#3b82f6',
        light: '#eff6ff',
        dark: '#2563eb'
      },
      secondary: {
        main: '#10b981',
        light: '#d1fae5',
        dark: '#059669'
      },
      background: {
        light: '#ffffff',
        dark: '#111827'
      },
      text: {
        light: '#1f2937',
        dark: '#f9fafb'
      }
    },
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: '16px',
      headings: {
        fontFamily: 'Inter, system-ui, sans-serif',
        fontWeight: '600'
      },
      code: {
        fontFamily: 'Fira Code, monospace'
      }
    },
    spacing: {
      unit: 4, // 4px base unit
      container: '1200px'
    },
    borderRadius: '0.375rem',
    shadows: {
      small: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      large: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    }
  }
};`,
      filename: 'flexdoc.config.js',
    },
    {
      title: 'Full Configuration',
      language: 'typescript',
      code: `// Full configuration options
const config = {
  // Basic metadata
  title: 'My API Documentation',
  description: 'Documentation for my awesome API',
  version: '1.0.0',
  
  // OpenAPI spec source
  spec: require('./openapi.json'), // or path: './openapi.json'
  
  // UI Options
  defaultTheme: 'system', // 'light', 'dark', or 'system'
  hideHostname: true,
  pathInMiddlePanel: true,
  defaultModelsExpandDepth: 1,
  defaultModelRendering: 'model',
  displayOperationId: false,
  displayRequestDuration: true,
  filter: true,
  showExtensions: false,
  showCommonExtensions: false,
  
  // Branding
  favicon: '/favicon.ico',
  logo: '/logo.png',
  
  // Custom CSS/JS
  customCss: '.swagger-ui .topbar { display: none }',
  customJs: 'console.log("Custom JS loaded");',
  
  // Authentication
  auth: {
    type: 'basic', // or 'bearer'
    secretKey: process.env.FLEXDOC_SECRET_KEY,
    realm: 'API Documentation'
  },
  
  // Footer customization
  footer: {
    copyright: '© 2025 My Company',
    links: [
      {
        text: 'Terms',
        url: '/terms',
        icon: 'file-text' // Lucide icon name
      },
      {
        text: 'Privacy',
        url: '/privacy'
      },
      {
        text: 'GitHub',
        url: 'https://github.com/my-org/my-repo',
        icon: 'github'
      }
    ],
    showOpenAPISpec: true,
    poweredBy: true
  },
  
  // Advanced options
  presets: [
    require('@flexdoc/preset-api-platform')
  ],
  plugins: [
    require('@flexdoc/plugin-analytics')
  ]
};`,
      filename: 'flexdoc.config.js',
    },
  ];

  // Function to open code popup with specific examples
  const openCodePopup = (title: string, examples: CodeExample[]) => {
    setCodePopupTitle(title);
    setCodeExamples(examples);
    setIsCodePopupOpen(true);
  };

  return (
    <div className='container mx-auto px-4 py-16'>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-12'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='bg-blue-500 p-2 rounded-md'>
              <FileText className='text-white' size={24} />
            </div>
            <h1 className='text-3xl font-bold'>FlexDoc</h1>
          </div>

          <p className='text-gray-700 dark:text-gray-300 mb-4'>
            FlexDoc is a beautiful, highly customizable OpenAPI documentation
            generator designed to transform complex API specifications into
            intuitive, interactive documentation. Unlike traditional API
            documentation tools that produce static and often confusing
            interfaces, FlexDoc creates a developer-friendly experience that
            makes API exploration and integration straightforward.
          </p>

          <p className='text-gray-700 dark:text-gray-300 mb-8'>
            Built with modern web technologies and designed with both API
            consumers and providers in mind, FlexDoc bridges the gap between
            technical accuracy and usability. Whether you&apos;re building a
            public API, internal microservices, or documenting legacy systems,
            FlexDoc adapts to your specific documentation needs with minimal
            configuration.
          </p>

          {mounted && (
            <>
              <Image
                src={
                  currentTheme === 'dark'
                    ? '/img/flexdoc/flexdoc-dark.png'
                    : '/img/flexdoc/flexdoc-light.png'
                }
                alt='FlexDoc UI'
                className='w-full h-auto rounded-lg shadow-md mb-4'
                width={1000}
                height={600}
              />
              <div className='flex items-center justify-end gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8'>
                <span className='flex items-center gap-2'>
                  {currentTheme === 'dark' ? (
                    <>
                      <Moon className='h-5 w-5' /> Currently viewing dark theme
                    </>
                  ) : (
                    <>
                      <Sun className='h-5 w-5' /> Try switching to dark mode
                    </>
                  )}
                </span>
              </div>
            </>
          )}

          <h2 className='text-2xl font-semibold mb-6 mt-10'>
            Key Features & Benefits
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm'>
              <div className='flex items-center gap-2 mb-3 text-blue-500'>
                <Tag size={20} />
                <h3 className='font-semibold'>Beautiful UI</h3>
              </div>
              <p className='text-gray-600 dark:text-gray-400 mb-2'>
                FlexDoc transforms technical OpenAPI specifications into
                visually appealing documentation that developers actually want
                to use. The modern interface incorporates thoughtful design
                principles that enhance readability and navigation.
              </p>
              <p className='text-gray-600 dark:text-gray-400'>
                With smooth animations and micro-interactions, the documentation
                feels responsive and engaging, encouraging exploration and
                reducing the learning curve for new API users.
              </p>
            </div>

            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm'>
              <div className='flex items-center gap-2 mb-3 text-blue-500'>
                <Shield size={20} />
                <h3 className='font-semibold'>Authentication & Security</h3>
              </div>
              <p className='text-gray-600 dark:text-gray-400 mb-2'>
                For teams working with sensitive APIs, FlexDoc provides robust
                authentication options to protect your documentation. Choose
                between Basic or Bearer token authentication to ensure only
                authorized users can access your API details.
              </p>
              <p className='text-gray-600 dark:text-gray-400'>
                This is particularly valuable for internal APIs, partner-facing
                documentation, or any scenario where you need to restrict access
                to your API specifications.
              </p>
            </div>

            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm'>
              <div className='flex items-center gap-2 mb-3 text-blue-500'>
                <FileCode size={20} />
                <h3 className='font-semibold'>Interactive Exploration</h3>
              </div>
              <p className='text-gray-600 dark:text-gray-400 mb-2'>
                FlexDoc goes beyond static documentation by providing a fully
                interactive API explorer. Developers can test endpoints directly
                within the documentation interface, seeing real request and
                response examples.
              </p>
              <p className='text-gray-600 dark:text-gray-400'>
                This hands-on approach significantly accelerates the API
                learning process and reduces integration time, as developers can
                validate their understanding immediately without switching to
                separate tools.
              </p>
            </div>

            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm'>
              <div className='flex items-center gap-2 mb-3 text-blue-500'>
                <Palette size={20} />
                <h3 className='font-semibold'>Complete Customization</h3>
              </div>
              <p className='text-gray-600 dark:text-gray-400 mb-2'>
                Your API documentation should reflect your brand identity.
                FlexDoc offers extensive theming capabilities that go beyond
                simple color changes, allowing you to customize typography,
                spacing, component styles, and more.
              </p>
              <p className='text-gray-600 dark:text-gray-400'>
                The theming system is designed to be intuitive yet powerful,
                enabling both simple brand alignment and sophisticated custom
                designs without requiring extensive CSS knowledge.
              </p>
            </div>

            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm'>
              <div className='flex items-center gap-2 mb-3 text-blue-500'>
                <ClipboardPlus size={20} />
                <h3 className='font-semibold'>Framework Integration</h3>
              </div>
              <p className='text-gray-600 dark:text-gray-400 mb-2'>
                FlexDoc seamlessly integrates with popular frameworks like
                NestJS and Express with minimal configuration. The integration
                process is designed to be straightforward, requiring just a few
                lines of code in most cases.
              </p>
              <p className='text-gray-600 dark:text-gray-400'>
                For teams using OpenAPI/Swagger specifications, FlexDoc works
                out of the box, automatically parsing your existing specs and
                transforming them into beautiful, interactive documentation.
              </p>
            </div>

            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm'>
              <div className='flex items-center gap-2 mb-3 text-blue-500'>
                <Settings size={20} />
                <h3 className='font-semibold'>Advanced Configuration</h3>
              </div>
              <p className='text-gray-600 dark:text-gray-400 mb-2'>
                For teams with specific documentation requirements, FlexDoc
                provides granular configuration options. Control everything from
                the display of endpoints and parameters to authentication flows
                and response examples.
              </p>
              <p className='text-gray-600 dark:text-gray-400'>
                The configuration system is designed to be intuitive and
                well-documented, making it easy to tailor the documentation
                experience to your exact specifications without diving into
                source code.
              </p>
            </div>
          </div>
        </div>

        <div className='mb-10'>
          <h2 className='text-2xl font-semibold mb-4'>Get FlexDoc Now</h2>
          <p className='text-gray-700 dark:text-gray-300 mb-6'>
            Access the source code on GitHub or install directly via npm to
            start building beautiful API documentation.
          </p>
        </div>

        <div className='flex flex-wrap gap-6 mb-12'>
          <Link
            href='https://github.com/bluejeans117/flexdoc'
            target='_blank'
            className='inline-flex items-center gap-3 px-6 py-3 text-lg font-medium rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors shadow-md'
          >
            <i className='fa-brands fa-github text-xl'></i>
            View on GitHub
          </Link>
          <Link
            href='https://www.npmjs.com/package/@bluejeans/flexdoc-backend'
            target='_blank'
            className='inline-flex items-center gap-3 px-6 py-3 text-lg font-medium rounded-lg bg-[#CB3837] text-white hover:bg-[#B02E2E] transition-colors shadow-md'
          >
            <i className='fa-brands fa-npm text-xl'></i>
            Install from npm
          </Link>
        </div>

        <div className='mb-12'>
          <h2 className='text-2xl font-semibold mb-6'>
            Integration Approaches
          </h2>

          <p className='text-gray-700 dark:text-gray-300 mb-6'>
            FlexDoc was designed with flexibility in mind, offering multiple
            integration paths depending on your project&apos;s architecture and
            requirements. Below are the three most common approaches to
            implementing FlexDoc in your application ecosystem.
          </p>

          <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-8'>
            <h3 className='text-xl font-medium mb-3 text-blue-500'>
              React Component Integration
            </h3>
            <div className='mb-4'>
              <p className='text-gray-600 dark:text-gray-400 mb-3'>
                For frontend-focused teams or those building documentation
                portals, FlexDoc offers a standalone React component that can be
                embedded in any React application. This approach gives you
                complete control over where and how the documentation appears in
                your UI.
              </p>
              <p className='text-gray-600 dark:text-gray-400 mb-3'>
                The React component accepts your OpenAPI specification directly
                and provides comprehensive theming options. This is ideal for
                scenarios where you want to:
              </p>
              <ul className='list-disc pl-5 mb-4 text-gray-600 dark:text-gray-400'>
                <li className='mb-2'>
                  Embed API documentation within an existing developer portal
                </li>
                <li className='mb-2'>
                  Create a custom documentation experience that matches your
                  product&apos;s UI
                </li>
                <li className='mb-2'>
                  Dynamically generate documentation based on user permissions
                  or context
                </li>
              </ul>
              <div className='flex justify-between items-center mt-4'>
                <p className='text-gray-600 dark:text-gray-400'>
                  Implementation requires just a few lines of code after
                  installing the{' '}
                  <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded'>
                    @flexdoc/client
                  </code>{' '}
                  package.
                </p>
                <button
                  onClick={() =>
                    openCodePopup('React Integration Examples', reactExamples)
                  }
                  className='flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors'
                >
                  <Code size={16} /> View Code
                </button>
              </div>
            </div>
          </div>

          <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-8'>
            <h3 className='text-xl font-medium mb-3 text-blue-500'>
              NestJS Framework Integration
            </h3>
            <div className='mb-4'>
              <p className='text-gray-600 dark:text-gray-400 mb-3'>
                For teams using NestJS, FlexDoc offers a dedicated module that
                integrates seamlessly with the NestJS ecosystem. This approach
                automatically extracts your API specification from your NestJS
                decorators and controllers, ensuring your documentation is
                always in sync with your actual API implementation.
              </p>
              <p className='text-gray-600 dark:text-gray-400 mb-3'>
                The NestJS integration supports all FlexDoc features and can be
                configured through the module options. Key benefits include:
              </p>
              <ul className='list-disc pl-5 mb-4 text-gray-600 dark:text-gray-400'>
                <li className='mb-2'>
                  Automatic synchronization between code and documentation
                </li>
                <li className='mb-2'>
                  Support for NestJS-specific features like guards,
                  interceptors, and pipes
                </li>
                <li className='mb-2'>
                  Easy configuration through the familiar NestJS module system
                </li>
                <li className='mb-2'>
                  Authentication options to protect your API documentation
                </li>
              </ul>
              <div className='flex justify-between items-center mt-4'>
                <p className='text-gray-600 dark:text-gray-400'>
                  Setup is straightforward through the{' '}
                  <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded'>
                    FlexDocModule.forRoot()
                  </code>{' '}
                  method in your app module.
                </p>
                <button
                  onClick={() =>
                    openCodePopup('NestJS Integration Examples', nestjsExamples)
                  }
                  className='flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors'
                >
                  <Code size={16} /> View Code
                </button>
              </div>
            </div>
          </div>

          <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm'>
            <h3 className='text-xl font-medium mb-3 text-blue-500'>
              Express Framework Integration
            </h3>
            <div>
              <p className='text-gray-600 dark:text-gray-400 mb-3'>
                For Express applications, FlexDoc provides a simple middleware
                that can be added to your Express app with minimal
                configuration. This approach is perfect for teams that want to
                add beautiful API documentation to existing Express applications
                without major changes to their codebase.
              </p>
              <p className='text-gray-600 dark:text-gray-400 mb-3'>
                The Express integration works with any OpenAPI/Swagger
                specification, whether generated from code annotations or
                written manually. Key advantages include:
              </p>
              <ul className='list-disc pl-5 mb-4 text-gray-600 dark:text-gray-400'>
                <li className='mb-2'>
                  Lightweight middleware that doesn&apos;t impact application
                  performance
                </li>
                <li className='mb-2'>
                  Compatible with existing Express middleware and routing
                </li>
                <li className='mb-2'>
                  Support for authentication to protect sensitive API
                  documentation
                </li>
                <li className='mb-2'>
                  Easy configuration through a simple options object
                </li>
              </ul>
              <div className='flex justify-between items-center mt-4'>
                <p className='text-gray-600 dark:text-gray-400'>
                  Implementation is as simple as calling{' '}
                  <code className='bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded'>
                    setupFlexDoc(app, options)
                  </code>{' '}
                  after your other middleware and routes.
                </p>
                <button
                  onClick={() =>
                    openCodePopup(
                      'Express Integration Examples',
                      expressExamples
                    )
                  }
                  className='flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors'
                >
                  <Code size={16} /> View Code
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='mb-12'>
          <div className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md'>
            <h2 className='text-2xl font-semibold mb-4'>Get Started Today</h2>
            <p className='mb-6'>
              FlexDoc is open source and available on npm. Start using it in
              your project with just a few lines of code.
            </p>

            {mounted && (
              <div>
                <Image
                  src={
                    currentTheme === 'dark'
                      ? '/img/flexdoc/flexdoc-get-dark.png'
                      : '/img/flexdoc/flexdoc-get-light.png'
                  }
                  alt='FlexDoc Get Started'
                  className='w-full h-auto rounded-lg'
                  width={1000}
                  height={600}
                />
              </div>
            )}
          </div>
        </div>

        <div className='mb-12'>
          <div className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md'>
            <h2 className='text-2xl font-semibold mb-4'>
              Configuration Philosophy
            </h2>

            <p className='text-gray-600 dark:text-gray-400 mb-6'>
              FlexDoc was built on the principle that API documentation should
              be both beautiful and functional without requiring extensive
              configuration. At the same time, we recognize that teams have
              unique branding and documentation requirements.
            </p>

            <h3 className='text-xl font-medium mb-3 text-blue-500'>
              Configuration Categories
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
              <div>
                <h4 className='font-medium mb-2'>Visual Customization</h4>
                <ul className='list-disc pl-5 text-gray-600 dark:text-gray-400'>
                  <li className='mb-2'>
                    <strong>Theming:</strong> Light, dark, or custom color
                    schemes
                  </li>
                  <li className='mb-2'>
                    <strong>Typography:</strong> Font families, sizes, and line
                    heights
                  </li>
                  <li className='mb-2'>
                    <strong>Layout:</strong> Sidebar width, content spacing, and
                    component positioning
                  </li>
                  <li className='mb-2'>
                    <strong>Branding:</strong> Custom logos, favicons, and brand
                    colors
                  </li>
                </ul>
              </div>

              <div>
                <h4 className='font-medium mb-2'>Functional Configuration</h4>
                <ul className='list-disc pl-5 text-gray-600 dark:text-gray-400'>
                  <li className='mb-2'>
                    <strong>Authentication:</strong> Basic or Bearer token
                    protection
                  </li>
                  <li className='mb-2'>
                    <strong>Display Options:</strong> Endpoint grouping, request
                    examples, and response formatting
                  </li>
                  <li className='mb-2'>
                    <strong>Behavior:</strong> Default expanded sections,
                    try-it-out functionality
                  </li>
                  <li className='mb-2'>
                    <strong>Extensions:</strong> Custom JavaScript for analytics
                    or enhanced functionality
                  </li>
                </ul>
              </div>
            </div>

            <h3 className='text-xl font-medium mb-3 text-blue-500'>
              Configuration Approaches
            </h3>

            <div className='mb-6'>
              <p className='text-gray-600 dark:text-gray-400 mb-4'>
                FlexDoc supports multiple configuration approaches to fit
                different team workflows:
              </p>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'>
                  <h4 className='font-medium mb-2'>1. Configuration Object</h4>
                  <p className='text-gray-600 dark:text-gray-400 text-sm'>
                    Pass a comprehensive options object when initializing
                    FlexDoc. This is ideal for applications where configuration
                    is determined at build/runtime.
                  </p>
                </div>

                <div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'>
                  <h4 className='font-medium mb-2'>2. Configuration File</h4>
                  <p className='text-gray-600 dark:text-gray-400 text-sm'>
                    Create a{' '}
                    <code className='bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded'>
                      flexdoc.config.js
                    </code>{' '}
                    file in your project root. This approach is perfect for
                    teams that prefer configuration as code.
                  </p>
                </div>

                <div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'>
                  <h4 className='font-medium mb-2'>3. Environment Variables</h4>
                  <p className='text-gray-600 dark:text-gray-400 text-sm'>
                    Configure core options through environment variables. Ideal
                    for deployment across different environments where
                    configuration might vary.
                  </p>
                </div>

                <div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'>
                  <h4 className='font-medium mb-2'>4. UI Configuration</h4>
                  <p className='text-gray-600 dark:text-gray-400 text-sm'>
                    Some options can be configured directly through the UI by
                    administrators, allowing for adjustments without
                    redeployment.
                  </p>
                </div>
              </div>
            </div>

            <div className='flex justify-between items-center mt-6'>
              <p className='text-gray-600 dark:text-gray-400 italic'>
                FlexDoc&apos;s configuration system is designed to be intuitive
                yet powerful, with sensible defaults that work well for most
                projects while offering granular control when needed.
              </p>
              <button
                onClick={() =>
                  openCodePopup('Configuration Examples', configExamples)
                }
                className='flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors'
              >
                <Code size={16} /> View Config Examples
              </button>
            </div>
          </div>
        </div>

        <div className='mb-12'>
          <div className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md'>
            {mounted && (
              <div>
                <Image
                  src={
                    currentTheme === 'dark'
                      ? '/img/flexdoc/flexdoc-get-code-dark.png'
                      : '/img/flexdoc/flexdoc-get-code-light.png'
                  }
                  alt='FlexDoc Code Example'
                  className='w-full h-auto rounded-lg'
                  width={1000}
                  height={600}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Code Popup */}
      {isCodePopupOpen && (
        <CodePopup
          isOpen={isCodePopupOpen}
          title={codePopupTitle}
          examples={codeExamples}
          onClose={() => setIsCodePopupOpen(false)}
        />
      )}
    </div>
  );
}

