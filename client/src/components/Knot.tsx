import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface KnotProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  tone?: "primary" | "gold" | "muted";
  className?: string;
}

const sizeMap = {
  sm: { size: 16, strokeWidth: 2.5 },
  md: { size: 20, strokeWidth: 3 },
  lg: { size: 32, strokeWidth: 3.5 },
};

const toneClasses = {
  primary: "stroke-kdrama-thread fill-kdrama-thread/20",
  gold: "stroke-kdrama-lavender fill-kdrama-lavender/20",
  muted: "stroke-kdrama-sakura/50 fill-kdrama-sakura/10",
};

export function Knot({ size = "md", label, tone = "primary", className = "" }: KnotProps) {
  const { size: svgSize, strokeWidth } = sizeMap[size];
  
  const knotIcon = (
    <svg
      width={svgSize}
      height={svgSize}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${toneClasses[tone]} transition-all duration-180 hover:scale-105 ${className}`}
      aria-label={label || "Knot marker"}
      role="img"
    >
      {/* Decorative knot/loop design */}
      <circle cx="12" cy="12" r="8" strokeWidth={strokeWidth} />
      <path
        d="M 12 4 Q 16 8 12 12 Q 8 8 12 4"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 12 20 Q 8 16 12 12 Q 16 16 12 20"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" className="fill-current" />
    </svg>
  );

  if (label) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-block cursor-help">{knotIcon}</div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-noto text-sm">{label}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return knotIcon;
}
