import { PolaroidCard } from "./PolaroidCard";

interface PageCandidate {
  id: string;
  title: string;
  slug: string;
  tags: string[];
  mood?: string;
  coverUrl?: string;
  description?: string;
}

interface FateLinksProps {
  currentPageId: string;
  candidates?: PageCandidate[];
  maxLinks?: number;
  onNavigate?: (slug: string) => void;
}

export function FateLinks({
  candidates = [],
  maxLinks = 3,
  onNavigate,
}: FateLinksProps) {
  const displayedCandidates = candidates.slice(0, maxLinks);

  if (displayedCandidates.length === 0) {
    return null;
  }

  return (
    <div className="relative py-12">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kdrama-thread to-transparent" />
      
      <div className="text-center mb-8">
        <h2 className="font-myeongjo text-3xl text-kdrama-ink dark:text-foreground mb-2">
          The Thread Continues...
        </h2>
        <p className="font-noto text-muted-foreground">
          Follow the red string to your next chapter
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        >
          {displayedCandidates.map((_, index) => {
            const startX = 50;
            const startY = 0;
            const endX = (index + 0.5) * (100 / displayedCandidates.length);
            const endY = 100;
            const controlY = 50;

            return (
              <path
                key={index}
                d={`M ${startX} ${startY} Q ${endX} ${controlY} ${endX} ${endY}`}
                stroke="#D7263D"
                strokeWidth="2"
                fill="none"
                opacity="0.3"
                strokeDasharray="4 4"
              />
            );
          })}
        </svg>

        {displayedCandidates.map((candidate) => (
          <div key={candidate.id} className="relative z-10">
            <PolaroidCard
              title={candidate.title}
              coverUrl={candidate.coverUrl}
              mood={candidate.mood}
              tags={candidate.tags}
              description={candidate.description}
              onClick={() => onNavigate?.(candidate.slug)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
