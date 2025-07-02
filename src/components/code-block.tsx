'use client';

import { useState, useEffect, useRef } from 'react';

// We need to import Prism only on the client side
let Prism: any;
if (typeof window !== 'undefined') {
  Prism = require('prismjs');
  require('prismjs/components/prism-javascript');
  require('prismjs/components/prism-typescript');
  require('prismjs/components/prism-jsx');
  require('prismjs/components/prism-tsx');
  require('prismjs/themes/prism-tomorrow.css');
}

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    // This ensures Prism is available in the browser environment
    if (typeof window !== 'undefined' && codeRef.current && Prism) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  return (
    <div className='relative'>
      {filename && (
        <div className='text-xs text-gray-500 mb-1 ml-1'>{filename}</div>
      )}
      <div className='relative'>
        <button
          onClick={handleCopy}
          className='absolute top-2 right-2 z-10 bg-gray-200/80 dark:bg-gray-700/80 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded p-1.5 text-xs transition-colors flex items-center gap-1 backdrop-blur-sm'
          aria-label='Copy code'
        >
          {copied ? (
            <>
              <i className='fa-solid fa-check text-green-500'></i>
              <span className='text-green-500'>Copied!</span>
            </>
          ) : (
            <>
              <i className='fa-regular fa-copy'></i>
              <span>Copy</span>
            </>
          )}
        </button>
        <pre className='bg-gray-100 dark:bg-gray-900 p-4 pt-10 rounded-lg overflow-x-auto text-sm'>
          <code ref={codeRef} className={`language-${language} font-mono`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}

