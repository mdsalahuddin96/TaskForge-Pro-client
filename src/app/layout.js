import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});
export const metadata = {
  title: {
    default: "TaskForge Pro | Smart Freelance Marketplace Ecosystem",
    template: "%s | TaskForge Pro",
  },
  description:
    "TaskForge Pro connects global enterprises with top-tier modular developers through secure automated milestones, transparent execution layers, and escrow protection.",
  applicationName: "TaskForge Pro",
  keywords: [
    "MERN Stack Marketplace",
    "Freelance Software Engineer",
    "Hire Developers",
    "Secure Milestone Contracts",
    "Tech Micro-tasks Platform",
    "TaskForge Pro",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased bg-gradient-to-tr from-slate-50 to-indigo-50`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
