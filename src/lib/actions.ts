// src/lib/actions.ts
"use server";

import { signIn, signOut } from "@/lib/auth";

export async function githubSignIn() {
  await signIn("github", {
    callbackUrl: "/",
  });
}

export async function googleSignIn() {
  await signIn("google", {
    callbackUrl: "/",  
  });
}

export async function signoutAction() {
  await signOut({ redirectTo: "/" });
}