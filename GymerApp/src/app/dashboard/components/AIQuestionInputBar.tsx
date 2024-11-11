'use client';

import React, {useEffect, useRef, useState} from 'react';
import {Search} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {useDebounce} from 'use-debounce';
import { Textarea } from '@/components/ui/textarea';

interface AIQuestionInputBarProps {
  value: string,
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
};

export const AIQuestionInputBar = ({
  value,
  onChange,
  onSubmit,
}: AIQuestionInputBarProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) {
      return;
    }
    onSubmit(value);
  };

  return (
    <div>
      <div className="mt-3">
        <form onSubmit={handleSubmit} className='w-full flex flex-col'>
          {/* <Search className="relative left-2 top-9 text-gray-500" size={20} /> */}
          <Textarea
            placeholder="Ask me anything about your sessions!"
            className="ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0 bg-neutral-100 dark:bg-gray-800"
            value={value}
            onChange={(e) => {onChange(e.target.value)}}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
        </form>
          <p className="italic font-extralight text-sm text-gray-600 dark:text-gray-400 text-right">
            Press Shift + Enter to add a new line.
          </p>
      </div>
    </div>
  );
};
