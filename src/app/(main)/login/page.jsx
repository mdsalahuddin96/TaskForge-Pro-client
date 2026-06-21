"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import toast from "react-hot-toast";
import Link from "next/link";
import { FormSubmitBtn } from "@/components/main/FormSubmitBtn";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  // Dynamically Redirect according to role
  const handleRoleRedirect = (role) => {
    if (role.toLowerCase() === "client") {
      router.push("/"); // Client যাবে হোম পেজে
    } else if (role.toLowerCase() === "freelancer") {
      router.push("/dashboard/freelancer"); // Freelancer ও Admin যাবে ড্যাশবোর্ডে
    } else {
      router.push("/dashboard/admin"); // সেফটি ব্যাকআপ রিডাইরেক্ট
    }
  };

  // Form Login Handle
  const handleFormSubmit = async (formData) => {
    try {
      const loginData = Object.fromEntries(formData.entries());
      const { data, error } = await authClient.signIn.email(loginData);
      if (data) {
        toast.success("Logged in successfully!");
        const role = data?.user?.role;
        console.log(data)
        handleRoleRedirect(role);
      }
      if(error){
        toast.error(error.message)
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  // Google OAuth লগইন হ্যান্ডলার (অলওয়েজ ক্লায়েন্ট হিসেবে রিডাইরেক্ট হবে)
  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-slate-50 to-indigo-50 p-6 dark:from-slate-900 dark:to-slate-950">
      <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        {/* Attractive Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-500 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Log in to your TaskForge Pro account to continue.
          </p>
        </div>

        {/* Google OAuth Button */}
        <Button
          type="button"
          variant="outline"
          className="w-full mb-6 font-medium border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          onPress={handleGoogleLogin}
        >
          <FcGoogle />
          Continue with Google
        </Button>

        {/* Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200 dark:border-slate-800" />
          </div>
          <span className="relative bg-white px-3 text-xs font-semibold uppercase text-slate-400 dark:bg-slate-900">
            Or login with Email
          </span>
        </div>

        {/* Credentials Form */}
        <Form className="flex flex-col gap-5" action={handleFormSubmit}>
          {/* Email Field */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="font-semibold text-slate-700 dark:text-slate-300">
              Email
            </Label>
            <Input placeholder="you@example.com" />
            <FieldError className="text-xs text-danger" />
          </TextField>

          {/* Password Field */}
          <TextField
            isRequired
            name="password"
            type={isVisible ? "text" : "password"}
          >
            <div className="flex justify-between items-center mb-1">
              <Label className="font-semibold text-slate-700 dark:text-slate-300">
                Password
              </Label>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>
            <div className="relative flex items-center">
              <Input placeholder="Enter your password" />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 focus:outline-none hover:text-slate-600 transition text-xs font-semibold"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? "HIDE" : "SHOW"}
              </button>
            </div>
            <FieldError className="text-xs text-danger" />
          </TextField>

          {/* Dynamic Submit Button with your custom loader styling */}

          <FormSubmitBtn text="Log In" />

          {/* Link to Register Page */}
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-2">
            Don&apos;t have an account?{" "}
            <Link
              href={"/register"}
              className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer"
            >
              Register here
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
