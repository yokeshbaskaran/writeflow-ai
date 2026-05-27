import React from "react";
import { MdOutlineChevronRight } from "react-icons/md";
import { HiOutlineSparkles } from "react-icons/hi2";
import { RiAiGenerate2 } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { useAppContext } from "../context/AppContext";

const HomeHero = () => {
  const { signupNavigate } = useAppContext();
  return (
    <div className="bg-[#050816] text-white overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-40 left-[40%] w-125 h-125 bg-violet-600/30 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,#5b21b6,transparent_55%)]" />

      {/* Hero Section */}
      <section className="h-screen overflow-y-auto relative flex max-md:flex-col items-center justify-center z-10 p-5 pb-24">
        <div className="grid lg:grid-cols-2 items-center gap-16">
          {/* Left Content */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-white/5 backdrop-blur-md mb-8">
              <HiOutlineSparkles className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-gray-300">AI Content Platform</span>
            </div>

            {/* Heading */}
            <h1 className="text-6xl leading-[1.1] font-extrabold tracking-tight">
              Generate AI Content
              <br />
              <span className="bg-linear-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">
                10x Faster.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-8 text-lg text-gray-400 leading-8">
              Create blogs, tweets, LinkedIn posts and more with the power of
              AI.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-5 mt-10">
              <button
                onClick={signupNavigate}
                className="bg-primary hover:bg-violet-500 transition px-5 py-4 rounded-2xl font-semibold shadow-2xl shadow-violet-700/30 cursor-pointer"
              >
                Get Started Free
              </button>
            </div>
          </div>

          {/* Right Hero Card */}
          <div className="max-md:hidden my-10 relative flex justify-center">
            {/* Background Glow */}
            <div className="absolute w-105 h-105 bg-violet-600/40 blur-[120px] rounded-full" />

            {/* Main Card */}
            <div className="relative bg-[#111320]/90 border border-white/10 backdrop-blur-2xl rounded-4xl p-8 w-150 shadow-[0_20px_80px_rgba(124,58,237,0.35)]">
              <div className="grid grid-cols-[180px_1fr] overflow-hidden rounded-2xl border border-white/8">
                {/* Sidebar */}
                <div className="bg-[#0c0d16] p-3 border-r border-white/5">
                  <div className="flex items-center gap-2 mb-8">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-xs text-white">WriteFlow.ai</span>
                  </div>

                  <div className="space-y-3">
                    <SidebarItem
                      icon={<RxDashboard size={16} />}
                      label="Dashboard"
                    />
                    <SidebarItem
                      active
                      icon={<RiAiGenerate2 size={16} />}
                      label="Generate"
                    />
                    {/* <SidebarItem
                      icon={<FileText size={16} />}
                      label="Templates"
                    />
                    <SidebarItem icon={<History size={16} />} label="History" /> */}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <p className="text-3xl font-bold">Generate</p>
                      <p className="text-text-muted mt-2">Your AI Assistant</p>
                    </div>

                    <img
                      src="https://i.pravatar.cc/100"
                      alt=""
                      className="size-11 rounded-full border border-primary"
                    />
                  </div>

                  {/* Input */}
                  <div className="bg-[#181b2c] rounded-2xl p-4 text-gray-400 leading-7 border border-white/5">
                    Write a LinkedIn post about the future of AI in marketing.
                  </div>

                  {/* Selectors */}
                  <div className="flex gap-4 mt-6">
                    <div className="flex-1 bg-[#181b2c] border border-white/5 rounded-xl px-4 py-3 text-sm text-gray-300 flex items-center justify-between">
                      Professional
                      <MdOutlineChevronRight size={16} />
                    </div>

                    <div className="flex-1 bg-[#181b2c] border border-white/5 rounded-xl px-4 py-3 text-sm text-gray-300 flex items-center justify-between">
                      Medium
                      <MdOutlineChevronRight size={16} />
                    </div>
                  </div>

                  {/* Button */}
                  <button className="w-full mt-6 bg-linear-to-r from-violet-600 to-indigo-500 hover:opacity-90 transition py-4 rounded-2xl font-semibold text-lg shadow-xl shadow-violet-700/30 cursor-pointer">
                    Generate AI Response
                  </button>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-10 right-0 bg-[#1b1d30] border border-white/10 rounded-2xl px-7 py-3 shadow-2xl">
                <div className="flex items-center gap-5">
                  <HiOutlineSparkles className="size-7 text-violet-400" />

                  <div>
                    <p className="pb-1 font-bold text-lg">AI Generated</p>
                    <p className="text-gray-400 text-sm mt-1">
                      612 words <span className="mx-2">•</span> 4.2s
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const SidebarItem = ({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) => {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition cursor-pointer ${
        active
          ? "bg-violet-600 text-white"
          : "text-gray-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </div>
  );
};

export default HomeHero;
