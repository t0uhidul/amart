"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

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

  const goBack = () => {
    hideModals();
  };

  return (
    <Dialog open={authState === "verifying"} onOpenChange={hideModals}>
      <DialogContent className="w-[90vw] max-w-sm border-0 p-0">
        <div className="bg-white rounded-xl p-4 sm:p-6 relative">
          {/* Back Arrow */}
          <button
            onClick={goBack}
            className="absolute top-3 left-3 sm:top-4 sm:left-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>

          {/* Title */}
          <div className="text-center mb-5 sm:mb-6 mt-6 sm:mt-4">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
              OTP Verification
            </h1>
            <p className="text-gray-600 text-sm mb-1">
              We have sent a verification code to
            </p>
            <p className="text-gray-900 font-semibold text-sm sm:text-base break-words">
              {phoneNumber}
            </p>
          </div>

          {/* OTP Input */}
          <div className="flex justify-center mb-5 sm:mb-6">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              onComplete={handleVerify}
            >
              <InputOTPGroup className="gap-2 sm:gap-3">
                {[...Array(6)].map((_, i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg font-semibold border-2 border-gray-300 rounded-lg focus:border-orange-400 focus:ring-0 bg-white"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          {/* Resend Code */}
          <div className="text-center">
            {canResend ? (
              <button
                onClick={handleResendOTP}
                disabled={isLoading}
                className="text-orange-500 font-medium text-sm hover:text-orange-600 transition-colors"
              >
                Resend Code
              </button>
            ) : (
              <p className="text-gray-500 text-sm">
                Resend Code in {countdown} secs!
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
