import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { Metadata } from "next";

import React from "react";

export const metadata: Metadata = {
  title: "Reset Password",
  description:
    "WorkAudit application",
  // other metadata
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
