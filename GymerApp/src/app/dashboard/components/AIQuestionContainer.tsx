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
import { answerQuestion } from '@/server/api/sessions';


export const AIQuestionContainer = () => {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  // const [error, setError] = useState<string | null>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleQuestionSubmit = async (question: string) => {
    console.log("Handling question: ", question);
    const output = await answerQuestion(question);
    
    setAnswer(output);
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
        <div>
          {answer}
        </div>
      
      </Suspense>
    </div>
  );
};

