"use client";

import { Spinner } from "@heroui/react";
import { useFormStatus } from "react-dom";

export function FormSubmitBtn({ text, role = "" }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl py-3 shadow-md hover:from-indigo-700 hover:to-violet-700 transition flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? (
        <Spinner color="current" size="sm" />
      ) : (
        <span>
          {text} {role && `as ${role}`}
        </span>
      )}
    </button>
  );
}
