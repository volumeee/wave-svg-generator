import { WaveGenerator } from "@/components/wave-generators";
import { TwitterIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#e0e0e0]">
      {/* Top Banner */}
      <div className="bg-[#001524] text-white p-4 text-center lg:text-base md:text-sm text-[10px]">
        <p>
          Get Waves is now a part of{" "}
          <span className="underline">github.com/volumeee</span>. Try it out for
          free!
        </p>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="text-gray-700 font-medium lg:text-base md:text-sm text-sm">
            Made by volumeee
          </div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#e0e0e0] shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] transition-all text-gray-700">
            <span>Share</span>
            <TwitterIcon size={16} />
          </button>
        </div>

        <h1 className="text-5xl font-bold text-center mb-12 text-gray-800">
          Make some waves!
        </h1>

        <WaveGenerator />
      </main>
    </div>
  );
}
