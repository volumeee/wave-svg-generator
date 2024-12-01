// components/wave-preview.tsx
import { WaveConfig } from "@/lib/types/wave-config";
import { generateWavePath } from "@/lib/utils/wave-generators";

interface WavePreviewProps {
  config: WaveConfig;
}

export function WavePreview({ config }: WavePreviewProps) {
  const wavePath = generateWavePath(config);

  return (
    <div className="aspect-[2/1] w-full rounded-3xl overflow-hidden bg-white shadow-lg">
      <svg
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          <filter id="shadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="0" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.2" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d={wavePath}
          fill={config.color}
          fillOpacity={config.opacity / 100}
          filter="url(#shadow)"
          suppressHydrationWarning
        />
      </svg>
    </div>
  );
}
