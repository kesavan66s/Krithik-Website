import { useEffect, useState, useRef } from "react";

interface RedStringProgressProps {
  currentPage: number;
  totalPages: number;
  sectionTitle?: string;
  initialProgress?: number;
  className?: string;
}

export function RedStringProgress({ 
  currentPage, 
  totalPages, 
  initialProgress = 0,
  className = "" 
}: RedStringProgressProps) {
  const [fillProgress, setFillProgress] = useState(0);
  const [pathLength, setPathLength] = useState(1000);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const appliedInitialProgressRef = useRef<number | null>(null);
  const previousProgressRef = useRef(0);
  
  const pathRef = useRef<SVGPathElement>(null);

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Initialize from saved progress
  useEffect(() => {
    if (appliedInitialProgressRef.current !== initialProgress) {
      if (initialProgress > 0) {
        setFillProgress(initialProgress);
        previousProgressRef.current = initialProgress;
      }
      appliedInitialProgressRef.current = initialProgress;
      setIsInitialized(true);
    }
  }, [initialProgress]);

  // Calculate progress percentage
  useEffect(() => {
    if (!isInitialized) return;

    const progress = totalPages > 0 ? (currentPage / totalPages) * 100 : 0;
    const clampedProgress = Math.min(100, Math.max(0, progress));
    
    if (clampedProgress === previousProgressRef.current) return;
    
    setFillProgress(clampedProgress);
    previousProgressRef.current = clampedProgress;
  }, [currentPage, totalPages, isInitialized]);

  // Calculate actual path length for accurate fill animation
  // Recalculate when bow tie is added at 90% threshold
  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
    }
  }, [fillProgress >= 90]); // Recalculate when bow tie is added to fillPath

  // Wavy string with three vertical teardrop loops rising from baseline
  const stringPath = `
    M 20,65
    Q 60,67 100,65
    Q 140,63 170,65
    
    Q 172,62 174,55
    Q 176,45 178,35
    Q 180,20 185,10
    Q 190,-5 198,-12
    Q 206,-19 216,-20
    Q 226,-21 236,-17
    Q 246,-13 254,-4
    Q 262,5 267,17
    Q 272,29 274,42
    Q 276,55 274,68
    Q 272,81 266,91
    Q 260,101 250,106
    Q 240,111 228,110
    Q 216,109 206,102
    Q 196,95 189,84
    Q 182,73 178,60
    Q 174,47 172,34
    Q 170,21 172,10
    Q 174,-1 180,-10
    Q 186,-19 194,-24
    Q 202,-29 212,-30
    Q 222,-31 232,-27
    Q 242,-23 250,-15
    Q 258,-7 263,3
    Q 268,13 270,25
    Q 272,37 271,49
    Q 270,61 265,71
    Q 260,81 252,88
    Q 244,95 250,80
    Q 260,68 280,65
    Q 330,65 380,65
    Q 430,65 470,65
    Q 472,65 474,60
    
    Q 476,50 478,40
    Q 480,25 485,15
    Q 490,8 498,3
    Q 506,0 516,0
    Q 526,0 536,6
    Q 546,14 554,24
    Q 562,34 567,46
    Q 572,58 574,71
    Q 576,84 574,96
    Q 572,108 566,117
    Q 560,126 550,130
    Q 540,134 528,132
    Q 516,130 506,123
    Q 496,116 489,105
    Q 482,94 478,81
    Q 474,68 474,55
    Q 474,42 478,31
    Q 482,20 490,12
    Q 498,4 508,1
    Q 518,0 528,2
    Q 538,4 548,10
    Q 558,16 565,25
    Q 572,34 576,45
    Q 580,56 586,65
    Q 600,65 650,65
    Q 650,65 690,65
    Q 730,65 760,65
    Q 762,65 764,60
    
    Q 766,50 768,40
    Q 770,28 775,18
    Q 780,4 788,-3
    Q 796,-10 806,-12
    Q 816,-12 826,-8
    Q 836,0 844,9
    Q 852,18 857,30
    Q 862,42 864,55
    Q 866,68 864,81
    Q 862,94 856,104
    Q 850,114 840,119
    Q 830,124 818,123
    Q 806,122 796,115
    Q 786,108 779,97
    Q 772,86 768,73
    Q 764,60 764,47
    Q 764,34 768,23
    Q 772,12 780,4
    Q 788,-4 798,-8
    Q 808,-12 818,-11
    Q 828,-10 838,-4
    Q 848,2 855,11
    Q 862,20 866,31
    Q 870,42 876,54
    Q 882,60 890,65
    Q 920,65 960,65
    Q 980,65 1000,65
  `;

  // Bow tie knot as one continuous path - connects right loop → left loop → left tail → right tail
  const bowTieKnot = `
    Q 1005,58 1012,50
    Q 1020,42 1030,38
    Q 1040,34 1050,36
    Q 1060,38 1068,46
    Q 1076,54 1078,64
    Q 1080,74 1074,82
    Q 1068,90 1058,94
    Q 1048,98 1038,96
    Q 1028,94 1020,88
    Q 1012,82 1008,74
    Q 1004,66 1000,65
    
    Q 995,58 988,50
    Q 980,42 970,38
    Q 960,34 950,36
    Q 940,38 932,46
    Q 924,54 922,64
    Q 920,74 926,82
    Q 932,90 942,94
    Q 952,98 962,96
    Q 972,94 980,88
    Q 988,82 992,74
    Q 996,66 1000,65
    
    L 990,85
    Q 987,95 984,105
    Q 981,115 978,122
    
    L 1000,65
    L 1010,85
    Q 1013,95 1016,105
    Q 1019,115 1022,122
  `;

  // Always include bow tie in outline, but only in fill when progress is high
  const outlinePath = stringPath + bowTieKnot;
  const fillPath = fillProgress >= 90 ? stringPath + bowTieKnot : stringPath;
  
  const dashOffset = pathLength - (pathLength * fillProgress / 100);

  return (
    <div 
      className={`w-full ${className}`} 
      data-testid="red-string-progress"
      role="progressbar"
      aria-valuenow={Math.round(fillProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Reading progress: ${Math.round(fillProgress)}% complete`}
    >
      <svg
        width="100%"
        height="220"
        viewBox="0 -50 1200 220"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Shadow for 3D effect */}
          <filter id="string-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
            <feOffset dx="0.5" dy="1.5" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.25" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Vivid red gradient for filled portion */}
          <linearGradient id="filled-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff3355" stopOpacity="1" />
            <stop offset="50%" stopColor="#d7283e" stopOpacity="1" />
            <stop offset="100%" stopColor="#b01f30" stopOpacity="1" />
          </linearGradient>

          {/* Very subtle ghost outline */}
          <linearGradient id="outline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffcccc" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#ffb3b3" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ff9999" stopOpacity="0.08" />
          </linearGradient>

        </defs>

        {/* Semi-transparent outline showing full path including bow tie (always visible) */}
        <path
          d={outlinePath}
          fill="none"
          stroke="url(#outline-gradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Vivid red filled portion (animates left to right, bow tie only appears at 90%+) */}
        <g filter="url(#string-shadow)">
          <path
            ref={pathRef}
            d={fillPath}
            fill="none"
            stroke="url(#filled-gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={pathLength}
            strokeDashoffset={dashOffset}
            style={{ 
              transition: prefersReducedMotion ? 'none' : 'stroke-dashoffset 0.6s ease-out',
            }}
          />
        </g>

      </svg>
    </div>
  );
}
