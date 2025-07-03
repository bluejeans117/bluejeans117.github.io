'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FlexDocProps } from '@/types/flexdoc';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export function FlexDoc({
  spec,
  options = {},
  theme = 'auto',
  customTheme = {},
  className = '',
  style = {},
}: FlexDocProps) {
  const { theme: systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='flex items-center justify-center min-h-[400px] bg-slate-900 text-white'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4'></div>
          <p className='text-gray-400'>Loading FlexDoc...</p>
        </div>
      </div>
    );
  }

  if (!spec) {
    return (
      <div className='flex items-center justify-center min-h-[400px] bg-slate-900 text-white'>
        <div className='text-center'>
          <div className='text-red-500 text-4xl mb-4'>⚠️</div>
          <p className='text-gray-400'>No OpenAPI specification provided</p>
        </div>
      </div>
    );
  }

  // Extract operations and group by tags
  const operations: Array<{
    path: string;
    method: string;
    operation: any;
    tag: string;
  }> = [];

  Object.entries(spec.paths || {}).forEach(([path, pathItem]) => {
    Object.entries(pathItem).forEach(([method, operation]) => {
      if (typeof operation === 'object' && operation.summary) {
        const tag = operation.tags?.[0] || 'Default';
        operations.push({ path, method, operation, tag });
      }
    });
  });

  // Group operations by tag
  const operationsByTag = operations.reduce((acc, op) => {
    if (!acc[op.tag]) acc[op.tag] = [];
    acc[op.tag].push(op);
    return acc;
  }, {} as Record<string, typeof operations>);

  // Calculate statistics
  const totalEndpoints = operations.length;
  const servers = spec.servers?.length || 0;
  const tags = Object.keys(operationsByTag).length;
  const securitySchemes = Object.keys(
    spec.components?.securitySchemes || {}
  ).length;

  // HTTP method distribution
  const methodCounts = operations.reduce((acc, op) => {
    acc[op.method.toUpperCase()] = (acc[op.method.toUpperCase()] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getMethodColor = (method: string) => {
    const colors: Record<string, string> = {
      GET: 'bg-blue-500',
      POST: 'bg-green-500',
      PUT: 'bg-orange-500',
      DELETE: 'bg-red-500',
      PATCH: 'bg-purple-500',
      OPTIONS: 'bg-gray-500',
    };
    return colors[method] || 'bg-gray-500';
  };

  const getMethodTextColor = (method: string) => {
    const colors: Record<string, string> = {
      GET: 'text-blue-400',
      POST: 'text-green-400',
      PUT: 'text-orange-400',
      DELETE: 'text-red-400',
      PATCH: 'text-purple-400',
      OPTIONS: 'text-gray-400',
    };
    return colors[method] || 'text-gray-400';
  };

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const selectedOp = selectedEndpoint
    ? operations.find(
        (op) => `${op.method.toUpperCase()}-${op.path}` === selectedEndpoint
      )
    : null;

  return (
    <div className='flex h-screen bg-slate-900 text-white'>
      {/* Sidebar */}
      <div className='w-80 bg-slate-800 border-r border-slate-700 flex flex-col'>
        {/* Header */}
        <div className='p-4 border-b border-slate-700'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='bg-gray-600 px-3 py-1 rounded text-sm font-medium'>
              FlexDoc
            </div>
            <div>
              <h1 className='text-lg font-semibold text-white'>
                {spec.info?.title || 'API Documentation'}
              </h1>
              <p className='text-sm text-gray-400'>
                v{spec.info?.version || '1.0'}
              </p>
            </div>
          </div>
          <p className='text-sm text-gray-400 mb-3'>
            {spec.info?.description ||
              'Example API demonstrating Swagger integration'}
          </p>
          <p className='text-xs text-gray-500'>
            Version {spec.info?.version || '1.0'}
          </p>
        </div>

        {/* Search */}
        <div className='p-4 border-b border-slate-700'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search endpoints...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500'
            />
            <svg
              className='absolute right-3 top-2.5 h-4 w-4 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </div>
        </div>

        {/* Endpoints */}
        <div className='flex-1 overflow-y-auto'>
          <div className='p-4'>
            <h3 className='text-xs font-medium text-gray-400 uppercase tracking-wide mb-3'>
              ENDPOINTS
            </h3>

            {Object.entries(operationsByTag).map(([tag, tagOps]) => (
              <div key={tag} className='mb-4'>
                <button
                  onClick={() => toggleSection(tag)}
                  className='flex items-center justify-between w-full text-left mb-2'
                >
                  <div className='flex items-center gap-2'>
                    {expandedSections.has(tag) ? (
                      <ChevronDownIcon className='h-4 w-4 text-gray-400' />
                    ) : (
                      <ChevronRightIcon className='h-4 w-4 text-gray-400' />
                    )}
                    <span className='text-sm font-medium text-white'>
                      {tag}
                    </span>
                  </div>
                  <span className='text-xs bg-slate-700 px-2 py-1 rounded text-gray-300'>
                    {tagOps.length}
                  </span>
                </button>

                {expandedSections.has(tag) && (
                  <div className='ml-6 space-y-1'>
                    {tagOps.map((op) => {
                      const endpointId = `${op.method.toUpperCase()}-${
                        op.path
                      }`;
                      const isSelected = selectedEndpoint === endpointId;

                      return (
                        <button
                          key={endpointId}
                          onClick={() => setSelectedEndpoint(endpointId)}
                          className={`w-full text-left p-2 rounded text-sm transition-colors ${
                            isSelected
                              ? 'bg-blue-600 text-white'
                              : 'hover:bg-slate-700 text-gray-300'
                          }`}
                        >
                          <div className='flex items-center gap-2 mb-1'>
                            <span
                              className={`px-2 py-1 rounded text-xs font-bold text-white ${getMethodColor(
                                op.method.toUpperCase()
                              )}`}
                            >
                              {op.method.toUpperCase()}
                            </span>
                            <code className='text-xs'>{op.path}</code>
                          </div>
                          <p className='text-xs text-gray-400 truncate'>
                            {op.operation.summary || 'No summary'}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className='p-4 border-t border-slate-700'>
          <div className='flex items-center justify-between text-xs text-gray-400'>
            <span>Powered by FlexDoc</span>
            <div className='flex gap-4'>
              <a href='#' className='hover:text-blue-400'>
                GitHub
              </a>
              <a href='#' className='hover:text-blue-400'>
                Documentation
              </a>
              <a href='#' className='hover:text-blue-400'>
                Support
              </a>
            </div>
          </div>
          <div className='text-xs text-gray-500 mt-1'>
            Copyright © 2025 FlexDoc
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex flex-col'>
        {/* Top Bar */}
        <div className='bg-slate-800 border-b border-slate-700 p-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2'>
                <div className='bg-blue-600 p-2 rounded'>
                  <svg
                    className='h-5 w-5 text-white'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div>
                  <h1 className='text-xl font-semibold text-white'>
                    {spec.info?.title || 'FlexDoc Example API'}
                  </h1>
                  <p className='text-sm text-gray-400'>
                    {spec.info?.description ||
                      'Example API demonstrating Swagger integration'}
                  </p>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <button className='flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded text-sm'>
                <svg
                  className='h-4 w-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                  />
                </svg>
                Download Spec
              </button>
              <button className='p-2 bg-slate-700 hover:bg-slate-600 rounded'>
                <svg
                  className='h-4 w-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='flex-1 overflow-y-auto p-6'>
          {!selectedEndpoint ? (
            // Overview Dashboard
            <div className='space-y-6'>
              {/* Stats Cards */}
              <div className='grid grid-cols-4 gap-4'>
                <div className='bg-slate-800 border border-slate-700 rounded-lg p-4'>
                  <div className='flex items-center gap-3'>
                    <div className='bg-blue-600 p-2 rounded'>
                      <svg
                        className='h-5 w-5 text-white'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                    <div>
                      <p className='text-sm text-gray-400'>Total Endpoints</p>
                      <p className='text-2xl font-bold text-white'>
                        {totalEndpoints}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='bg-slate-800 border border-slate-700 rounded-lg p-4'>
                  <div className='flex items-center gap-3'>
                    <div className='bg-green-600 p-2 rounded'>
                      <svg
                        className='h-5 w-5 text-white'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                    <div>
                      <p className='text-sm text-gray-400'>Servers</p>
                      <p className='text-2xl font-bold text-white'>{servers}</p>
                    </div>
                  </div>
                </div>

                <div className='bg-slate-800 border border-slate-700 rounded-lg p-4'>
                  <div className='flex items-center gap-3'>
                    <div className='bg-purple-600 p-2 rounded'>
                      <svg
                        className='h-5 w-5 text-white'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                    <div>
                      <p className='text-sm text-gray-400'>Tags</p>
                      <p className='text-2xl font-bold text-white'>{tags}</p>
                    </div>
                  </div>
                </div>

                <div className='bg-slate-800 border border-slate-700 rounded-lg p-4'>
                  <div className='flex items-center gap-3'>
                    <div className='bg-orange-600 p-2 rounded'>
                      <svg
                        className='h-5 w-5 text-white'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                    <div>
                      <p className='text-sm text-gray-400'>Security Schemes</p>
                      <p className='text-2xl font-bold text-white'>
                        {securitySchemes}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* HTTP Methods Distribution */}
              <div className='bg-slate-800 border border-slate-700 rounded-lg p-6'>
                <h3 className='text-lg font-semibold text-white mb-4'>
                  HTTP Methods Distribution
                </h3>
                <div className='grid grid-cols-6 gap-4'>
                  {['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'].map(
                    (method) => {
                      const count = methodCounts[method] || 0;
                      return (
                        <div key={method} className='text-center'>
                          <div
                            className={`${getMethodColor(
                              method
                            )} text-white px-4 py-2 rounded-lg mb-2`}
                          >
                            {method}
                          </div>
                          <div className='text-2xl font-bold text-white'>
                            {count}
                          </div>
                          <div className='text-sm text-gray-400'>{method}</div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          ) : (
            // Selected Endpoint Details
            selectedOp && (
              <div className='space-y-6'>
                {/* Endpoint Header */}
                <div className='flex items-center gap-4'>
                  <span
                    className={`px-3 py-1 rounded text-sm font-bold text-white ${getMethodColor(
                      selectedOp.method.toUpperCase()
                    )}`}
                  >
                    {selectedOp.method.toUpperCase()}
                  </span>
                  <code className='text-lg font-mono text-white'>
                    {selectedOp.path}
                  </code>
                </div>

                <div>
                  <h1 className='text-2xl font-bold text-white mb-2'>
                    {selectedOp.operation.summary || 'Create a pet'}
                  </h1>
                  {selectedOp.operation.description && (
                    <p className='text-gray-400'>
                      {selectedOp.operation.description}
                    </p>
                  )}
                </div>

                {/* Authentication */}
                <div className='flex items-center gap-2'>
                  <svg
                    className='h-4 w-4 text-green-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span className='text-sm text-green-400'>
                    No authentication required
                  </span>
                </div>

                {/* Request Body */}
                {selectedOp.operation.requestBody && (
                  <div className='bg-slate-800 border border-slate-700 rounded-lg'>
                    <button
                      onClick={() => toggleSection('requestBody')}
                      className='w-full flex items-center justify-between p-4 text-left'
                    >
                      <div className='flex items-center gap-2'>
                        {expandedSections.has('requestBody') ? (
                          <ChevronDownIcon className='h-4 w-4 text-gray-400' />
                        ) : (
                          <ChevronRightIcon className='h-4 w-4 text-gray-400' />
                        )}
                        <span className='text-white font-medium'>
                          Request Body
                        </span>
                        {selectedOp.operation.requestBody.required && (
                          <span className='bg-red-600 text-white px-2 py-1 rounded text-xs'>
                            required
                          </span>
                        )}
                      </div>
                    </button>
                  </div>
                )}

                {/* Responses */}
                <div className='bg-slate-800 border border-slate-700 rounded-lg'>
                  <button
                    onClick={() => toggleSection('responses')}
                    className='w-full flex items-center justify-between p-4 text-left'
                  >
                    <div className='flex items-center gap-2'>
                      {expandedSections.has('responses') ? (
                        <ChevronDownIcon className='h-4 w-4 text-gray-400' />
                      ) : (
                        <ChevronRightIcon className='h-4 w-4 text-gray-400' />
                      )}
                      <span className='text-white font-medium'>Responses</span>
                    </div>
                  </button>

                  {expandedSections.has('responses') &&
                    selectedOp.operation.responses && (
                      <div className='border-t border-slate-700 p-4'>
                        {Object.entries(selectedOp.operation.responses).map(
                          ([statusCode, response]: [string, any]) => (
                            <div
                              key={statusCode}
                              className='bg-slate-700 border border-slate-600 rounded-lg p-4 mb-4'
                            >
                              <div className='flex items-center gap-3 mb-3'>
                                <span className='bg-green-600 text-white px-2 py-1 rounded text-sm font-bold'>
                                  {statusCode}
                                </span>
                                <span className='text-white'>
                                  {response.description}
                                </span>
                              </div>

                              {response.content && (
                                <div>
                                  <div className='mb-2'>
                                    <span className='text-sm text-gray-400'>
                                      Content Type:{' '}
                                    </span>
                                    <code className='bg-slate-600 px-2 py-1 rounded text-sm text-white'>
                                      application/json
                                    </code>
                                  </div>

                                  <div className='mb-2'>
                                    <span className='text-sm text-gray-400'>
                                      Schema:
                                    </span>
                                    <button className='ml-auto bg-slate-600 hover:bg-slate-500 px-2 py-1 rounded text-xs text-white'>
                                      Copy
                                    </button>
                                  </div>

                                  <div className='bg-slate-900 border border-slate-600 rounded p-3 font-mono text-sm'>
                                    <div className='text-blue-400'>Object</div>
                                    <div className='ml-4'>
                                      <div className='text-red-400'>
                                        name{' '}
                                        <span className='text-red-500'>
                                          required
                                        </span>
                                      </div>
                                      <div className='ml-4 text-green-400'>
                                        string
                                      </div>
                                      <div className='ml-4 text-gray-400'>
                                        The name of the pet
                                      </div>

                                      <div className='text-red-400 mt-2'>
                                        species{' '}
                                        <span className='text-red-500'>
                                          required
                                        </span>
                                      </div>
                                      <div className='ml-4 text-green-400'>
                                        string
                                      </div>
                                      <div className='ml-4 text-gray-400'>
                                        The species of the pet
                                      </div>

                                      <div className='text-red-400 mt-2'>
                                        age{' '}
                                        <span className='text-red-500'>
                                          required
                                        </span>
                                      </div>
                                      <div className='ml-4 text-yellow-400'>
                                        number
                                      </div>
                                      <div className='ml-4 text-gray-400'>
                                        The age of the pet
                                      </div>

                                      <div className='text-red-400 mt-2'>
                                        id{' '}
                                        <span className='text-red-500'>
                                          required
                                        </span>
                                      </div>
                                      <div className='ml-4 text-yellow-400'>
                                        number
                                      </div>
                                      <div className='ml-4 text-gray-400'>
                                        The unique identifier of the pet
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    )}
                </div>

                {/* Code Examples */}
                <div className='bg-slate-800 border border-slate-700 rounded-lg'>
                  <button
                    onClick={() => toggleSection('codeExamples')}
                    className='w-full flex items-center justify-between p-4 text-left'
                  >
                    <div className='flex items-center gap-2'>
                      {expandedSections.has('codeExamples') ? (
                        <ChevronDownIcon className='h-4 w-4 text-gray-400' />
                      ) : (
                        <ChevronRightIcon className='h-4 w-4 text-gray-400' />
                      )}
                      <span className='text-white font-medium'>
                        Code Examples
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
