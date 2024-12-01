// lib/types/wave-config.ts
export type WaveType = "smooth" | "sharp" | "abstract";

export interface WaveConfig {
  type: WaveType;
  amplitude: number;
  frequency: number;
  phase: number;
  color: string;
  opacity: number;
  useGradient: boolean;
  gradientColors: [string, string];
  backgroundColor: string;
}

export interface PreviewConfig {
  showGrid: boolean;
  zoom: number;
  pan: { x: number; y: number };
}
