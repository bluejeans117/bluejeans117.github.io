'use client';

import Link from 'next/link';
import { CodeBlock } from '@/components/code-block';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import {
  Sun,
  Moon,
  Tag,
  Shield,
  FileCode,
  Palette,
  LayoutDashboard,
  ClipboardPlus,
  Settings,
  AlignLeft,
  FileText,
} from 'lucide-react';

export function FlexDocContent() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(
    undefined
  );

  // After mounting, we can access the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setCurrentTheme(theme === 'system' ? systemTheme : theme);
    }
  }, [theme, systemTheme, mounted]);

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

          <p className='text-gray-700 dark:text-gray-300 mb-8'>
            FlexDoc is a beautiful, highly customizable OpenAPI documentation
            generator that can be easily integrated into backend applications.
            It provides a modern, interactive interface for API documentation
            with advanced features and customization options.
          </p>

          {mounted && (
            <>
              <img
                src={
                  currentTheme === 'dark'
                    ? '/img/flexdoc/flexdoc-dark.png'
                    : '/img/flexdoc/flexdoc-light.png'
                }
                alt='FlexDoc UI'
                className='w-full h-auto rounded-lg shadow-md mb-4'
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

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm'>
              <div className='flex items-center gap-2 mb-3 text-blue-500'>
                <Tag size={20} />
                <h3 className='font-semibold'>Beautiful UI</h3>
              </div>
              <p className='text-gray-600 dark:text-gray-400'>
                Modern, responsive design with smooth animations and
                micro-interactions for an exceptional user experience.
              </p>
            </div>

            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm'>
              <div className='flex items-center gap-2 mb-3 text-blue-500'>
                <Shield size={20} />
                <h3 className='font-semibold'>Authentication</h3>
              </div>
              <p className='text-gray-600 dark:text-gray-400'>
                Secure your documentation with Basic or Bearer token
                authentication to protect sensitive API information.
              </p>
            </div>

            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm'>
              <div className='flex items-center gap-2 mb-3 text-blue-500'>
                <FileCode size={20} />
                <h3 className='font-semibold'>Interactive</h3>
              </div>
              <p className='text-gray-600 dark:text-gray-400'>
                Live API explorer with request/response examples that lets users
                test endpoints directly from the documentation.
              </p>
            </div>

            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm'>
              <div className='flex items-center gap-2 mb-3 text-blue-500'>
                <Palette size={20} />
                <h3 className='font-semibold'>Customizable</h3>
              </div>
              <p className='text-gray-600 dark:text-gray-400'>
                Extensive theming and styling options to match your brand
                identity with custom colors, fonts, and layouts.
              </p>
            </div>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm'>
              <div className='flex items-center gap-2 mb-3 text-blue-500'>
                <LayoutDashboard size={20} />
                <h3 className='font-semibold'>Modern Design</h3>
              </div>
              <p className='text-gray-600 dark:text-gray-400'>
                Clean, responsive interface that works on all devices.
                Customizable themes to match your brand identity.
              </p>
            </div>

            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm'>
              <div className='flex items-center gap-2 mb-3 text-blue-500'>
                <ClipboardPlus size={20} />
                <h3 className='font-semibold'>Easy Integration</h3>
              </div>
              <p className='text-gray-600 dark:text-gray-400'>
                Simple setup for NestJS and Express applications. Works with
                OpenAPI/Swagger specifications out of the box.
              </p>
            </div>

            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm'>
              <div className='flex items-center gap-2 mb-3 text-blue-500'>
                <Settings size={20} />
                <h3 className='font-semibold'>Advanced Configuration</h3>
              </div>
              <p className='text-gray-600 dark:text-gray-400'>
                Tailor the documentation to your needs with custom templates,
                themes, and extensive configuration options.
              </p>
            </div>

            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm'>
              <div className='flex items-center gap-2 mb-3 text-blue-500'>
                <AlignLeft size={20} />
                <h3 className='font-semibold'>Developer-Friendly</h3>
              </div>
              <p className='text-gray-600 dark:text-gray-400'>
                Built with developers in mind. Easy to extend and modify to suit
                your project requirements and workflow.
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
          <h2 className='text-2xl font-semibold mb-4'>Integration Examples</h2>

          <div className='mb-8'>
            <h3 className='text-xl font-medium mb-3'>
              React Component (Standalone)
            </h3>
            <p className='mb-4'>
              Use FlexDoc as a standalone React component to display your
              OpenAPI specification with full customization options.
            </p>
            <CodeBlock
              code={`// Install the client package
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
}`}
              language='typescript'
            />
          </div>

          <div className='mb-8'>
            <h3 className='text-xl font-medium mb-3'>NestJS Integration</h3>
            <p className='mb-4'>
              FlexDoc seamlessly integrates with NestJS applications, providing
              beautiful API documentation with minimal setup.
            </p>
            <CodeBlock
              code={`// Install the backend package
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
        // Enable authentication (optional)
        auth: {
          type: 'basic', // or 'bearer'
          secretKey: process.env.FLEXDOC_SECRET_KEY || 'your-strong-secret-key',
        },
      },
    }),
  ],
})
export class AppModule {}`}
              language='typescript'
            />
          </div>

          <div>
            <h3 className='text-xl font-medium mb-3'>Express Integration</h3>
            <p className='mb-4'>
              FlexDoc can also be easily integrated with Express applications
              for quick and beautiful API documentation.
            </p>
            <CodeBlock
              code={`// Install the backend package
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
    // Enable authentication (optional)
    auth: {
      type: 'basic', // or 'bearer'
      secretKey: process.env.FLEXDOC_SECRET_KEY || 'your-strong-secret-key',
    },
  },
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});`}
              language='javascript'
              filename='app.js'
            />
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
                <img
                  src={
                    currentTheme === 'dark'
                      ? '/img/flexdoc/flexdoc-get-dark.png'
                      : '/img/flexdoc/flexdoc-get-light.png'
                  }
                  alt='FlexDoc Get Started'
                  className='w-full h-auto rounded-lg'
                />
              </div>
            )}
          </div>
        </div>

        <div className='mb-12'>
          <div className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md'>
            <h2 className='text-2xl font-semibold mb-4'>
              Configuration Options
            </h2>
            <p className='mb-6'>
              FlexDoc offers extensive configuration options to customize your
              API documentation to match your needs and brand identity.
            </p>
            <CodeBlock
              code={`interface FlexDocOptions {
  // Basic options
  title?: string;                      // Page title
  description?: string;                // Page description
  theme?: 'light' | 'dark' | ThemeOptions; // Color theme
  
  // Customization
  customCss?: string;                 // Custom CSS styles
  customJs?: string;                  // Custom JavaScript
  favicon?: string;                   // Custom favicon URL
  logo?: string;                      // Custom logo URL
  
  // Display options
  hideHostname?: boolean;             // Hide hostname in API endpoints
  pathInMiddlePanel?: boolean;        // Show path in middle panel
  
  // Authentication
  auth?: {
    type: 'basic' | 'bearer';
    secretKey: string;
  };
  
  // Advanced theming
  theme_?: {
    colors?: {
      primary?: string;               // Primary brand color
      secondary?: string;             // Secondary color
      accent?: string;                // Accent color
      background?: string;            // Background color
      // ... and more
    };
    typography?: {
      fontSize?: string;             // Base font size
      fontFamily?: string;           // Font family
      lineHeight?: string;           // Line height
    };
    spacing?: {
      unit?: number;                 // Base spacing unit
    };
  };
}`}
              language='typescript'
            />
          </div>
        </div>

        <div className='mb-12'>
          <div className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md'>
            {mounted && (
              <div>
                <img
                  src={
                    currentTheme === 'dark'
                      ? '/img/flexdoc/flexdoc-get-code-dark.png'
                      : '/img/flexdoc/flexdoc-get-code-light.png'
                  }
                  alt='FlexDoc Code Example'
                  className='w-full h-auto rounded-lg'
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

