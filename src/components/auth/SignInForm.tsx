"use client";
import { useSignInForm } from "@/hooks/useSignInForm";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import { useState } from "react";
export default function SignInForm() {
  const {
    formData,
    handleChange,
    handleSubmit,
    showPassword,
    setShowPassword,
    errors,
  } = useSignInForm();

  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const handleFormSubmit = async (e: React.FormEvent) => {
    setIsLoading(true); // Set loading state
    await handleSubmit(e);
    setIsLoading(false); // Reset loading state after submission
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Back to dashboard
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
          Sign In
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter your email and password to sign in!
        </p>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Display error messages */}
          {errors.general && <div className="text-red-500 text-sm">{errors.general}</div>}

          <div>
            <Label>Email <span className="text-error-500">*</span></Label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="info@gmail.com"
              required
            />
            {/* Display email error */}
            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
          </div>

          <div>
            <Label>Password <span className="text-error-500">*</span></Label>
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
              >
                {showPassword ? (
                  <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                ) : (
                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                )}
              </span>
            </div>
            {/* Display password error */}
            {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
          </div>

          <div className="flex items-center justify-between">
            <Link
              href="/reset-password"
              className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
            >
              Forgot password?
            </Link>
          </div>

          <Button className="w-full" size="sm" type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"} {/* Show loading text */}
          </Button>
        </form>

        <div className="mt-5">
          <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
