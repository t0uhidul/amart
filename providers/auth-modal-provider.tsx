import { LoginModal } from "@/app/_components/auth/login-modal";
import { OtpVerificationModal } from "@/app/_components/auth/otp-verification-modal";

export function AuthModalsProvider() {
  return (
    <>
      <LoginModal />
      <OtpVerificationModal />
    </>
  );
}
