"use client";

import React, { useState } from "react";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { FiBriefcase, FiUser, FiCheckCircle } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FormSubmitBtn } from "@/components/main/FormSubmitBtn";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";
import { redirectTo } from "@/lib/actions/redirectTo";

export default function RegisterPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Client");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleFormSubmit = async (formData) => {
    const userData = Object.fromEntries(formData.entries());
    userData.role = selectedRole;
    // userData.isBlocked = false;
    //  convert skills to Array
    if (selectedRole === "Freelancer" && userData.skills) {
      userData.skills = userData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== "");
    } else {
      userData.skills = [];
    }

    const { data, error } = await authClient.signUp.email(userData);
    if (data) {
      redirectTo("/login")
      toast.success("Registered Successfully!");
    }
    if (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin =async () => {
    const data=await authClient.signIn.social({
      provider:"google",
    })
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-slate-50 to-indigo-50 p-6 dark:from-slate-900 dark:to-slate-950">
      <div className="w-full max-w-lg rounded-2xl border border-slate-100 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
            Join SkillSwap
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Start trading micro-tasks today. Fast, reliable, and
            straightforward.
          </p>
        </div>

        {/* Google OAuth (Always Client) */}
        <Button
          type="button"
          variant="outline"
          className="w-full mb-6 font-medium border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          onPress={handleGoogleLogin}
        >
          <FcGoogle />
          Continue with Google (as Client)
        </Button>

        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200 dark:border-slate-800" />
          </div>
          <span className="relative bg-white px-3 text-xs font-semibold uppercase text-slate-400 dark:bg-slate-900">
            Or register with Email
          </span>
        </div>

        {/* --- CUSTOM DIV ROLE SELECTION SECTION --- */}
        <div className="mb-6">
          <Label className="font-semibold block mb-3 text-slate-700 dark:text-slate-300">
            I want to join as a:
          </Label>

          <div className="grid grid-cols-2 gap-4">
            {/* Client Card */}
            <div
              onClick={() => setSelectedRole("Client")}
              className={`relative flex flex-col items-center justify-center p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 select-none ${
                selectedRole === "Client"
                  ? "border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/20 shadow-md ring-1 ring-indigo-600"
                  : "border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
              }`}
            >
              {/* Active Checkmark Badge */}
              {selectedRole === "Client" && (
                <FiCheckCircle className="absolute top-2 right-2 text-indigo-600 dark:text-indigo-400 w-5 h-5" />
              )}

              <div
                className={`p-3 rounded-full mb-3 ${selectedRole === "Client" ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50" : "bg-slate-100 text-slate-500 dark:bg-slate-800"}`}
              >
                <FiUser className="w-6 h-6" />
              </div>
              <span
                className={`font-bold text-base ${selectedRole === "Client" ? "text-indigo-600 dark:text-indigo-400" : "text-slate-700 dark:text-slate-300"}`}
              >
                Client
              </span>
              <p className="text-center text-xs text-slate-400 mt-1">
                Hire talent & post tasks
              </p>
            </div>

            {/* Freelancer Card */}
            <div
              onClick={() => setSelectedRole("Freelancer")}
              className={`relative flex flex-col items-center justify-center p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 select-none ${
                selectedRole === "Freelancer"
                  ? "border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/20 shadow-md ring-1 ring-indigo-600"
                  : "border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
              }`}
            >
              {/* Active Checkmark Badge */}
              {selectedRole === "Freelancer" && (
                <FiCheckCircle className="absolute top-2 right-2 text-indigo-600 dark:text-indigo-400 w-5 h-5" />
              )}

              <div
                className={`p-3 rounded-full mb-3 ${selectedRole === "Freelancer" ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50" : "bg-slate-100 text-slate-500 dark:bg-slate-800"}`}
              >
                <FiBriefcase className="w-6 h-6" />
              </div>
              <span
                className={`font-bold text-base ${selectedRole === "Freelancer" ? "text-indigo-600 dark:text-indigo-400" : "text-slate-700 dark:text-slate-300"}`}
              >
                Freelancer
              </span>
              <p className="text-center text-xs text-slate-400 mt-1">
                Find tasks & earn money
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Form */}
        <Form className="flex flex-col gap-5" action={handleFormSubmit}>
          {/* ---- Common Fields ---- */}
          <TextField isRequired name="name" type="text">
            <Label className="font-semibold text-slate-700 dark:text-slate-300">
              Name
            </Label>
            <Input placeholder="Enter your full name" />
            <FieldError className="text-xs text-danger" />
          </TextField>

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

          <TextField isRequired name="image" type="url">
            <Label className="font-semibold text-slate-700 dark:text-slate-300">
              Profile Image URL
            </Label>
            <Input placeholder="https://example.com/avatar.jpg" />
            <FieldError className="text-xs text-danger" />
          </TextField>

          <TextField
            isRequired
            name="password"
            type={isVisible ? "text" : "password"}
            validate={(value) => {
              if (value.length < 6)
                return "Password must be at least 6 characters long";
              // if (!/[A-Z]/.test(value))
              //   return "Password must contain at least one capital letter";
              if (!/[a-z]/.test(value))
                return "Password must contain at least one lowercase letter";
              return null;
            }}
          >
            <Label className="font-semibold text-slate-700 dark:text-slate-300">
              Password
            </Label>
            <div className="relative flex justify-between items-center">
              <Input placeholder="Enter a secure password" />
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

          {/* ---- EXTRA Freelancer Profile Section (শর্তসাপেক্ষে দেখাবে) ---- */}
          {selectedRole === "Freelancer" && (
            <div className="mt-2 pt-4 border-t border-dashed border-slate-200 dark:border-slate-800 flex flex-col gap-5">
              <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                Freelancer Profile Details
              </h3>

              <TextField isRequired name="skills" type="text">
                <Label className="font-semibold text-slate-700 dark:text-slate-300">
                  Skills
                </Label>
                <Input placeholder="e.g. React, Tailwind, Node.js" />
                <Description className="text-xs text-slate-400">
                  Separate skills with commas
                </Description>
                <FieldError className="text-xs text-danger" />
              </TextField>

              <TextField isRequired name="bio" type="text">
                <Label className="font-semibold text-slate-700 dark:text-slate-300">
                  Bio
                </Label>
                <Input placeholder="Tell us about your expertise..." />
                <FieldError className="text-xs text-danger" />
              </TextField>

              <TextField
                isRequired
                name="hourlyRate"
                type="number"
                validate={(value) =>
                  Number(value) <= 0 ? "Rate must be greater than 0" : null
                }
              >
                <Label className="font-semibold text-slate-700 dark:text-slate-300">
                  Hourly Rate ($)
                </Label>
                <Input placeholder="e.g. 15" min="1" />
                <FieldError className="text-xs text-danger" />
              </TextField>
            </div>
          )}

          {/* Submit Button */}
          <FormSubmitBtn text="Register" role={selectedRole} />
          {/* Link to Register Page */}
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-2">
            Already have an account?{" "}
            <Link
              href={"/login"}
              className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer"
            >
              SignIn
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
