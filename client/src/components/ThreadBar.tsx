import { useEffect, useState } from "react";
import { Knot } from "./Knot";

interface ThreadBarProps {
  progress: number;
  paused?: boolean;
  milestones?: number[];
  showLabels?: boolean;
  onMilestone?: (milestone: number) => void;
}

export function ThreadBar({
  progress,
  paused = false,
  milestones = [0.25, 0.5, 0.75, 1],
  showLabels = false,
  onMilestone,
}: ThreadBarProps) {
  const [hitMilestones, setHitMilestones] = useState<Set<number>>(new Set());

  useEffect(() => {
    milestones.forEach((m) => {
      if (progress >= m && !hitMilestones.has(m)) {
        setHitMilestones((prev) => new Set(prev).add(m));
        onMilestone?.(m);
      }
    });
  }, [progress, milestones, hitMilestones, onMilestone]);

  // Generate curved path for the thread
  const generateThreadPath = (progressPercent: number, totalWidth: number) => {
    const numWaves = 3; // Number of wave cycles
    const amplitude = 6; // Height of curves
    const points: string[] = [];
    
    // Start point
    points.push(`M 0 0`);
    
    // Generate smooth wave using quadratic bezier curves
    const segmentWidth = totalWidth / (numWaves * 2);
    for (let i = 0; i < numWaves * 2; i++) {
      const x1 = segmentWidth * i;
      const x2 = segmentWidth * (i + 1);
      const y = i % 2 === 0 ? -amplitude : amplitude;
      
      // Control point in the middle of the segment
      const cx = (x1 + x2) / 2;
      
      points.push(`Q ${cx} ${y}, ${x2} 0`);
    }
    
    return points.join(" ");
  };

  return (
    <div
      className="relative w-full h-16 bg-transparent overflow-visible"
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 16"
        preserveAspectRatio="none"
        style={{ overflow: 'visible' }}
      >
        {/* Background thread (faded) */}
        <path
          d={generateThreadPath(100, 100)}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.4"
          className="text-kdrama-sakura/30"
          transform="translate(0, 8)"
          vectorEffect="non-scaling-stroke"
        />
        
        {/* Progress thread (vibrant red) */}
        <path
          d={generateThreadPath(progress * 100, progress * 100)}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className={`text-kdrama-thread transition-all duration-300 ${
            paused ? "opacity-60" : "opacity-100"
          }`}
          transform="translate(0, 8)"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
        />
        
        {/* Milestone knots */}
        {milestones.map((milestone) => {
          const isHit = progress >= milestone;
          const xPos = milestone * 100;
          
          return (
            <g key={milestone} transform={`translate(${xPos}, 8)`}>
              <foreignObject
                x="-8"
                y="-8"
                width="16"
                height="16"
                style={{ overflow: 'visible' }}
              >
                <div className="flex items-center justify-center w-full h-full">
                  <Knot
                    size="sm"
                    tone={isHit ? "primary" : "muted"}
                    className={`transition-all duration-180 ${
                      isHit ? "animate-pulse-gentle" : ""
                    }`}
                  />
                </div>
              </foreignObject>
              {showLabels && (
                <foreignObject
                  x="-20"
                  y="12"
                  width="40"
                  height="20"
                  style={{ overflow: 'visible' }}
                >
                  <div className="flex items-center justify-center w-full">
                    <span className="text-xs text-muted-foreground font-noto whitespace-nowrap">
                      {Math.round(milestone * 100)}%
                    </span>
                  </div>
                </foreignObject>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
