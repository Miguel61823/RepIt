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
import {EditSessionForm} from '../../../components/forms/EditSessionForm';
import {Session} from '@/server/api/sessions';

/**
 * The `EditSession` component provides a button to open a sheet where users can edit a session's details. 
 * It listens for a `closeEditSessionSheet` event to automatically close the sheet if needed.
 *
 * @param {Session} EditedSession - The session object to edit.
 * @param {string} EditedSession.session_id - The unique identifier for the session.
 * @param {string} EditedSession.name - The name of the session.
 * @param {string} EditedSession.type - The type of the session (e.g., meeting, workshop).
 * @param {Date} EditedSession.date - The date of the session.
 * @param {string} EditedSession.session_data - Additional data or notes for the session.
 *
 * @returns {JSX.Element} A button that triggers a right-side sheet for editing the session.
 *
 */
export function EditSession(EditedSession: Session) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClose = () => setIsOpen(false);
    window.addEventListener('closeEditSessionSheet', handleClose);
    return () =>
      window.removeEventListener('closeEditSessionSheet', handleClose);
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
          <SheetTitle>Edit Session</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <EditSessionForm {...EditedSession} />
      </SheetContent>
    </Sheet>
  );
}
