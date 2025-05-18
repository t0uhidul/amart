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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/auth-context";
import { PhoneInput } from "./phone-input";

// Replace the countryCodes array with this enhanced version that includes ISO codes
const countryCodes = [
  { code: "+1", country: "US", name: "United States" },
  { code: "+1", country: "CA", name: "Canada" },
  { code: "+44", country: "GB", name: "United Kingdom" },
  { code: "+61", country: "AU", name: "Australia" },
  { code: "+33", country: "FR", name: "France" },
  { code: "+880", country: "BD", name: "Bangladesh" },
  { code: "+49", country: "DE", name: "Germany" },
  { code: "+91", country: "IN", name: "India" },
  { code: "+86", country: "CN", name: "China" },
  { code: "+81", country: "JP", name: "Japan" },
  { code: "+52", country: "MX", name: "Mexico" },
  { code: "+55", country: "BR", name: "Brazil" },
  { code: "+34", country: "ES", name: "Spain" },
  { code: "+39", country: "IT", name: "Italy" },
  { code: "+7", country: "RU", name: "Russia" },
  { code: "+82", country: "KR", name: "South Korea" },
];

// Function to convert country code to flag emoji
const getCountryFlag = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export function LoginModal() {
  const { authState, login, hideModals, isLoading } = useAuth();
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCountryChange = (value: string) => {
    const country = countryCodes.find(
      (c) => `${c.country}-${c.code}` === value
    );
    if (country) {
      setSelectedCountry(country);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber && selectedCountry) {
      await login(phoneNumber,selectedCountry);
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
            <div className="flex gap-2">
              <Select
                defaultValue={`${selectedCountry.country}-${selectedCountry.code}`}
                onValueChange={handleCountryChange}
              >
                <SelectTrigger className="w-[130px] flex-shrink-0">
                  <SelectValue placeholder="Code">
                    {selectedCountry && (
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {getCountryFlag(selectedCountry.country)}
                        </span>
                        <span>{selectedCountry.code}</span>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {countryCodes.map((country) => (
                    <SelectItem
                      key={`${country.country}-${country.code}`}
                      value={`${country.country}-${country.code}`}
                      className="flex items-center"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {getCountryFlag(country.country)}
                        </span>
                        <span>{country.code}</span>
                        <span className="text-muted-foreground text-xs ml-1">
                          {country.name}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <PhoneInput
                value={phoneNumber}
                onChange={setPhoneNumber}
                id="phone"
                placeholder="Ex: 017XXXXXXXX"
                className="w-full"
              />
            </div>
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
