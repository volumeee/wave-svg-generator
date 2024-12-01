// app/page.tsx
import { WaveGenerator } from "@/components/wave-generators";
import { TwitterIcon } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#001524] text-white p-4 text-center">
        <p>
          Get Waves is now a part of{" "}
          <span className="underline">github.com/volumeee</span>. Try it out for
          free!
        </p>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>Made by volumeee</div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border">
            <span>Share</span>
            <TwitterIcon size={16} />
          </button>
        </div>

        <h1 className="text-5xl font-bold text-center mb-12">
          Make some waves!
        </h1>

        <WaveGenerator />
      </main>
    </>
  );
}
