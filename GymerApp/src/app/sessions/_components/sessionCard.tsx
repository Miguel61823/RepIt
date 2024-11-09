'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {Button} from '@/components/ui/button';
import {Session, deleteSession} from '@/server/api/sessions';
import {formatDate} from '@/lib/utils';
import {EditSession} from './editSession';

export const SessionCard = ({
  session_id,
  type,
  name,
  date,
  session_data,
}: Session) => {
  const thisSession = {
    session_id,
    type,
    name,
    date,
    session_data,
  };
  return (
    <Card className="overflow-hidden flex flex-col h-full rounded-2xl bg-gray-200 dark:bg-gray-800">
      <CardHeader className="bg-violet-600 text-white">
        <CardTitle className="text-xl font-bold">{name}</CardTitle>
        <CardDescription className="mt-1 text-white text-md font-semibold">
          {type}
        </CardDescription>
        <CardDescription className="mt-1 text-white text-sm font-thin">
          {formatDate(date)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow mb-6 py-4 ">
        <p className="text-sm mb-3 whitespace-pre-wrap">{session_data}</p>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-between">
          <EditSession {...thisSession} />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                className="hover:text-red-500 text-red-500 hover:bg-gray-100 hover:dark:bg-gray-900"
              >
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your session data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="flex w-full justify-between px-24">
                <AlertDialogAction onClick={() => deleteSession(session_id)}>
                  Yes, I am sure
                </AlertDialogAction>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
};
