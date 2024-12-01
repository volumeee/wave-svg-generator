import { WaveConfig } from "@/lib/types/wave-config";
import { generateWavePath } from "@/lib/utils/wave-generators";

interface WavePreviewProps {
  config: WaveConfig;
}

export function WavePreview({ config }: WavePreviewProps) {
  const wavePath = generateWavePath(config);

  return (
    <div className="aspect-[2/1] w-full bg-[#e0e0e0] p-6 rounded-xl shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]">
      <div className="w-full h-full rounded-lg bg-[#e0e0e0] shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff]">
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
    </div>
  );
}
