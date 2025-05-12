"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";
import { PhoneInput } from "./phone-input";

export function LoginModal() {
  const { authState, login, hideModals, isLoading } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber) {
      await login(phoneNumber);
    }
  };

  return (
    <Dialog open={authState === "login"} onOpenChange={hideModals}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Sign in
          </DialogTitle>
          <DialogDescription className="text-center">
            Enter your phone number to get started
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <PhoneInput
              value={phoneNumber}
              onChange={setPhoneNumber}
              id="phone"
              placeholder="+1 (555) 000-0000"
              className="w-full"
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !phoneNumber}
          >
            {isLoading ? "Sending..." : "Login"}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>
          <Button variant="outline" className="w-full" type="button">
            <svg
              className="mr-2 h-4 w-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Sign in with Google
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
