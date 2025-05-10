// hooks/useSignUpForm.ts
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignUpSchema } from "@/utils/validations";
import { registerUser } from "@/services/authService";

export function useSignUpForm() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",

  });
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in submitted");
    setErrors({});  
    if (!isChecked) {
      setErrors((prev) => ({ ...prev, terms: "You must accept the terms." }));
      return;
    }

    try {
     
      SignUpSchema.parse(formData);
    
      await registerUser(formData);
      alert("Signup successful!");
      router.push("/signin");
    } catch (err: any) {
      
      const fieldErrors: any = {};
      err.errors.forEach((error: any) => {
        fieldErrors[error.path[0]] = error.message;
      });
      setErrors(fieldErrors);
    }
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    showPassword,
    setShowPassword,
    isChecked,
    setIsChecked,
    errors,  
  };
}
