// src/components/SupplementCard.tsx
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
import {Supplement, deleteSupplement} from '@/server/api/supplements';
import {formatDate} from '@/lib/utils';
import {EditSupplement} from './EditSupplement';

export const SupplementCard = ({
  id,
  name,
  dosage,
  frequency,
  instructions,
  startDate,
  endDate,
  isActive,
}: Supplement) => {
  const thisSupplement = {
    id,
    name,
    dosage,
    frequency,
    instructions,
    startDate,
    endDate,
    isActive,
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full rounded-2xl bg-gray-200 dark:bg-gray-800">
      <CardHeader className="bg-violet-600 text-white">
        <CardTitle className="text-xl font-bold">{name}</CardTitle>
        <CardDescription className="mt-1 text-white text-md font-semibold">
          {dosage}
        </CardDescription>
        <CardDescription className="mt-1 text-white text-sm font-thin">
          Started: {formatDate(startDate)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow mb-6 py-4 ">
        <p className="text-sm mb-3">
          <strong>Frequency:</strong> {frequency}
        </p>
        <p className="text-sm mb-3 whitespace-pre-wrap">
          <strong>Instructions:</strong> {instructions}
        </p>
        {endDate && (
          <p className="text-sm mb-3">
            <strong>End Date:</strong> {formatDate(endDate)}
          </p>
        )}
        <p className="text-sm mb-3">
          <strong>Status:</strong> {isActive ? 'Active' : 'Inactive'}
        </p>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-between">
          <EditSupplement supplement={thisSupplement} />
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
                  your supplement data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="flex w-full justify-between px-24">
                <AlertDialogAction onClick={() => deleteSupplement(id)}>
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
