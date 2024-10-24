"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { WorkoutForm } from "../../../components/forms/WorkoutForm";

export function SheetWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClose = () => setIsOpen(false);
    window.addEventListener('closeWorkoutSheet', handleClose);
    return () => window.removeEventListener('closeWorkoutSheet', handleClose);
  }, []);
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost">
          + Add Workout
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto no-scrollbar">
        <SheetHeader>
          <SheetTitle>New Workout</SheetTitle>           
        </SheetHeader>
        <WorkoutForm />            
      </SheetContent>            
    </Sheet>
  );
}