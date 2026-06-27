"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FiStar,
  FiMessageSquare,
} from "react-icons/fi";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Startup Founder",
    type: "Client",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "TaskForge Pro helped me hire a talented developer within hours. The proposal system is smooth, payments are secure, and project management feels effortless.",
  },
  {
    id: 2,
    name: "Michael Brown",
    role: "Full Stack Developer",
    type: "Freelancer",
    image: "https://i.pravatar.cc/150?img=15",
    review:
      "I've worked on multiple freelance platforms, but TaskForge Pro provides one of the cleanest dashboards and the fastest proposal workflow I've experienced.",
  },
  {
    id: 3,
    name: "Emily Wilson",
    role: "Marketing Manager",
    type: "Client",
    image: "https://i.pravatar.cc/150?img=48",
    review:
      "Posting projects is incredibly simple. I received quality proposals quickly and completed my campaign ahead of schedule.",
  },
];

export default function PlatformTestimonial() {
  return (
    <section className="relative py-24 bg-white dark:bg-black overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-20 -translate-x-1/2 w-[650px] h-[650px] bg-indigo-500/10 blur-[140px] rounded-full" />
    </div>

      <div className="relative max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">

          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-500 text-xs font-black uppercase tracking-[0.25em]">
            <FiMessageSquare />
            Testimonials
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Loved by Clients &
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-violet-400">
              {" "}
              Freelancers
            </span>
          </h2>

          <p className="mt-5 text-slate-500 dark:text-slate-400 text-base leading-relaxed">
            Thousands of professionals trust TaskForge Pro for secure
            collaboration, faster hiring, and successful project delivery.
          </p>
        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (

            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{
                y: -8,
              }}
              className="relative group rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl p-7 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >

              {/* Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-60 h-60 bg-indigo-500/10 blur-3xl rounded-full" />
              </div>

              {/* Stars */}

              <div className="flex items-center gap-1 mb-5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FiStar
                    key={i}
                    className="fill-amber-400 w-4 h-4"
                  />
                ))}
              </div>

              {/* Review */}

              <blockquote className="relative text-sm leading-7 text-slate-600 dark:text-slate-300 italic mb-8">
                &#34;
                {item.review}
                &#34;
              </blockquote>

              {/* User */}

              <div className="flex items-center gap-4">

                <Image
                  src={item.image}
                  alt={item.name}
                  height={400}
                  width={400}
                  className="w-14 h-14 rounded-full border-2 border-indigo-500/20 object-cover"
                />

                <div>

                  <h4 className="font-black text-slate-900 dark:text-white">
                    {item.name}
                  </h4>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {item.role}
                  </p>

                  <span
                    className={`inline-flex mt-2 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      item.type === "Client"
                        ? "bg-indigo-500/10 text-indigo-600"
                        : "bg-emerald-500/10 text-emerald-500"
                    }`}
                  >
                    {item.type}
                  </span>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}