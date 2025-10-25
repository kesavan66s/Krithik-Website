import { AnalyticsDashboard } from "../AnalyticsDashboard";

export default function AnalyticsDashboardExample() {
  const mockPageViews = [
    {
      id: "1",
      startedAt: new Date("2024-03-15T14:30:00"),
      endedAt: new Date("2024-03-15T14:35:00"),
      activeMs: 240000,
      maxScrollPct: 100,
      completionMilestone: 100 as const,
      isReread: false,
    },
    {
      id: "2",
      startedAt: new Date("2024-03-16T10:15:00"),
      endedAt: new Date("2024-03-16T10:20:00"),
      activeMs: 180000,
      maxScrollPct: 75,
      completionMilestone: 75 as const,
      isReread: false,
    },
    {
      id: "3",
      startedAt: new Date("2024-03-17T16:45:00"),
      endedAt: new Date("2024-03-17T16:52:00"),
      activeMs: 300000,
      maxScrollPct: 100,
      completionMilestone: 100 as const,
      isReread: true,
    },
  ];

  return (
    <div className="p-8 bg-kdrama-sky/10 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-myeongjo text-3xl text-kdrama-ink mb-6">
          Page Analytics
        </h2>
        <AnalyticsDashboard
          pageViews={mockPageViews}
          totalVisitors={156}
          avgActiveTime={220000}
          avgCompletion={82}
        />
      </div>
    </div>
  );
}
