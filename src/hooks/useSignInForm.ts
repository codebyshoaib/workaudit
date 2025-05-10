import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignInSchema } from "@/utils/validations"; // Ensure this schema is correct
import { z } from "zod";
import { signInUser } from "@/services/authService"; // 👈 Import sign-in function

export function useSignInForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state here
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // Reset errors on submit
  
    try {
      // Validate form data using Zod schema
      SignInSchema.parse(formData);
  
      // Start loading state before making the API call
      setIsLoading(true);
  
      // Call sign-in API function
      const result = await signInUser(formData);
  
      if (result?.message === "Login successful") {
        router.push("/");
      } else {
        setErrors({ general: result?.error || "Invalid credentials." });
      }
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        // If validation fails, display field-specific errors
        const fieldErrors: any = {};
        err.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message;
        });
        setErrors(fieldErrors);
      } else {
        // Handle unexpected errors
        setErrors({ general: "An unexpected error occurred." });
      }
    } finally {
      setIsLoading(false); // Reset loading state after submission attempt
    }
  };
  

  return {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    showPassword,
    setShowPassword,
    errors,
    isLoading, // Add the isLoading state in the return value
  };
}
