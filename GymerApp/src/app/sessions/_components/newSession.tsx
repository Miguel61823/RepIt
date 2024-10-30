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
import { SessionForm } from "../../../components/forms/SessionForm";

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
        <Button variant="ghost">
          + Add Session
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="overflow-y-auto no-scrollbar">
        <SheetHeader>
          <SheetTitle>New Session</SheetTitle>           
        </SheetHeader>
        <SessionForm />            
      </SheetContent>            
    </Sheet>
  );
}