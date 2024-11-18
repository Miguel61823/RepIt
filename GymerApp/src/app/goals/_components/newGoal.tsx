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
import {GoalForm} from '../../../components/forms/GoalForm';

export function NewGoal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClose = () => setIsOpen(false);
    window.addEventListener('closeGoalSheet', handleClose);
    return () => window.removeEventListener('closeGoalSheet', handleClose);
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className=" dark:text-white text-black">
          <Button variant="ghost">+ Add Goal</Button>
        </div>
      </SheetTrigger>
      <SheetContent side="right" className="overflow-y-auto no-scrollbar">
        <SheetHeader>
          <SheetTitle>New Goal</SheetTitle>
        </SheetHeader>
        <GoalForm />
      </SheetContent>
    </Sheet>
  );
}
