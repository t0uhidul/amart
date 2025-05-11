"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/auth-context";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"


export function OtpVerificationModal() {
  const {
    authState,
    phoneNumber,
    verifyOtp,
    resendOtp,
    hideModals,
    isLoading,
  } = useAuth();
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (authState === "verifying") {
      setOtp("");
      setCountdown(60);
      setCanResend(false);
    }
  }, [authState]);

  // Set up countdown timer
  useEffect(() => {
    if (authState !== "verifying") return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [authState]);

  const handleVerify = async () => {
    if (otp.length === 6) {
      await verifyOtp(otp);
    }
  };

  const handleResendOTP = async () => {
    if (canResend) {
      await resendOtp();
      setCountdown(60);
      setCanResend(false);
      setOtp("");
    }
  };

  return (
    <Dialog open={authState === "verifying"} onOpenChange={hideModals}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            OTP Verification
          </DialogTitle>
          <DialogDescription className="text-center">
            Please enter the OTP sent to {phoneNumber}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-center py-4">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            onClick={handleVerify}
            className="w-full"
            disabled={isLoading || otp.length !== 6}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </Button>

          <div className="text-center mt-6 space-y-2">
            <p className="text-sm text-gray-500">Not received your OTP?</p>
            {canResend ? (
              <Button
                variant="outline"
                className="w-full"
                onClick={handleResendOTP}
                disabled={isLoading}
              >
                Resend OTP
              </Button>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  className="w-full opacity-70"
                  disabled={true}
                >
                  Resend OTP in {countdown}s
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
