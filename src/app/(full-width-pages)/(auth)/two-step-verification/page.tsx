import OtpForm from "@/components/auth/OtpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Two Step Verification",
  description: "WorkAudit application",
  // other metadata
};

export default function OtpVerification() {
  return <OtpForm />;
}
