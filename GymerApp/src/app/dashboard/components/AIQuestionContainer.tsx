'use client';

import React, {Suspense, useState} from 'react';
// import {Search, MapPin, Star, Phone, Check} from 'lucide-react';
// import {Card, CardHeader, CardContent} from '@/components/ui/card';
// import {Button} from '@/components/ui/button';
// import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button} from '@/components/ui/button';
import {Slider} from '@/components/ui/slider';
import { AIQuestionInputBar } from './AIQuestionInputBar';


export const AIQuestionContainer = () => {
  const [question, setQuestion] = useState<string>('');
  // const [error, setError] = useState<string | null>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleQuestionSubmit = (question: string) => {
    console.log("Handling question: ", question);

    setQuestion('');
  };

  return (
    <div className="flex flex-col">
      <AIQuestionInputBar
        value={question}
        onChange={setQuestion}
        onSubmit={handleQuestionSubmit}
      />
      <Suspense fallback={<div>Loading...</div>}>

      {/* ADD OUPUT IN THIS AREA */}
      
      </Suspense>
    </div>
  );
};

