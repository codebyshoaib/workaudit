"use client";
import { signIn} from "next-auth/react"; // ✅ correct


import { Google } from "@/components/ui/google";

export function GoogleSignIn() {
  return (
    <button
      type="button"
      onClick={async () => {
        const res = await signIn("google", { callbackUrl: "/" });
        console.log("Google SignIn triggered:", res);}}
      className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
    >
      <Google />
      Sign in with Google
    </button>
  );
}
