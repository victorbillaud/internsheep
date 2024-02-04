"use client";

import { Button } from "@/componentsV2/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/componentsV2/ui/dialog";
import { useState } from "react";
import { UserCreationForm } from "./UserCreationForm";

export function UserCreationDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="ml-auto">
          Create user
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a new user</DialogTitle>
          <DialogDescription>Fill out the form below to create a new user.</DialogDescription>
        </DialogHeader>
        <UserCreationForm closeDialog={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
