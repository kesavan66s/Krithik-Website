import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { Book, BookOpen, FileText, Users, TrendingUp, Eye } from "lucide-react";

interface AnalyticsData {
  overview: {
    totalChapters: number;
    totalSections: number;
    totalPages: number;
    totalReaders: number;
  };
  chapterCompletion: Array<{
    chapterId: string;
    chapterTitle: string;
    totalSections: number;
    completedCount: number;
    completionRate: number;
  }>;
  sectionViews: Array<{
    sectionId: string;
    sectionTitle: string;
    chapterTitle: string;
    viewCount: number;
    avgDuration: number;
  }>;
  activityTimeline: Array<{
    date: string;
    viewCount: number;
    uniqueReaders: number;
  }>;
}

export function AnalyticsDashboard() {
  const { data: analytics, isLoading } = useQuery<AnalyticsData>({
    queryKey: ["/api/analytics/dashboard"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="font-noto text-muted-foreground">Loading analytics...</p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="font-noto text-muted-foreground">No analytics data available</p>
      </div>
    );
  }

  const CHART_COLORS = ['#E63946', '#F4A6B3', '#C7B8EA', '#A8DADC', '#457B9D'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-myeongjo text-2xl font-bold text-kdrama-ink dark:text-foreground">
          Analytics Dashboard
        </h2>
        <p className="font-noto text-sm text-muted-foreground mt-1">
          View engagement metrics across all chapters and sections
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="font-noto text-sm font-medium">Total Chapters</CardTitle>
            <Book className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-myeongjo text-2xl font-bold text-kdrama-thread">
              {analytics.overview.totalChapters}
            </div>
            <p className="font-noto text-xs text-muted-foreground">
              Published chapters
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="font-noto text-sm font-medium">Total Sections</CardTitle>
            <BookOpen className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-myeongjo text-2xl font-bold text-kdrama-thread">
              {analytics.overview.totalSections}
            </div>
            <p className="font-noto text-xs text-muted-foreground">
              Content sections
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="font-noto text-sm font-medium">Total Pages</CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-myeongjo text-2xl font-bold text-kdrama-thread">
              {analytics.overview.totalPages}
            </div>
            <p className="font-noto text-xs text-muted-foreground">
              Content pages
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="font-noto text-sm font-medium">Total Readers</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-myeongjo text-2xl font-bold text-kdrama-thread">
              {analytics.overview.totalReaders}
            </div>
            <p className="font-noto text-xs text-muted-foreground">
              Active users
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chapter Completion Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="font-myeongjo flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-kdrama-thread" />
            Chapter Completion Rates
          </CardTitle>
          <CardDescription className="font-noto">
            Percentage of readers who completed each chapter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.chapterCompletion}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="chapterTitle"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
                labelStyle={{ fontFamily: "Nanum Myeongjo" }}
                formatter={(value: number) => [`${value.toFixed(1)}%`, "Completion Rate"]}
              />
              <Bar dataKey="completionRate" fill="#E63946" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Section Views Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="font-myeongjo flex items-center gap-2">
            <Eye className="w-5 h-5 text-kdrama-thread" />
            Section Engagement by Views
          </CardTitle>
          <CardDescription className="font-noto">
            Most-read sections across all chapters
          </CardDescription>
        </CardHeader>
        <CardContent>
          {analytics.sectionViews.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={analytics.sectionViews.slice(0, 10)}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  type="number"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="sectionTitle"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  width={150}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                  labelStyle={{ fontFamily: "Nanum Myeongjo" }}
                  formatter={(value: number, name: string) => {
                    if (name === "viewCount") return [value, "Views"];
                    return [value, name];
                  }}
                  labelFormatter={(label: string, payload: any[]) => {
                    const item = payload[0]?.payload;
                    if (item) {
                      return `${item.sectionTitle} (${item.chapterTitle})`;
                    }
                    return label;
                  }}
                />
                <Bar dataKey="viewCount" fill="#C7B8EA" radius={[0, 4, 4, 0]}>
                  {analytics.sectionViews.slice(0, 10).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="font-noto text-sm text-muted-foreground text-center py-8">
              No section views yet
            </p>
          )}
        </CardContent>
      </Card>

      {/* Activity Timeline Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="font-myeongjo flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-kdrama-thread" />
            Reading Activity Over Time
          </CardTitle>
          <CardDescription className="font-noto">
            Daily reading patterns for all content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.activityTimeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
                labelStyle={{ fontFamily: "Nanum Myeongjo" }}
              />
              <Legend wrapperStyle={{ fontFamily: "Noto Sans KR" }} />
              <Line
                type="monotone"
                dataKey="viewCount"
                stroke="#E63946"
                strokeWidth={2}
                name="Page Views"
                dot={{ fill: "#E63946" }}
              />
              <Line
                type="monotone"
                dataKey="uniqueReaders"
                stroke="#C7B8EA"
                strokeWidth={2}
                name="Unique Readers"
                dot={{ fill: "#C7B8EA" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
