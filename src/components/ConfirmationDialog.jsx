import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";

const ConfirmationDialog = ({onOpenChange,open,title,description,cancelText,confirmText,onConfirm}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger />
      <AlertDialogContent>
        <AlertDialogTitle className="text-lg font-medium">
          {title}
        </AlertDialogTitle>
        <AlertDialogDescription>
          {description}
        </AlertDialogDescription>
        <div className="md:flex justify-end items-center space-x-2">
          <AlertDialogCancel onClick={() => onOpenChange(false)}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction 
            className="bg-red-500 hover:bg-red-600" 
            onClick={() => {
              onConfirm();
              onOpenChange(false); 
            }}
          >
            {confirmText}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmationDialog