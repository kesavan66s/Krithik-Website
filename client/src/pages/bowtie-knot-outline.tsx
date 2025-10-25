import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function BowTieKnotOutline() {
  // Bow tie knot with closed hollow loops - same as RedStringProgress
  const bowTieKnot = `
    M 1000,65
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
    
    M 1000,65
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
    
    M 1000,65
    L 990,85
    Q 987,95 984,105
    Q 981,115 978,122
    
    M 1000,65  
    L 1010,85
    Q 1013,95 1016,105
    Q 1019,115 1022,122
  `;

  // Key points for annotation
  const keyPoints = [
    { x: 1000, y: 65, label: "Center", color: "hsl(var(--destructive))" },
    { x: 1050, y: 36, label: "Right Loop Apex", color: "hsl(var(--chart-1))" },
    { x: 950, y: 36, label: "Left Loop Apex", color: "hsl(var(--chart-2))" },
    { x: 1022, y: 122, label: "Right Tail End", color: "hsl(var(--chart-3))" },
    { x: 978, y: 122, label: "Left Tail End", color: "hsl(var(--chart-4))" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6" data-testid="page-bowtie-outline">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-primary">🎀 Bow Tie Knot Structure</h1>
        <p className="text-muted-foreground">
          Visual documentation of the Red String of Fate bow tie knot that appears at 100% completion
        </p>
      </div>

      {/* Visual Representation */}
      <Card>
        <CardHeader>
          <CardTitle>Visual Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-background border rounded-lg p-8">
            <svg
              width="100%"
              height="300"
              viewBox="900 -20 200 180"
              className="w-full h-auto"
            >
              {/* Grid background */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--muted))" strokeWidth="0.5" opacity="0.2"/>
                </pattern>
              </defs>
              <rect x="900" y="-20" width="200" height="180" fill="url(#grid)" />

              {/* The bow tie knot */}
              <path
                d={bowTieKnot}
                fill="none"
                stroke="hsl(0 84% 60%)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Key points */}
              {keyPoints.map((point, idx) => (
                <g key={idx}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill={point.color}
                    stroke="white"
                    strokeWidth="1.5"
                  />
                  <text
                    x={point.x}
                    y={point.y - 10}
                    fontSize="10"
                    fill="hsl(var(--foreground))"
                    textAnchor="middle"
                    className="font-semibold"
                  >
                    {point.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </CardContent>
      </Card>

      {/* Component Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Right Loop */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="outline" style={{ backgroundColor: "hsl(var(--chart-1))" }}>1</Badge>
              Right Loop (Hollow)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm font-mono bg-muted p-3 rounded-md overflow-x-auto">
              <div>M 1000,65 <span className="text-muted-foreground">// Start at center</span></div>
              <div>Q 1005,58 1012,50</div>
              <div>Q 1020,42 1030,38</div>
              <div>Q 1040,34 1050,36 <span className="text-muted-foreground">// Apex</span></div>
              <div>Q 1060,38 1068,46</div>
              <div>Q 1076,54 1078,64</div>
              <div>Q 1080,74 1074,82</div>
              <div>Q 1068,90 1058,94</div>
              <div>Q 1048,98 1038,96</div>
              <div>Q 1028,94 1020,88</div>
              <div>Q 1012,82 1008,74</div>
              <div>Q 1004,66 1000,65 <span className="text-muted-foreground">// Close loop</span></div>
            </div>
            <p className="text-sm text-muted-foreground">
              Curves outward right from center, reaches apex at (1050, 36), then returns to center forming a closed hollow loop.
            </p>
          </CardContent>
        </Card>

        {/* Left Loop */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="outline" style={{ backgroundColor: "hsl(var(--chart-2))" }}>2</Badge>
              Left Loop (Hollow)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm font-mono bg-muted p-3 rounded-md overflow-x-auto">
              <div>M 1000,65 <span className="text-muted-foreground">// Start at center</span></div>
              <div>Q 995,58 988,50</div>
              <div>Q 980,42 970,38</div>
              <div>Q 960,34 950,36 <span className="text-muted-foreground">// Apex</span></div>
              <div>Q 940,38 932,46</div>
              <div>Q 924,54 922,64</div>
              <div>Q 920,74 926,82</div>
              <div>Q 932,90 942,94</div>
              <div>Q 952,98 962,96</div>
              <div>Q 972,94 980,88</div>
              <div>Q 988,82 992,74</div>
              <div>Q 996,66 1000,65 <span className="text-muted-foreground">// Close loop</span></div>
            </div>
            <p className="text-sm text-muted-foreground">
              Mirrors the right loop, curving outward left from center, reaches apex at (950, 36), then returns to center.
            </p>
          </CardContent>
        </Card>

        {/* Right Tail */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="outline" style={{ backgroundColor: "hsl(var(--chart-3))" }}>3</Badge>
              Right Tail
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm font-mono bg-muted p-3 rounded-md overflow-x-auto">
              <div>M 1000,65 <span className="text-muted-foreground">// Start at center</span></div>
              <div>L 1010,85 <span className="text-muted-foreground">// Drop down-right</span></div>
              <div>Q 1013,95 1016,105</div>
              <div>Q 1019,115 1022,122 <span className="text-muted-foreground">// Tail end</span></div>
            </div>
            <p className="text-sm text-muted-foreground">
              Extends downward-right from center, curving gently to end at (1022, 122) - ~57px below center.
            </p>
          </CardContent>
        </Card>

        {/* Left Tail */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="outline" style={{ backgroundColor: "hsl(var(--chart-4))" }}>4</Badge>
              Left Tail
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm font-mono bg-muted p-3 rounded-md overflow-x-auto">
              <div>M 1000,65 <span className="text-muted-foreground">// Start at center</span></div>
              <div>L 990,85 <span className="text-muted-foreground">// Drop down-left</span></div>
              <div>Q 987,95 984,105</div>
              <div>Q 981,115 978,122 <span className="text-muted-foreground">// Tail end</span></div>
            </div>
            <p className="text-sm text-muted-foreground">
              Mirrors the right tail, extending downward-left from center to end at (978, 122).
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Design Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>🎯 Design Specifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Key Measurements</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• <strong>Center Point:</strong> (1000, 65)</li>
                <li>• <strong>Loop Width:</strong> ~100px each (left & right)</li>
                <li>• <strong>Loop Height:</strong> ~29px above center</li>
                <li>• <strong>Tail Length:</strong> ~57px below center</li>
                <li>• <strong>Tail Spread:</strong> ~44px total (22px each side)</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Design Features</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• <strong>Symmetry:</strong> Perfect left-right mirror</li>
                <li>• <strong>Hollow Loops:</strong> Each loop closes at center</li>
                <li>• <strong>Integration:</strong> Appends to main string at 100%</li>
                <li>• <strong>Stroke:</strong> 4px width, rounded caps</li>
                <li>• <strong>Color:</strong> Red (#e05555 / hsl(0 84% 60%))</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage */}
      <Card>
        <CardHeader>
          <CardTitle>📝 Implementation Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            This bow tie knot is part of the Red String of Fate progress indicator in <code className="bg-muted px-1.5 py-0.5 rounded">RedStringProgress.tsx</code>.
          </p>
          <div className="bg-muted p-4 rounded-md">
            <code className="text-xs">
              <div>// In RedStringProgress component:</div>
              <div>const isComplete = fillProgress &gt;= 100;</div>
              <div>const fullPath = isComplete ? stringPath + bowTieKnot : stringPath;</div>
            </code>
          </div>
          <p className="text-sm text-muted-foreground">
            The bow tie only appears when reading progress reaches 100%, symbolizing the completion of the reader's journey through the Red String of Fate.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
