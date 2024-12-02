import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { WaveConfig } from "@/lib/types/wave-config";
import { Copy, Download } from "lucide-react";
import toast from "react-hot-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { generateWavePath } from "@/lib/utils/wave-generators";

interface WaveControlsProps {
  config: WaveConfig;
  onConfigChange: (config: WaveConfig) => void;
}

export function WaveControls({ config, onConfigChange }: WaveControlsProps) {
  const waveTypes = [
    {
      icon: (
        <path d="M1 13.04l1.222 2.586c1.222 2.634 3.667 5.757 6.111 3.779 2.445-1.979 3.89-13.01 7.334-14.988 2.296-1.32 4.74 1.485 7.333 8.412" />
      ),
      value: "smooth",
    },
    {
      icon: <path d="M1 20L8 20 8 4 16 4 16 13.5172414 23 13.5172414" />,
      value: "sharp",
    },
    {
      icon: <path d="M1 13.3142857L8 20 16 4 23 11.8857143" />,
      value: "abstract",
    },
  ];

  const handleSVGAction = async (action: "copy" | "download") => {
    const svgCode = `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      ${
        config.useGradient
          ? `<defs><linearGradient id="wave-gradient" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="${config.gradientColors[0]}" /><stop offset="100%" stop-color="${config.gradientColors[1]}" />
      </linearGradient></defs>`
          : ""
      }
      <path d="${generateWavePath(config)}" fill="${
      config.useGradient ? "url(#wave-gradient)" : config.color
    }" fill-opacity="${config.opacity / 100}"/>
    </svg>`;

    try {
      if (action === "copy") {
        await navigator.clipboard.writeText(svgCode);
        toast.success("Copied!");
      } else {
        const blob = new Blob([svgCode], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "wave.svg";
        a.click();
        URL.revokeObjectURL(url);
        toast.success("Downloaded!");
      }
    } catch {
      toast.error(`Failed to ${action}`);
    }
  };

  const controls = [
    {
      label: "Amplitude",
      value: config.amplitude,
      min: 0,
      max: 200,
      step: 1,
      suffix: "px",
    },
    {
      label: "Frequency",
      value: config.frequency,
      min: 0.5,
      max: 10,
      step: 0.5,
      suffix: "x",
    },
    {
      label: "Phase",
      value: config.phase,
      min: 0,
      max: Math.PI * 2,
      step: 0.1,
    },
    {
      label: "Opacity",
      value: config.opacity,
      min: 0,
      max: 100,
      step: 1,
      suffix: "%",
    },
  ];

  return (
    <div className="bg-[#e0e0e0] p-6 space-y-4 rounded-xl shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]">
      <div className="flex gap-2 justify-center">
        {waveTypes.map(({ value, icon }) => (
          <TooltipProvider key={value}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant={config.type === value ? "ghost" : "ghost"}
                  onClick={() =>
                    onConfigChange({
                      ...config,
                      type: value as WaveConfig["type"],
                    })
                  }
                  className={`p-3 rounded-lg ${
                    config.type === value
                      ? "bg-[#e0e0e0] shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff]"
                      : "bg-[#e0e0e0] shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff]"
                  } transition-all`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                  >
                    {icon}
                  </svg>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-white">
                <p className="capitalize">{value} Wave</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>

      <div className="grid gap-4">
        <div className="flex flex-wrap gap-4">
          {controls.map(
            ({ label, value, min, max, step, suffix = "" }, index) => (
              <div key={label} className="flex-1 min-w-[calc(50%-0.5rem)]">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-[#e0e0e0] shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff]">
                        <span className="text-sm w-20 text-gray-700">
                          {label}
                        </span>
                        <Slider
                          value={[value]}
                          onValueChange={([v]) =>
                            onConfigChange({
                              ...config,
                              [label.toLowerCase()]: v,
                            })
                          }
                          min={min}
                          max={max}
                          step={step}
                          className="flex-1"
                        />
                        <span className="text-sm w-16 text-right text-gray-700">
                          {value.toFixed(1)}
                          {suffix}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white">
                      <p>Adjust {label.toLowerCase()}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-3 rounded-lg bg-[#e0e0e0] shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff]">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <input
                  type="color"
                  value={config.color}
                  onChange={(e) =>
                    onConfigChange({ ...config, color: e.target.value })
                  }
                  className="w-10 h-10 rounded-lg cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent className="bg-white">
                <p>Pick a color</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <input
                  type="text"
                  value={config.color.toUpperCase()}
                  onChange={(e) =>
                    onConfigChange({ ...config, color: e.target.value })
                  }
                  className="px-3 py-2 text-sm rounded-lg bg-[#e0e0e0] shadow-[inset_3px_3px_6px_#bebebe,inset_-3px_-3px_6px_#ffffff] border-none flex-1 sm:w-32"
                />
              </TooltipTrigger>
              <TooltipContent className="bg-white">
                <p>Enter color code</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex gap-2 mt-3 sm:mt-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleSVGAction("copy")}
                  className="p-3 rounded-lg bg-[#e0e0e0] shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] transition-all"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-white">
                <p>Copy SVG</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleSVGAction("download")}
                  className="p-3 rounded-lg bg-[#e0e0e0] shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] transition-all"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-white">
                <p>Download SVG</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}