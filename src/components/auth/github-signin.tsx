"use client";
import { signIn } from "next-auth/react";
import { Github } from "@/components/ui/github"; // Assuming you have an icon like <Github />

export function GithubSignIn() {
  return (
    <button
      type="button"
      onClick={async () => {
        const res = await signIn("github", { callbackUrl: "/" });
        console.log("GitHub SignIn triggered:", res);
      }}
      className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
    >
      <Github />
      Sign in with GitHub
    </button>
  );
}
