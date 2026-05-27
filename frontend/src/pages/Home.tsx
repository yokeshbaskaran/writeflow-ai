// import { MdOutlineGeneratingTokens } from "react-icons/md";

// const Home = () => {
//   return (
//     <>
//       <main className="flex yoki h-screen">
//         <section className="w-1/2 flex flex-col items-start justify-center yokii">
//           <div className="px-2 py-1 flex items-center gap-2 border rounded-xl">
//             <MdOutlineGeneratingTokens size={20} />
//             <span className="font-bold">AI Content Platform</span>
//           </div>
//         </section>

//         <section className="w-1/2 yokii self-center">
//           <img src="/home.png" width={500} height={500} alt="home logo" />
//         </section>
//       </main>
//     </>
//   );
// };

// export default Home;

import React from "react";
import {
  Sparkles,
  Play,
  ChevronRight,
  LayoutDashboard,
  PenSquare,
  FileText,
  History,
} from "lucide-react";

const HomeHero = () => {
  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-40 left-[40%] w-[500px] h-[500px] bg-violet-600/30 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,_#5b21b6,_transparent_55%)]" />

      {/* Hero Section */}
      <section className="yoki relative z-10 p-5 pb-24">
        <div className="grid yokiii lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-white/5 backdrop-blur-md mb-8">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-gray-300">AI Content Platform</span>
            </div>

            {/* Heading */}
            <h1 className="text-6xl leading-[1.1] font-extrabold tracking-tight">
              Generate AI Content
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">
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
              <button className="bg-violet-600 hover:bg-violet-500 transition px-8 py-4 rounded-2xl font-semibold shadow-2xl shadow-violet-700/30">
                Get Started Free
              </button>

              <button className="border border-white/10 bg-white/5 hover:bg-white/10 transition px-8 py-4 rounded-2xl font-semibold flex items-center gap-3">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            <p className="mt-5 text-sm text-gray-500">
              No credit card required
            </p>

            {/* Trusted Logos */}
            <div className="mt-20">
              <p className="text-gray-500 text-sm mb-6">
                Trusted by 10,000+ creators & teams
              </p>

              <div className="flex flex-wrap items-center gap-10 text-gray-500 font-semibold text-xl">
                <span>Google</span>
                <span>Microsoft</span>
                <span>Notion</span>
                <span>airbnb</span>
                <span>amazon</span>
              </div>
            </div>
          </div>

          {/* Right Hero Card */}
          <div className="yoki relative flex justify-center">
            {/* Glow */}
            <div className="absolute w-[420px] h-[420px] bg-violet-600/40 blur-[120px] rounded-full" />

            {/* Main Card */}
            <div className="relative bg-[#111320]/90 border border-white/10 backdrop-blur-2xl rounded-[32px] p-6 w-[560px] shadow-[0_20px_80px_rgba(124,58,237,0.35)]">
              <div className="grid grid-cols-[120px_1fr] overflow-hidden rounded-2xl border border-white/5">
                {/* Sidebar */}
                <div className="bg-[#0c0d16] p-5 border-r border-white/5">
                  <div className="yoki flex items-center gap-2 mb-8">
                    <div className="w-3 h-3 rounded-full bg-violet-500" />
                    <span className="text-xs text-gray-300">WriteFlow.ai</span>
                  </div>

                  <div className="space-y-3 yoki">
                    <SidebarItem
                      icon={<LayoutDashboard size={16} />}
                      label="Dashboard"
                    />
                    <SidebarItem
                      active
                      icon={<PenSquare size={16} />}
                      label="Generate"
                    />
                    <SidebarItem
                      icon={<FileText size={16} />}
                      label="Templates"
                    />
                    <SidebarItem icon={<History size={16} />} label="History" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 yoki">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <p className="text-3xl font-bold">Generate</p>
                      <p className="text-gray-400 mt-2">Your AI Assistant</p>
                    </div>

                    <img
                      src="https://i.pravatar.cc/100"
                      alt=""
                      className="w-12 h-12 rounded-full border-2 border-violet-500"
                    />
                  </div>

                  {/* Input */}
                  <div className="bg-[#181b2c] rounded-2xl p-5 text-gray-400 leading-7 border border-white/5">
                    Write a LinkedIn post about the future of AI in marketing.
                  </div>

                  {/* Selectors */}
                  <div className="flex gap-4 mt-6">
                    <div className="flex-1 bg-[#181b2c] border border-white/5 rounded-xl px-4 py-3 text-sm text-gray-300 flex items-center justify-between">
                      Professional
                      <ChevronRight size={16} />
                    </div>

                    <div className="flex-1 bg-[#181b2c] border border-white/5 rounded-xl px-4 py-3 text-sm text-gray-300 flex items-center justify-between">
                      Medium
                      <ChevronRight size={16} />
                    </div>
                  </div>

                  {/* Button */}
                  <button className="w-full mt-6 bg-gradient-to-r from-violet-600 to-indigo-500 hover:opacity-90 transition py-4 rounded-2xl font-semibold text-lg shadow-xl shadow-violet-700/30">
                    Generate
                  </button>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 right-0 bg-[#1b1d30] border border-white/10 rounded-2xl px-6 py-5 shadow-2xl">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-violet-400" />

                  <div>
                    <p className="font-bold text-xl">AI Generated</p>
                    <p className="text-gray-400 text-sm mt-1">
                      612 words • 4.2s
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
