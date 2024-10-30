
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EditSessionForm } from "../../../components/forms/EditSessionForm";
import { Session } from "@/server/api/sessions";



export function EditSession(EditedSession: Session) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClose = () => setIsOpen(false);
    window.addEventListener('closeEditSessionSheet', handleClose);
    return () => window.removeEventListener('closeEditSessionSheet', handleClose);
  }, []);
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary">
          Edit
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="overflow-y-auto no-scrollbar">
        <SheetHeader>
          <SheetTitle>Edit Session</SheetTitle>           
        </SheetHeader>
        <EditSessionForm {...EditedSession}/>            
      </SheetContent>            
    </Sheet>
  );
}