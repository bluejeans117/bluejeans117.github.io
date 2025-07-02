'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { CodeBlock } from './code-block';

export interface CodeExample {
  title: string;
  language: string;
  code: string;
  filename?: string;
}

interface CodePopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  examples: CodeExample[];
}

export function CodePopup({
  isOpen,
  onClose,
  title,
  examples,
}: CodePopupProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Handle escape key to close popup
  useEffect(() => {
    setMounted(true);

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col'>
        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700'>
          <h3 className='text-xl font-semibold'>{title}</h3>
          <button
            onClick={onClose}
            className='p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className='flex border-b border-gray-200 dark:border-gray-700 px-4'>
          {examples.map((example, index) => (
            <button
              key={index}
              className={`py-3 px-4 font-medium text-sm transition-colors ${
                activeTab === index
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTab(index)}
            >
              {example.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className='flex-1 overflow-auto p-4'>
          {examples[activeTab] && (
            <CodeBlock
              code={examples[activeTab].code}
              language={examples[activeTab].language}
              filename={examples[activeTab].filename}
            />
          )}
        </div>
      </div>
    </div>
  );
}

