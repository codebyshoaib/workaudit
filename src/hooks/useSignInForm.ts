import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignInSchema } from "@/utils/validations"; 
import { z } from "zod"; 
import { signIn } from "next-auth/react";

export function useSignInForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);  // Add a check for client-side rendering
  const router = useRouter();

  useEffect(() => {
    // Set isBrowser to true when we're on the client-side
    setIsBrowser(typeof window !== "undefined");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
  
    try {
      SignInSchema.parse(formData);
      setIsLoading(true);
  
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
  
      if (result?.ok && !result?.error) {
        router.push("/");
      } else {
        setErrors({ general: "Invalid credentials" });
      }
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        const fieldErrors: any = {};
        err.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message;
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ general: "Unexpected error occurred" });
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  return {
    formData,
    handleChange,
    handleSubmit,
    showPassword,
    setShowPassword,
    errors,
    isLoading,
  };
}
