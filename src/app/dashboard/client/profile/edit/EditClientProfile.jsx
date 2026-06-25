// src/app/dashboard/client/profile/edit/EditClientProfile.jsx
"use client";

import React, { useState } from "react";
import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Description,
  Button,
} from "@heroui/react";
import { motion } from "framer-motion";
import { FiUser, FiLink, FiMail, FiCheck, FiShield } from "react-icons/fi";
import toast from "react-hot-toast";
import { updateUser } from "@/lib/api/updateUser";
import { redirectTo } from "@/lib/actions/redirectTo";

export default function EditClientProfile({ initialProfile }) {
  const [name, setName] = useState(initialProfile?.name);
  const [photoLink, setPhotoLink] = useState(initialProfile?.image);
  const [email] = useState(initialProfile?.email);
  const isEmailVerified = initialProfile?.emailVerified ?? true;

  const onSubmit = async (e) => {
    e.preventDefault();

    const updatePayload = {
      name,
      image: photoLink,
    };
    const result = await updateUser(initialProfile?._id, updatePayload);
    if (result.modifiedCount > 0) {
      toast.success("Client profile updated successfully!");
      await redirectTo("/dashboard/client/profile");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="w-full max-w-xl mx-auto py-4"
    >
      {/* Header Info Block Without Card Layout */}
      <div className="mb-8">
        <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
          Account Settings
        </h1>
        <p className="text-xs font-bold text-slate-400 mt-0.5">
          Update your client profile details and public identity.
        </p>
      </div>

      {/* HeroUI Modern Form Engine */}
      <Form className="flex w-full flex-col gap-6" onSubmit={onSubmit}>
        {/* Field 1: Read-Only Email Field Address */}
        <TextField name="email" className="w-full opacity-75">
          <Label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5 block">
            Email Address
          </Label>
          <div className="relative flex items-center w-full">
            <FiMail className="absolute left-3.5 text-slate-400 w-4 h-4 z-10" />
            <Input
              type="email"
              readOnly
              disabled
              value={email}
              className="w-full pl-7 border border-slate-200/80 dark:border-slate-800/80 rounded-xl bg-slate-50 dark:bg-slate-950/40 text-sm font-medium text-slate-500 cursor-not-allowed py-3 px-4 outline-none"
            />
            {isEmailVerified && (
              <span className="absolute right-3.5 flex items-center gap-1 text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-md border border-emerald-500/10">
                <FiShield className="w-3 h-3" /> VERIFIED
              </span>
            )}
          </div>
          <Description className="text-[10px] text-slate-400 font-medium mt-1 block">
            Account email cannot be changed.
          </Description>
        </TextField>

        {/* Field 2: Full Display Name Input */}
        <TextField isRequired name="name" className="w-full">
          <Label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5 block">
            Client Name
          </Label>
          <div className="relative flex items-center w-full">
            <FiUser className="absolute left-3.5 text-slate-400 w-4 h-4 z-10" />
            <Input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-7 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 focus:border-indigo-500 rounded-xl bg-transparent text-sm font-bold text-slate-800 dark:text-slate-100 py-3 px-4 outline-none transition-colors"
            />
          </div>
          <FieldError className="text-xs font-bold text-rose-500 mt-1 block" />
        </TextField>

        {/* Field 3: Profile Photo Link Input */}
        <TextField isRequired name="photoLink" type="url" className="w-full">
          <Label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5 block">
            Profile Photo Link
          </Label>
          <div className="relative flex items-center w-full">
            <FiLink className="absolute left-3.5 text-slate-400 w-4 h-4 z-10" />
            <Input
              placeholder="https://lh3.googleusercontent.com/..."
              value={photoLink}
              onChange={(e) => setPhotoLink(e.target.value)}
              className="w-full pl-7 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 focus:border-indigo-500 rounded-xl bg-transparent text-sm font-medium text-slate-700 dark:text-slate-300 py-3 px-4 outline-none transition-colors"
            />
          </div>
          <Description className="text-[10px] text-slate-400 font-medium mt-1 block">
            Paste your secure direct URL avatar image link.
          </Description>
          <FieldError className="text-xs font-bold text-rose-500 mt-1 block" />
        </TextField>

        {/* Divider Border Line */}
        <hr className="border-slate-100 dark:border-slate-800/60 my-2" />

        {/* Actions Submit Block Triggers */}
        <div className="flex justify-end w-full">
          <Button
            type="submit"
            className="bg-indigo-600 text-white font-bold text-xs rounded-xl px-5 py-4 shadow-md hover:bg-indigo-700 transition-colors flex items-center gap-1.5"
          >
            <FiCheck className="w-4 h-4" />
            Save Profile
          </Button>
        </div>
      </Form>
    </motion.div>
  );
}
