'use client';

import React, {useEffect, useRef, useState} from 'react';
import {Search} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {useDebounce} from 'use-debounce';
import {Textarea} from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface AIQuestionInputBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
}

export const AIQuestionInputBar = ({
  value,
  onChange,
  onSubmit,
}: AIQuestionInputBarProps) => {
  // Disable form submit on Enter
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // Only submit form when button is clicked
  const handleButtonClick = () => {
    if (!value.trim()) {
      return;
    }
    onSubmit(value);
  };

  return (
    <div>
      <div className="mt-3 w-full">
        <form onSubmit={handleSubmit} className="w-full">
          <Textarea
            placeholder="Ask me anything about your sessions!"
            className="ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0 bg-neutral-200 dark:bg-gray-800"
            value={value}
            onChange={e => {
              onChange(e.target.value);
            }}
          />
          <Button
            type="button"
            onClick={handleButtonClick}
            className="w-32 bg-violet-600 text-white mt-3 mb-2 py-1"  
          >
            Ask!
          </Button>
        </form>
      </div>
    </div>
  );
};
