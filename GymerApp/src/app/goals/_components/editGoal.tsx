import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { EditGoalForm } from '../../../components/forms/EditGoalForm';
import { Goal } from '@/server/api/goals';

export function EditGoal(EditedGoal: Goal) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClose = () => setIsOpen(false);
    window.addEventListener('closeEditGoalSheet', handleClose);
    return () =>
      window.removeEventListener('closeEditGoalSheet', handleClose);
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
          <SheetTitle>Edit Goal</SheetTitle>
        </SheetHeader>
        <EditGoalForm {...EditedGoal} />
      </SheetContent>
    </Sheet>
  );
}
