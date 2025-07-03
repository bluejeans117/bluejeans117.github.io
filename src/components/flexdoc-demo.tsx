'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  ExternalLink,
  Code,
  Play,
  Palette,
  Settings,
} from 'lucide-react';
import { useState } from 'react';
import { FlexDoc } from '@/components/flexdoc/flexdoc-client';
import { sampleEcommerceSpec } from '@/data/sample-openapi-spec';

export function FlexDocDemo() {
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark' | 'auto'>(
    'dark'
  );
  const [showSource, setShowSource] = useState(false);

  const customTheme = {
    primary: '#3b82f6',
    secondary: '#10b981',
  };

  return (
    <div className='bg-slate-900 min-h-screen'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-7xl mx-auto'>
          {/* Header */}
          <div className='mb-8'>
            <Link
              href='/flexdoc'
              className='inline-flex items-center gap-2 text-sm text-blue-400 hover:underline mb-4'
            >
              <ArrowLeft size={16} />
              Back to FlexDoc Overview
            </Link>

            <div className='flex items-center gap-3 mb-4'>
              <div className='bg-green-500 p-2 rounded-md'>
                <Play className='text-white' size={24} />
              </div>
              <h1 className='text-3xl font-bold text-white'>
                FlexDoc Live Demo
              </h1>
            </div>

            <p className='text-gray-300 mb-6'>
              Experience FlexDoc in action with this interactive demonstration.
              This demo showcases how FlexDoc transforms OpenAPI specifications
              into beautiful, interactive API documentation.
            </p>
          </div>

          {/* Demo Controls */}
          <div className='bg-slate-800 rounded-lg shadow-sm border border-slate-700 p-6 mb-8'>
            <div className='flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between'>
              <div className='flex-1'>
                <h2 className='text-lg font-semibold mb-2 text-white'>
                  Demo API: Sample E-commerce API
                </h2>
                <p className='text-gray-400 text-sm'>
                  A comprehensive REST API for an e-commerce platform with
                  authentication, product management, and order processing
                  endpoints.
                </p>
              </div>

              <div className='flex flex-col sm:flex-row gap-3'>
                {/* Theme Selector */}
                <div className='flex items-center gap-2'>
                  <Palette size={16} className='text-gray-400' />
                  <select
                    value={selectedTheme}
                    onChange={(e) =>
                      setSelectedTheme(
                        e.target.value as 'light' | 'dark' | 'auto'
                      )
                    }
                    className='px-3 py-2 border border-slate-600 rounded-md text-sm bg-slate-700 text-white'
                  >
                    <option value='auto'>Auto Theme</option>
                    <option value='light'>Light Theme</option>
                    <option value='dark'>Dark Theme</option>
                  </select>
                </div>

                <button
                  onClick={() => setShowSource(!showSource)}
                  className='flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors'
                >
                  <Code size={16} />
                  {showSource ? 'Hide Source' : 'View Source'}
                </button>

                <button className='flex items-center gap-2 px-4 py-2 border border-slate-600 hover:bg-slate-700 text-white rounded-md transition-colors'>
                  <ExternalLink size={16} />
                  Open in New Tab
                </button>
              </div>
            </div>
          </div>

          {/* Source Code Display */}
          {showSource && (
            <div className='bg-slate-800 rounded-lg shadow-sm border border-slate-700 p-6 mb-8'>
              <h3 className='text-lg font-semibold mb-4 flex items-center gap-2 text-white'>
                <Code size={20} />
                FlexDoc Implementation
              </h3>
              <pre className='bg-slate-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-300'>
                <code>{`import { FlexDoc } from '@/components/flexdoc/flexdoc-client';
import { sampleEcommerceSpec } from '@/data/sample-openapi-spec';

export function MyApiDocs() {
  return (
    <FlexDoc 
      spec={sampleEcommerceSpec}
      theme="${selectedTheme}"
      options={{
        filter: true,
        hideHostname: false,
        pathInMiddlePanel: true,
        displayRequestDuration: true,
        defaultModelsExpandDepth: 1
      }}
      customTheme={{
        primary: '#3b82f6',
        secondary: '#10b981'
      }}
    />
  );
}`}</code>
              </pre>
            </div>
          )}

          {/* Demo Container */}
          <div className='bg-slate-800 rounded-lg shadow-lg border border-slate-700 overflow-hidden'>
            <div className='bg-slate-700 px-6 py-3 border-b border-slate-600'>
              <div className='flex items-center gap-2'>
                <div className='flex gap-2'>
                  <div className='w-3 h-3 rounded-full bg-red-500'></div>
                  <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
                  <div className='w-3 h-3 rounded-full bg-green-500'></div>
                </div>
                <span className='text-sm text-gray-300 ml-4'>
                  FlexDoc Demo - E-commerce API Documentation
                </span>
                <div className='ml-auto flex items-center gap-2 text-xs text-gray-400'>
                  <Settings size={14} />
                  Theme: {selectedTheme}
                </div>
              </div>
            </div>

            {/* FlexDoc Component */}
            <div className='h-[800px]'>
              <FlexDoc
                spec={sampleEcommerceSpec}
                theme={selectedTheme}
                customTheme={customTheme}
                options={{
                  filter: true,
                  hideHostname: false,
                  pathInMiddlePanel: true,
                  displayRequestDuration: true,
                  defaultModelsExpandDepth: 1,
                  title: 'E-commerce API Documentation',
                }}
              />
            </div>
          </div>

          {/* Demo Features */}
          <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700'>
              <h3 className='font-semibold mb-2 text-blue-400'>
                Sidebar Navigation
              </h3>
              <p className='text-gray-400 text-sm'>
                Organized endpoint navigation with collapsible sections and
                search functionality.
              </p>
            </div>

            <div className='bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700'>
              <h3 className='font-semibold mb-2 text-green-400'>
                Interactive Dashboard
              </h3>
              <p className='text-gray-400 text-sm'>
                Overview dashboard with API statistics, HTTP method
                distribution, and quick insights.
              </p>
            </div>

            <div className='bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-700'>
              <h3 className='font-semibold mb-2 text-purple-400'>
                Dark Theme Design
              </h3>
              <p className='text-gray-400 text-sm'>
                Professional dark theme with syntax highlighting and modern UI
                components.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className='mt-12 text-center'>
            <h2 className='text-2xl font-semibold mb-4 text-white'>
              Ready to use FlexDoc?
            </h2>
            <p className='text-gray-400 mb-6'>
              Get started with FlexDoc in your project today and create
              beautiful API documentation.
            </p>
            <div className='flex flex-wrap gap-4 justify-center'>
              <Link
                href='/flexdoc'
                className='inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors'
              >
                View Documentation
              </Link>
              <Link
                href='https://github.com/bluejeans117/flexdoc'
                target='_blank'
                className='inline-flex items-center gap-2 px-6 py-3 border border-slate-600 hover:bg-slate-700 text-white rounded-md transition-colors'
              >
                <ExternalLink size={16} />
                GitHub Repository
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
