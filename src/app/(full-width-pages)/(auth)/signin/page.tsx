import SignInForm from "@/components/auth/SignInForm";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In",
  description: "WorkAudit application",
};

export default async function SignIn() {
  const session  = await auth();
  if (session) {  
    return redirect("/");
  }
  return <SignInForm />;
}
