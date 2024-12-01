// components/wave-controls.tsx
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { WaveConfig } from "@/lib/types/wave-config";
import { AudioWaveform, Copy, Download } from "lucide-react";
import toast from "react-hot-toast";
import { generateWavePath } from "@/lib/utils/wave-generators";

interface WaveControlsProps {
  config: WaveConfig;
  onConfigChange: (config: WaveConfig) => void;
}

export function WaveControls({ config, onConfigChange }: WaveControlsProps) {
  const waveTypes = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            fillRule="nonzero"
            stroke="currentcolor"
            strokeLinecap="round"
            strokeWidth="2"
            d="M1 13.04l1.222 2.586c1.222 2.634 3.667 5.757 6.111 3.779 2.445-1.979 3.89-13.01 7.334-14.988 2.296-1.32 4.74 1.485 7.333 8.412"
          />
        </svg>
      ),
      value: "smooth",
      style: "hover:bg-blue-100 transition-colors duration-200",
      label: "Smooth",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            fillRule="nonzero"
            stroke="currentcolor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 20L8 20 8 4 16 4 16 13.5172414 23 13.5172414"
          />
        </svg>
      ),
      value: "sharp",
      style: "hover:bg-blue-100 transition-colors duration-200",
      label: "Sharp",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            fillRule="nonzero"
            stroke="currentcolor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 13.3142857L8 20 16 4 23 11.8857143"
          />
        </svg>
      ),
      value: "abstract",
      style: "hover:bg-blue-100 transition-colors duration-200",
      label: "Abstract",
    },
  ];

  const generateSVGCode = () => {
    const wavePath = generateWavePath(config);
    return `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      ${
        config.useGradient
          ? `<defs>
            <linearGradient id="wave-gradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stop-color="${config.gradientColors[0]}" />
              <stop offset="100%" stop-color="${config.gradientColors[1]}" />
            </linearGradient>
          </defs>`
          : ""
      }
      <path
        d="${wavePath}"
        fill="${config.useGradient ? "url(#wave-gradient)" : config.color}"
        fill-opacity="${config.opacity / 100}"
      />
    </svg>`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateSVGCode());
      toast.success("SVG code copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy SVG code");
    }
  };

  const downloadSVG = () => {
    try {
      const blob = new Blob([generateSVGCode()], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "wave.svg";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("SVG file downloaded successfully!");
    } catch (err) {
      toast.error("Failed to download SVG file");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Wave Type Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Wave Type</label>
        <div className="flex flex-wrap gap-2">
          {waveTypes.map((type) => (
            <Button
              key={type.value}
              variant={config.type === type.value ? "default" : "outline"}
              onClick={() =>
                onConfigChange({
                  ...config,
                  type: type.value as WaveConfig["type"],
                })
              }
              className="flex items-center gap-2 text-xs md:text-sm"
            >
              <span className="w-4 h-4 md:w-5 md:h-5">{type.icon}</span>
              <span className="hidden sm:inline">{type.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Wave Parameters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Amplitude</label>
          <div className="flex items-center gap-2">
            <Slider
              value={[config.amplitude]}
              onValueChange={([value]) =>
                onConfigChange({ ...config, amplitude: value })
              }
              min={0}
              max={200}
              step={1}
              className="w-full"
            />
            <span className="text-xs md:text-sm w-12">
              {config.amplitude}px
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Frequency</label>
          <div className="flex items-center gap-2">
            <Slider
              value={[config.frequency]}
              onValueChange={([value]) =>
                onConfigChange({ ...config, frequency: value })
              }
              min={0.5}
              max={10}
              step={0.5}
              className="w-full"
            />
            <span className="text-sm w-12">{config.frequency}x</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Phase</label>
          <div className="flex items-center gap-2">
            <Slider
              value={[config.phase]}
              onValueChange={([value]) =>
                onConfigChange({ ...config, phase: value })
              }
              min={0}
              max={Math.PI * 2}
              step={0.1}
              className="w-full"
            />
            <span className="text-sm w-12">{config.phase.toFixed(1)}</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Opacity</label>
          <div className="flex items-center gap-2">
            <Slider
              value={[config.opacity]}
              onValueChange={([value]) =>
                onConfigChange({ ...config, opacity: value })
              }
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
            <span className="text-sm w-12">{config.opacity}%</span>
          </div>
        </div>
      </div>

      {/* Color Controls */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Color</label>
        <div className="flex flex-wrap items-center gap-4">
          <input
            type="color"
            value={config.color}
            onChange={(e) =>
              onConfigChange({ ...config, color: e.target.value })
            }
            className="w-8 h-8 md:w-10 md:h-10 rounded cursor-pointer"
          />
          <input
            type="text"
            value={config.color.toUpperCase()}
            onChange={(e) =>
              onConfigChange({ ...config, color: e.target.value })
            }
            className="px-2 md:px-3 py-1 border rounded w-24 md:w-28 text-xs md:text-sm"
          />
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex flex-wrap gap-2 pt-4">
        <Button
          variant="outline"
          className="flex items-center gap-2 text-xs md:text-sm"
          onClick={copyToClipboard}
        >
          <Copy className="w-3 h-3 md:w-4 md:h-4" />
          Copy SVG
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 text-xs md:text-sm"
          onClick={downloadSVG}
        >
          <Download className="w-3 h-3 md:w-4 md:h-4" />
          Download SVG
        </Button>
      </div>
    </div>
  );
}
