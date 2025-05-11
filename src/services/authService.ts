// services/authService.ts
import { signIn } from "next-auth/react"; // Import signIn from next-auth/react

// Sign-up function for new users
export const registerUser = async (formData: any) => {
  const res = await fetch("/api/auth/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...formData, acceptedTerms: true }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Signup failed");
  return data;
};

// Sign-in function for existing users
// Login existing user
// export const signInUser = async ({
//   email,
//   password,
// }: {
//   email: string;
//   password: string;
// }) => {
//   const res = await fetch("/api/auth/signin", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//     credentials: "include",
//   });

//   const data = await res.json();
//   if (!res.ok) throw new Error(data.error || "Login failed");

//   return data; // Expect token, user info, etc.
// };
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prismaClient";

export const signInUser = async ({ email, password }: { email: string; password: string }) => {
  console.log("[🔥 AUTH SERVICE HIT]", email);

  const user = await prisma.user.findUnique({
    where: { email },
  });

  console.log("[✅ USER FETCHED]", user);

  if (!user || !user.password) {
    console.log("[❌ USER NOT FOUND OR NO PASSWORD]");
    return null;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    console.log("[❌ INVALID PASSWORD]");
    return null;
  }

  console.log("[✅ USER AUTHENTICATED]");
  return user;
};
