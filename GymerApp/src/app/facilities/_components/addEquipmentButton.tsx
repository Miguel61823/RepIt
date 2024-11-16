'use client';

import React, {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import 'react-toastify/dist/ReactToastify.css';

export const AddEquipmentButton = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    condition: '',
    description: '',
    maintenanceDate: '',
    quantity: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    setOpen(false);
  };

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-[#1a1f2e]">
      <Button
        type="button"
        className="font-medium text-lg w-full bg-purple-600 hover:bg-purple-700 text-white"
        onClick={() => setOpen(true)}
      >
        Add Equipment
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-[400px] sm:w-[540px] bg-[#1a1f2e] border-slate-800">
          <SheetHeader>
            <SheetTitle className="text-purple-400">
              Add New Equipment
            </SheetTitle>
            <SheetDescription className="text-slate-400">
              Add details about the new machine or equipment.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300">
                Equipment Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter equipment name"
                value={formData.name}
                onChange={handleChange}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type" className="text-slate-300">
                Equipment Type
              </Label>
              <Select
                onValueChange={value =>
                  setFormData(prev => ({...prev, type: value}))
                }
              >
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="cardio" className="hover:bg-slate-700">
                    Cardio
                  </SelectItem>
                  <SelectItem value="strength" className="hover:bg-slate-700">
                    Strength Training
                  </SelectItem>
                  <SelectItem value="functional" className="hover:bg-slate-700">
                    Functional Training
                  </SelectItem>
                  <SelectItem
                    value="flexibility"
                    className="hover:bg-slate-700"
                  >
                    Flexibility
                  </SelectItem>
                  <SelectItem value="other" className="hover:bg-slate-700">
                    Other
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition" className="text-slate-300">
                Condition
              </Label>
              <Select
                onValueChange={value =>
                  setFormData(prev => ({...prev, condition: value}))
                }
              >
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="new" className="hover:bg-slate-700">
                    New
                  </SelectItem>
                  <SelectItem value="excellent" className="hover:bg-slate-700">
                    Excellent
                  </SelectItem>
                  <SelectItem value="good" className="hover:bg-slate-700">
                    Good
                  </SelectItem>
                  <SelectItem value="fair" className="hover:bg-slate-700">
                    Fair
                  </SelectItem>
                  <SelectItem value="poor" className="hover:bg-slate-700">
                    Poor
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-slate-300">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter equipment description"
                value={formData.description}
                onChange={handleChange}
                className="min-h-[100px] bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maintenanceDate" className="text-slate-300">
                  Last Maintenance
                </Label>
                <Input
                  id="maintenanceDate"
                  name="maintenanceDate"
                  type="date"
                  value={formData.maintenanceDate}
                  onChange={handleChange}
                  className="bg-slate-800 border-slate-700 text-white focus:border-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-slate-300">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  placeholder="Enter quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500"
                />
              </div>
            </div>

            <SheetFooter>
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                Add Equipment
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};
