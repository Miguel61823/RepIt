'use client';

import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {SessionForm} from '../../../components/forms/SessionForm';

/**
 * The `NewSession` component provides a button to trigger a sheet where users can add a new session.
 * It listens for a `closeSessionSheet` event to close the sheet automatically when the event is fired.
 *
 * @returns {JSX.Element} A button that opens a right-side sheet for creating a new session.
 *
 */
export function NewSession() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClose = () => setIsOpen(false);
    window.addEventListener('closeSessionSheet', handleClose);
    return () => window.removeEventListener('closeSessionSheet', handleClose);
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className=" dark:text-white text-black">
          <Button variant="ghost">+ Add Session</Button>
        </div>
      </SheetTrigger>
      <SheetContent side="right" className="overflow-y-auto no-scrollbar">
        <SheetHeader>
          <SheetTitle>New Session</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <SessionForm />
      </SheetContent>
    </Sheet>
  );
}
