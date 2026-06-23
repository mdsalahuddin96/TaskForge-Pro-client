"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { FiArrowLeft } from "react-icons/fi";

export default function BackButton({ text = "Back", className = "" }) {
  const router = useRouter();

  return (
    <Button
      size="sm"
      variant="light"
      className={`text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 font-bold p-0 bg-transparent ${className}`}
      onPress={() => router.back()}
    >
      <FiArrowLeft /> {text}
    </Button>
  );
}