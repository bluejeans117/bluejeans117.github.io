'use client';

import Link from 'next/link';
import { ArrowLeft, ExternalLink, Play, Settings } from 'lucide-react';
import { useTheme } from 'next-themes';
import { FlexDocClientWrapper } from './flexdoc-client-wrapper';

export function FlexDocDemo() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-7xl mx-auto'>
          {/* Header */}
          <div className='mb-8'>
            <Link
              href='/flexdoc'
              className={`inline-flex items-center gap-2 text-sm ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              } hover:underline mb-4`}
            >
              <ArrowLeft size={16} />
              Back to FlexDoc Overview
            </Link>

            <div className='flex items-center gap-3 mb-4'>
              <div className='bg-green-500 p-2 rounded-md'>
                <Play className='text-white' size={24} />
              </div>
              <h1
                className={`text-3xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                FlexDoc Live Demo
              </h1>
            </div>

            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
              Experience FlexDoc in action with this interactive demonstration.
              This demo showcases how FlexDoc transforms OpenAPI specifications
              into beautiful, interactive API documentation.
            </p>
          </div>

          {/* Demo Container */}
          <div
            className={`${
              isDark ? 'bg-gray-800' : 'bg-white'
            } rounded-lg shadow-lg border ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            } overflow-hidden`}
          >
            <div
              className={`${
                isDark ? 'bg-gray-800' : 'bg-gray-50'
              } px-6 py-3 border-b ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <div className='flex items-center gap-2'>
                <div className='flex gap-2'>
                  <div className='w-3 h-3 rounded-full bg-red-500'></div>
                  <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
                  <div className='w-3 h-3 rounded-full bg-green-500'></div>
                </div>
                <span
                  className={`text-sm ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  } ml-4`}
                >
                  FlexDoc Demo - E-commerce API Documentation
                </span>
                <div
                  className={`ml-auto flex items-center gap-2 text-xs ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <Settings size={14} />
                  Theme: {resolvedTheme}
                </div>
              </div>
            </div>

            {/* FlexDoc Component */}
            <div className='h-[800px] overflow-auto'>
              <FlexDocClientWrapper theme={isDark ? 'dark' : 'light'} />
            </div>
          </div>

          {/* Call to Action */}
          <div className='mt-12 text-center'>
            <h2
              className={`text-2xl font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              Ready to use FlexDoc?
            </h2>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
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
                className={`inline-flex items-center gap-2 px-6 py-3 border ${
                  isDark
                    ? 'border-gray-700 hover:bg-gray-800'
                    : 'border-gray-200 hover:bg-gray-50'
                } ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                } rounded-md transition-colors`}
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

