// components/wave-generator.tsx
"use client";

import { useState } from "react";
import { WaveControls } from "@/components/config/config-panel";
import { WavePreview } from "@/components/preview/wave-preview";
import { WaveConfig } from "@/lib/types/wave-config";

const defaultConfig: WaveConfig = {
  type: "smooth",
  amplitude: 50,
  frequency: 2,
  phase: 0,
  color: "#0099ff",
  opacity: 100,
  useGradient: false,
  gradientColors: ["#0099ff", "#0066ff"],
  backgroundColor: "#ffffff",
};

export function WaveGenerator() {
  const [config, setConfig] = useState<WaveConfig>(defaultConfig);

  return (
    <div className="space-y-8">
      <WaveControls config={config} onConfigChange={setConfig} />
      <WavePreview config={config} />
    </div>
  );
}
