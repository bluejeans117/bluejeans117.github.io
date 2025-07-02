'use client';

import { useState, useEffect, useRef } from 'react';

// Import CSS for Prism theme - use a more TypeScript-friendly approach
// The CSS import is moved to a client-side only context

// Define a type for Prism
type PrismType = typeof import('prismjs');

// Use dynamic imports for client-side only code
let Prism: PrismType | undefined;

// Initialize Prism on the client side only
if (typeof window !== 'undefined') {
  // Import CSS for Prism theme in client-side context
  import('prismjs/themes/prism-tomorrow.css').catch((err) =>
    console.error('Failed to load Prism CSS:', err)
  );

  // Using import() instead of require()
  import('prismjs')
    .then((module) => {
      Prism = module.default;
      // Import language components
      Promise.all([
        import('prismjs/components/prism-javascript'),
        import('prismjs/components/prism-typescript'),
        import('prismjs/components/prism-jsx'),
        import('prismjs/components/prism-tsx'),
      ]).catch((err) =>
        console.error('Failed to load Prism language components:', err)
      );
    })
    .catch((err) => console.error('Failed to load Prism:', err));
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
    if (typeof window !== 'undefined' && codeRef.current) {
      // Dynamically load Prism if it's not already loaded
      if (!Prism) {
        import('prismjs').then((module) => {
          Prism = module.default;
          // Import language components
          Promise.all([
            import('prismjs/components/prism-javascript'),
            import('prismjs/components/prism-typescript'),
            import('prismjs/components/prism-jsx'),
            import('prismjs/components/prism-tsx'),
          ]).then(() => {
            if (codeRef.current) {
              Prism?.highlightElement(codeRef.current);
            }
          });
        });
      } else {
        // If Prism is already loaded, highlight immediately
        Prism.highlightElement(codeRef.current);
      }
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
