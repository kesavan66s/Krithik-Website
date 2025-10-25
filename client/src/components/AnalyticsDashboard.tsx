import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Clock, TrendingUp, Users } from "lucide-react";
import { Knot } from "./Knot";

interface PageView {
  id: string;
  startedAt: Date;
  endedAt?: Date;
  activeMs: number;
  maxScrollPct: number;
  completionMilestone?: 0 | 25 | 50 | 75 | 100;
  isReread: boolean;
}

interface AnalyticsDashboardProps {
  pageViews?: PageView[];
  totalVisitors?: number;
  avgActiveTime?: number;
  avgCompletion?: number;
}

export function AnalyticsDashboard({
  pageViews = [],
  totalVisitors = 0,
  avgActiveTime = 0,
  avgCompletion = 0,
}: AnalyticsDashboardProps) {
  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-noto font-medium">Total Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-myeongjo font-bold">{totalVisitors}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-noto font-medium">Avg. Read Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-myeongjo font-bold">
              {formatDuration(avgActiveTime)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-noto font-medium">Avg. Completion</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-myeongjo font-bold">{avgCompletion}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-noto font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-myeongjo font-bold">{pageViews.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-myeongjo">Reading Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pageViews.slice(0, 5).map((view) => (
              <div
                key={view.id}
                className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg"
                data-testid={`view-${view.id}`}
              >
                <Knot
                  size="md"
                  tone={view.completionMilestone === 100 ? "primary" : "muted"}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-noto text-sm">
                      {view.startedAt.toLocaleString()}
                    </span>
                    {view.isReread && (
                      <Badge variant="secondary" className="text-xs font-noto">
                        Re-read
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground font-noto">
                    <span>Active: {formatDuration(view.activeMs)}</span>
                    <span>Scroll: {view.maxScrollPct}%</span>
                    {view.completionMilestone !== undefined && (
                      <span>Completion: {view.completionMilestone}%</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
