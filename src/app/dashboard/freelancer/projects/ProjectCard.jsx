// src/app/dashboard/freelancer/projects/ProjectCard.jsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  Button,
  Chip,
  Modal,
  Form,
  TextField,
  Input,
  Label,
} from "@heroui/react";
import {
  FiDollarSign,
  FiCalendar,
  FiExternalLink,
  FiCheckCircle,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";
import toast from "react-hot-toast";

export default function ProjectCard({ project, onUpdate }) {
  const { tasks } = project;
  const [isOpen, setIsOpen] = useState(false);
  const [urlInput, setUrlInput] = useState("");

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "success";
      case "in-progress":
        return "primary";
      default:
        return "warning";
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return toast.error("Please insert a valid URL");
    onUpdate(tasks._id, urlInput);
    setIsOpen(false); // Close Modal
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ y: -6, transition: { duration: 0.2 } }}
        transition={{ duration: 0.3 }}
      >
        <Card className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-5 shadow-sm h-full flex flex-col justify-between group">
          <div className="space-y-4">
            {/* Header section inside card */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-500">
                  {tasks?.category}
                </span>
                <h3 className="text-base font-black tracking-tight text-slate-800 dark:text-white mt-0.5 group-hover:text-indigo-600 transition-colors">
                  {tasks?.title}
                </h3>
              </div>
              <Chip
                size="sm"
                variant="flat"
                color={getStatusColor(tasks?.status)}
                className="font-bold text-xs capitalize"
              >
                {tasks?.status}
              </Chip>
            </div>

            {/* Price & Deadline Metadata Info */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-50 dark:border-slate-800/40">
              <div className="flex items-center gap-1.5">
                <FiDollarSign className="w-4 h-4 text-slate-400" />
                <div>
                  <span className="block text-[9px] font-bold text-slate-400 uppercase">
                    Budget
                  </span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    ${project?.proposedBudget}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <FiCalendar className="w-4 h-4 text-slate-400" />
                <div>
                  <span className="block text-[9px] font-bold text-slate-400 uppercase">
                    Deadline
                  </span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    {tasks?.deadline}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Segment */}
          <div className="mt-5 pt-3 border-t border-slate-50 dark:border-slate-800/40">
            {/* {tasks?.deliverable_url&&} */}
            {tasks?.status.toLowerCase() === "in-progress" && !tasks?.deliverable_url && (
              <Button
                onClick={() => setIsOpen(true)}
                color="primary"
                className="w-full text-xs font-bold bg-indigo-600 text-white rounded-xl shadow-md shadow-indigo-600/10 py-5 flex items-center gap-1.5"
              >
                <FiUploadCloud className="w-4 h-4" /> Submit Deliverable
              </Button>
            )}

            {(tasks?.status.toLowerCase() === "completed" ||
              tasks?.deliverable_url) && (
                <a
                  href={tasks.deliverable_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-xs font-bold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 rounded-xl py-2.5 flex items-center justify-center gap-1.5 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                >
                  <FiExternalLink className="w-3.5 h-3.5" /> View Project Asset
                </a>
              )}

            {tasks?.status === "open" && (
              <div className="text-center py-2 text-xs font-medium text-slate-400 bg-slate-50 dark:bg-slate-950/40 rounded-xl">
                Waiting on Agreement Setup
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Fixed HeroUI Modal Structure using nested namespaces */}
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop className="bg-black/40 backdrop-blur-sm">
          <Modal.Container>
            <Modal.Dialog className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full overflow-hidden p-6 relative">
              {/* Optional Custom Close trigger icon button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <FiX className="w-4 h-4" />
              </button>

              <Form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
                <Modal.Header className="space-y-1">
                  <Modal.Heading className="text-slate-900 dark:text-white font-black text-lg">
                    Submit Your Deliverable
                  </Modal.Heading>
                  <p className="text-xs text-slate-400 font-medium">
                    Provide the production asset link (e.g., GitHub, Figma,
                    Google Drive).
                  </p>
                </Modal.Header>

                <Modal.Body className="py-2">
                  <TextField isRequired name="deliverableUrl">
                    <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <FiExternalLink className="text-indigo-500" /> Deliverable
                      Asset URL
                    </Label>
                    <Input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://github.com/username/project"
                      className="w-full text-sm font-medium mt-1"
                    />
                  </TextField>
                </Modal.Body>

                <Modal.Footer className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                  <Button
                    type="button"
                    variant="secondary"
                    className="font-bold text-xs rounded-xl px-4 py-2 border border-slate-200 dark:border-slate-800"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    className="font-bold text-xs bg-indigo-600 text-white rounded-xl shadow-md px-4 py-2 flex items-center gap-1.5"
                  >
                    <FiCheckCircle className="w-3.5 h-3.5" /> Complete Task
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
