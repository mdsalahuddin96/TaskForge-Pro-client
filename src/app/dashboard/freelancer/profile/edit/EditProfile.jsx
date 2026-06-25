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
  Card,
} from "@heroui/react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiDollarSign,
  FiLink,
  FiX,
  FiCheck,
  FiCpu,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { updateUser } from "@/lib/api/updateUser";
import { redirectTo } from "@/lib/actions/redirectTo";

export default function EditProfileClient({ initialProfile }) {
  const [name, setName] = useState(initialProfile.name || "");
  const [photoLink, setPhotoLink] = useState(initialProfile.image || "");
  const [bio, setBio] = useState(initialProfile.bio || "");
  const [hourlyRate, setHourlyRate] = useState(initialProfile.hourlyRate || "");
  const [skills, setSkills] = useState(initialProfile.skills || []);
  const [skillInput, setSkillInput] = useState("");

  // 1. Add Skill Badge Handler
  const handleAddSkill = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();
      const trimmed = skillInput.trim();
      if (trimmed && !skills.includes(trimmed)) {
        setSkills([...skills, trimmed]);
        setSkillInput("");
        toast.success(`Added "${trimmed}" tag`);
      }
    }
  };

  // 2. Remove Skill Badge Handler
  const handleRemoveSkill = (skillToRemove, e) => {
    e.preventDefault();
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  // 3. Form Submission Handler
  const onSubmit = async (e) => {
    e.preventDefault();

    const updatePayload = {
      name,
      image: photoLink,
      bio,
      hourlyRate: Number(hourlyRate),
      skills,
    };
    const result = await updateUser(initialProfile?._id, updatePayload);
    if (result.modifiedCount > 0) {
      toast.success("Profile details updated successfully!");
      await redirectTo("/dashboard/freelancer/profile");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/*  Composable Card Structure layout */}
      <Card className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl shadow-sm overflow-hidden p-2 sm:p-4">
        <Card.Content>
          {/*  Composable Form Layout structure */}
          <Form className="flex w-full flex-col gap-6" onSubmit={onSubmit}>
            {/* Field 1: Full Display Name */}
            <TextField isRequired name="name" className="w-full">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5 block">
                Full Display Name
              </Label>
              <div className="relative flex items-center w-full">
                <FiUser className="absolute left-3.5 text-slate-400 w-4 h-4 z-10" />
                <Input
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-7 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 focus:border-indigo-500 rounded-xl bg-transparent text-sm font-bold text-slate-800 dark:text-slate-100 py-3 px-4 outline-none transition-colors"
                />
              </div>
              <FieldError className="text-xs font-bold text-rose-500 mt-1 block" />
            </TextField>

            {/* Field 2: Profile Photo Link Input */}
            <TextField
              isRequired
              name="photoLink"
              type="url"
              className="w-full"
            >
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5 block">
                Profile Photo Link
              </Label>
              <div className="relative flex items-center w-full">
                <FiLink className="absolute left-3.5 text-slate-400 w-4 h-4 z-10" />
                <Input
                  placeholder="https://example.com/avatar.jpg"
                  value={photoLink}
                  onChange={(e) => setPhotoLink(e.target.value)}
                  className="w-full pl-7 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 focus:border-indigo-500 rounded-xl bg-transparent text-sm font-medium text-slate-700 dark:text-slate-300 py-3 px-4 outline-none transition-colors"
                />
              </div>
              <Description className="text-[10px] text-slate-400 font-medium mt-1 block">
                Provide a public direct secure URL image link.
              </Description>
              <FieldError className="text-xs font-bold text-rose-500 mt-1 block" />
            </TextField>

            {/* Field 3: Hourly Pricing Rate Input (USD) */}
            <TextField isRequired name="hourlyRate" className="w-full">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5 block">
                Hourly Rate ($ USD / hr)
              </Label>
              <div className="relative flex items-center w-full">
                <FiDollarSign className="absolute left-3.5 text-emerald-500 w-4 h-4 z-10" />
                <Input
                  type="number"
                  placeholder="e.g., 25"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className="w-full pl-7 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 focus:border-indigo-500 rounded-xl bg-transparent text-sm font-black text-slate-800 dark:text-slate-100 py-3 px-4 outline-none transition-colors"
                />
              </div>
              <FieldError className="text-xs font-bold text-rose-500 mt-1 block" />
            </TextField>

            {/* Field 4: Custom Skills Tag Input Component */}
            <div className="w-full flex flex-col">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5 block">
                Expertise / Skills Tags
              </Label>
              <div className="flex gap-2 w-full">
                <div className="relative flex items-center w-full">
                  <FiCpu className="absolute left-3.5 text-slate-400 w-4 h-4 z-10" />
                  <Input
                    placeholder="Type a skill and hit Enter"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleAddSkill}
                    className="w-full pl-7 border border-slate-200 dark:border-slate-800 focus:border-indigo-500 rounded-xl bg-transparent text-sm font-bold text-slate-800 dark:text-slate-100 py-3 px-4 outline-none transition-colors"
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleAddSkill}
                  className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold text-xs rounded-xl border border-indigo-100/10 px-5 shadow-sm"
                >
                  Add
                </Button>
              </div>

              {/* Skill Tags Chip Grid Box */}
              <div className="flex flex-wrap gap-1.5 pt-2.5">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 text-xs font-extrabold px-3 py-1 bg-slate-50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300 rounded-xl border border-slate-200/50 dark:border-slate-800/80"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={(e) => handleRemoveSkill(skill, e)}
                      className="text-slate-400 hover:text-rose-500 transition-colors p-0.5"
                    >
                      <FiX className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Field 5: Professional Bio (Standard safe Input with textarea layout logic) */}
            <TextField isRequired name="bio" className="w-full">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5 block">
                Professional Bio Statement
              </Label>
              <textarea
                placeholder="Write a brief overview describing your freelance specialties..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={5}
                required
                className="w-full border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 focus:border-indigo-500 rounded-xl bg-transparent text-sm font-medium text-slate-700 dark:text-slate-300 p-3.5 outline-none transition-colors resize-y leading-relaxed min-h-[120px]"
              />
              <FieldError className="text-xs font-bold text-rose-500 mt-1 block" />
            </TextField>

            <hr className="border-slate-100 dark:border-slate-800/80 my-1" />

            {/* Form Footer Buttons Block Inside Form */}
            <div className="flex gap-2 justify-end w-full">
              <Button
                type="submit"
                className="bg-indigo-600 text-white font-bold text-xs rounded-xl px-5 py-4 shadow-md hover:bg-indigo-700 transition-colors flex items-center gap-1.5"
              >
                <FiCheck className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </Form>
        </Card.Content>

        <Card.Footer />
      </Card>
    </motion.div>
  );
}
