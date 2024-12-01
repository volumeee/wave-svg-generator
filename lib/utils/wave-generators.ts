// lib/utils/wave-generators.ts
import { WaveConfig } from "@/lib/types/wave-config";

export function generateWavePath(config: WaveConfig): string {
  const { type, amplitude, frequency, phase } = config;
  const width = 1200;
  const height = 600;
  const points: [number, number][] = [];

  switch (type) {
    case "smooth": {
      const steps = Math.floor(width / (5 / frequency));
      for (let i = 0; i <= steps; i++) {
        const x = (i / steps) * width;
        const normalizedX = (x / width) * (2 * Math.PI * frequency) + phase;
        const y = height / 2 + amplitude * Math.sin(normalizedX);
        points.push([x, y]);
      }
      break;
    }

    case "sharp": {
      const steps = Math.floor(width / (50 / frequency));
      for (let i = 0; i <= steps; i++) {
        const x = (i / steps) * width;
        const normalizedX = (x / width) * (2 * Math.PI * frequency) + phase;
        const y = height / 2 + amplitude * Math.sign(Math.sin(normalizedX));
        points.push([x, y]);

        if (
          i < steps &&
          Math.sin(normalizedX) * Math.sin(normalizedX + 0.1) <= 0
        ) {
          points.push([
            x,
            height / 2 + amplitude * Math.sign(Math.sin(normalizedX + Math.PI)),
          ]);
        }
      }
      break;
    }

    case "abstract": {
      const segments = Math.floor(4 * frequency);
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * width;
        const heightVariation = amplitude * (0.5 + Math.random());
        const y = height / 2 + (i % 2 ? heightVariation : -heightVariation);
        points.push([x, y]);
      }
      break;
    }
  }

  // Create SVG path
  const pathCommands = points.map((point, i) => {
    if (i === 0) return `M ${point[0]},${point[1]}`;

    if (type === "smooth") {
      const prevPoint = points[i - 1];
      const cp1x = prevPoint[0] + (point[0] - prevPoint[0]) / 2;
      const cp2x = point[0] - (point[0] - prevPoint[0]) / 2;
      const cp1y = prevPoint[1] + (point[1] - prevPoint[1]) * 0.25;
      const cp2y = point[1] - (point[1] - prevPoint[1]) * 0.25;
      return `C ${cp1x},${cp1y} ${cp2x},${cp2y} ${point[0]},${point[1]}`;
    } else if (type === "sharp") {
      return `L ${point[0]},${point[1]}`;
    } else {
      if (i === 1) return `L ${point[0]},${point[1]}`;
      const prevPoint = points[i - 1];
      const cpx = (prevPoint[0] + point[0]) / 2;
      const cpy = point[1];
      return `Q ${cpx},${cpy} ${point[0]},${point[1]}`;
    }
  });

  pathCommands.push(`L ${width},${height}`);
  pathCommands.push(`L 0,${height}`);
  pathCommands.push("Z");

  return pathCommands.join(" ");
}
