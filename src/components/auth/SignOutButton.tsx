"use client";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={async () => {
        console.log("Signing out...");
        await signOut({ callbackUrl: "/signin" });
        console.log("Sign out called.");
      }}
    >
      Sign out
    </button>
  );
}
