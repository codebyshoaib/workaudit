"use client";

import Link from "next/link";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import { GithubSignIn } from "./github-signin";
import { GoogleSignIn } from "./google-signin";
import { useSignUpForm } from "@/hooks/useSignUpForm"; //custom hook

// SignUpForm component
export default function SignUpForm() {
  const {
    formData,
    handleChange,
    handleSubmit,
    showPassword,
    setShowPassword,
    isChecked,
    setIsChecked,
    errors,
  } = useSignUpForm();

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Back to dashboard
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Sign Up
          </h1>
          <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
            Enter your email and password to sign up!
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
            <GoogleSignIn />
            <GithubSignIn />
          </div>

          <div className="relative py-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white dark:bg-gray-900 px-4 text-gray-400">
                Or
              </span>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <Label>
                  First Name<span className="text-error-500">*</span>
                </Label>
                <Input
                  type="text"
                  name="fname"
                  placeholder="Enter your first name"
                  value={formData.fname}
                  onChange={handleChange}
                />
                {errors.fname && (
                  <p className="text-sm text-red-500">{errors.fname}</p>
                )}
              </div>
              <div>
                <Label>
                  Last Name<span className="text-error-500">*</span>
                </Label>
                <Input
                  type="text"
                  name="lname"
                  placeholder="Enter your last name"
                  value={formData.lname}
                  onChange={handleChange}
                />
                {errors.lname && (
                  <p className="text-sm text-red-500">{errors.lname}</p>
                )}
              </div>
            </div>

            <div>
              <Label>
                Email<span className="text-error-500">*</span>
              </Label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <Label>
                Password<span className="text-error-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? <EyeCloseIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <Checkbox
                label={
                  <span>
                    I accept the{" "}
                    <Link href="/terms" className="text-brand-500 underline">
                      Terms and Conditions
                    </Link>
                  </span>
                }
                checked={isChecked}
                onChange={() => setIsChecked((prev) => !prev)}
              />
              {errors.terms && (
                <p className="text-sm text-red-500">{errors.terms}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isChecked}
              className={`w-full px-4 py-3 text-sm font-medium text-white rounded-lg shadow-theme-xs ${
                isChecked
                  ? "bg-brand-500 hover:bg-brand-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Sign Up
            </button>

            <p className="mt-5 text-sm text-center text-gray-700 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-primary-600 hover:underline dark:text-primary-400"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
