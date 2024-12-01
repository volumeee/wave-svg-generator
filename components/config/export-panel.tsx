// components/config/export-panel.tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { WaveConfig } from "@/lib/types/wave-config";
import { generateWavePath } from "@/lib/utils/wave-generators";

interface ExportPanelProps {
  config: WaveConfig;
}

export function ExportPanel({ config }: ExportPanelProps) {
  const generateSVGCode = () => {
    const wavePath = generateWavePath(config);
    return `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  ${
    config.useGradient
      ? `
  <defs>
    <linearGradient id="wave-gradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="${config.gradientColors[0]}" />
      <stop offset="100%" stop-color="${config.gradientColors[1]}" />
    </linearGradient>
  </defs>
  `
      : ""
  }
  <path
    d="${wavePath}"
    fill="${config.useGradient ? "url(#wave-gradient)" : config.color}"
    fill-opacity="${config.opacity / 100}"
  />
</svg>`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateSVGCode());
  };

  const downloadSVG = () => {
    const blob = new Blob([generateSVGCode()], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wave.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Export</h3>
      <div className="space-y-4">
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{generateSVGCode()}</code>
        </pre>
        <div className="flex gap-4">
          <Button onClick={copyToClipboard}>Copy SVG</Button>
          <Button onClick={downloadSVG}>Download SVG</Button>
        </div>
      </div>
    </Card>
  );
}
