// src/components/EditSupplement.tsx
'use client';

import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {EditSupplementForm} from '../../../components/forms/EditSupplementForm';
import {Supplement} from '@/server/api/supplements';

interface EditSupplementProps {
  supplement: Supplement;
}

export function EditSupplement({supplement}: EditSupplementProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClose = () => setIsOpen(false);
    window.addEventListener('closeEditSupplementSheet', handleClose);
    return () =>
      window.removeEventListener('closeEditSupplementSheet', handleClose);
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="hover:dark:bg-gray-900 hover:bg-gray-100"
        >
          Edit
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="overflow-y-auto no-scrollbar">
        <SheetHeader>
          <SheetTitle>Edit Supplement</SheetTitle>
        </SheetHeader>
        <EditSupplementForm supplement={supplement} />
      </SheetContent>
    </Sheet>
  );
}
