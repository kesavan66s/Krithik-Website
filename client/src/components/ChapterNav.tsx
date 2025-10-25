import { ChevronRight } from "lucide-react";
import { Knot } from "./Knot";
import { Card } from "@/components/ui/card";

interface Chapter {
  id: string;
  title: string;
  emoji?: string;
  order: number;
  isPublic: boolean;
  pageCount?: number;
}

interface ChapterNavProps {
  chapters: Chapter[];
  activeChapterId?: string;
  onChapterClick?: (chapterId: string) => void;
}

export function ChapterNav({ chapters, activeChapterId, onChapterClick }: ChapterNavProps) {
  return (
    <div className="space-y-2">
      {chapters.map((chapter, index) => (
        <div key={chapter.id}>
          {index > 0 && (
            <div className="flex items-center justify-center py-2">
              <Knot size="sm" tone="muted" />
            </div>
          )}
          <Card
            className={`p-4 hover-elevate cursor-pointer transition-all duration-180 ${
              activeChapterId === chapter.id
                ? "bg-kdrama-sakura/10 dark:bg-kdrama-sakura/5 border-kdrama-thread"
                : ""
            }`}
            onClick={() => onChapterClick?.(chapter.id)}
            data-testid={`card-chapter-${chapter.id}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {chapter.emoji && (
                  <span className="text-2xl" role="img" aria-label="chapter emoji">
                    {chapter.emoji}
                  </span>
                )}
                <div>
                  <h3 className="font-myeongjo font-bold text-kdrama-ink dark:text-foreground">
                    {chapter.title}
                  </h3>
                  {chapter.pageCount !== undefined && (
                    <p className="font-noto text-xs text-muted-foreground">
                      {chapter.pageCount} {chapter.pageCount === 1 ? "page" : "pages"}
                    </p>
                  )}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}
