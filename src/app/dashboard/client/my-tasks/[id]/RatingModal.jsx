"use client";

import React, { useState } from "react";
import { Modal, Button, Form } from "@heroui/react";
import { FaStar } from "react-icons/fa"; // Run: npm i react-icons
import toast from "react-hot-toast";
import { saveReview } from "@/lib/actions/saveReview";

export default function RatingModal({
  isRatingModalOpen,
  setIsRatingModalOpen,
  additionalData,
}) {
  const {
    taskId,
    freelancerName,
    freelancerEmail: revieweeEmail,
    clientEmail: reviewerEmail,
  } = additionalData;
  // States to manage interactive star rating and hover effects
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  // Handle rating form submission
  const handleRatingSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      return toast.error("Please select at least 1 star before submitting!");
    }

    // Prepare payload data for backend PATCH/POST request
    const reviewPayload = {
      taskId: taskId,
      rating: rating,
      comment: comment.trim(),
      reviewee_email: revieweeEmail,
      reviewer_email: reviewerEmail,
    };
    console.log("review ",reviewPayload)
    const result = await saveReview(reviewPayload);
    if (result.insertedId) {
      toast.success("Thank you for your feedback!");
    }
    else{
      toast.success("Not saved in db")
    }

    // Reset fields and close modal safely
    setRating(0);
    setComment("");
    setIsRatingModalOpen(false);
  };

  return (
    <Modal isOpen={isRatingModalOpen} onOpenChange={setIsRatingModalOpen}>
      <Modal.Backdrop className="bg-black/40 backdrop-blur-sm">
        <Modal.Container placement="center">
          <Modal.Dialog className="sm:max-w-md bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl overflow-hidden shadow-xl">
            <Modal.CloseTrigger onClick={() => setIsRatingModalOpen(false)} />

            {/* Structured HeroUI Form component wrapper wrapper */}
            <Form onSubmit={handleRatingSubmit} className="w-full">
              <Modal.Header className="flex flex-col items-center justify-center pt-6 pb-2 w-full">
                <div className="bg-amber-50 dark:bg-amber-950/40 p-3 rounded-full text-amber-500 mb-2">
                  <FaStar className="w-5 h-5 fill-current" />
                </div>
                <Modal.Heading className="text-base font-black text-slate-900 dark:text-white tracking-tight">
                  Rate Freelancer&apos;s Work
                </Modal.Heading>
                <p className="text-xs text-slate-400 font-medium text-center px-6 mt-1">
                  Share your experience with{" "}
                  <span className="font-bold text-slate-600 dark:text-slate-300">
                    {freelancerName || "Freelancer"}
                  </span>{" "}
                  to help the community.
                </p>
              </Modal.Header>

              <Modal.Body className="p-6 space-y-5 w-full">
                {/* 1. Interactive Star Selector Section */}
                <div className="flex flex-col items-center justify-center gap-1.5 w-full">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Select Stars
                  </span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((starValue) => {
                      // Determine if current star should be filled based on active selection or current pointer hover state
                      const isFilled = starValue <= (hoverRating || rating);

                      return (
                        <button
                          key={starValue}
                          type="button" // Critical to prevent accidental native layout form trigger submissions
                          onClick={() => setRating(starValue)}
                          onMouseEnter={() => setHoverRating(starValue)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 focus:outline-none transform hover:scale-110 active:scale-95 transition-all"
                        >
                          <FaStar
                            className={`w-7 h-7 transition-colors duration-150 ${
                              isFilled
                                ? "text-amber-400 fill-current drop-shadow-sm"
                                : "text-slate-200 dark:text-slate-800"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  {rating > 0 && (
                    <span className="text-[11px] font-bold text-indigo-500 dark:text-indigo-400 animate-fade-in mt-0.5">
                      You selected {rating} out of 5 stars
                    </span>
                  )}
                </div>

                {/* 2. Short Review Text Area Input */}
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Short Review / Feedback
                  </label>
                  <textarea
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a brief note about their communication, speed, and quality of work..."
                    className="w-full text-xs font-medium p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 resize-none placeholder:text-slate-400"
                  />
                </div>

                {/* Bottom Trigger Action Buttons */}
                <div className="flex items-center gap-3 pt-2 w-full">
                  <Button
                    type="button"
                    variant="light"
                    className="w-1/2 rounded-xl font-bold text-xs"
                    onClick={() => {
                      setRating(0);
                      setComment("");
                      setIsRatingModalOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit" // Triggers handleRatingSubmit callback function properly via native mechanism
                    color="primary"
                    className="w-1/2 bg-indigo-600 text-white rounded-xl font-black text-xs shadow-md shadow-indigo-600/10"
                  >
                    Submit Review
                  </Button>
                </div>
              </Modal.Body>
            </Form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
