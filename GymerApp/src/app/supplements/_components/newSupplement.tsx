// src/components/NewSupplement.tsx
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {SupplementForm} from '../../../components/forms/SupplementForm';


export function NewSupplement() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClose = () => setIsOpen(false);
    window.addEventListener('closeSupplementSheet', handleClose);
    return () => window.removeEventListener('closeSupplementSheet', handleClose);
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="dark:text-white text-black">
          <Button variant="ghost">+ Add Supplement</Button>
        </div>
      </SheetTrigger>
      <SheetContent side="right" className="overflow-y-auto no-scrollbar">
        <SheetHeader>
          <SheetTitle>New Supplement</SheetTitle>
        </SheetHeader>
        <SupplementForm />
      </SheetContent>
    </Sheet>
  );
}
