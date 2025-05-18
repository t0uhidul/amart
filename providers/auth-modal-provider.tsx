import { LoginModal } from "@/app/_components/login-modal";
import { OtpVerificationModal } from "@/app/_components/otp-verification-modal";

export function AuthModalsProvider() {
  return (
    <>
      <LoginModal />
      <OtpVerificationModal />
    </>
  );
}
