import { ChapterNav } from "../ChapterNav";
import { useState } from "react";

export default function ChapterNavExample() {
  const [activeId, setActiveId] = useState("ch2");

  const mockChapters = [
    {
      id: "ch1",
      title: "The Beginning",
      emoji: "🌸",
      order: 1,
      isPublic: true,
      pageCount: 5,
    },
    {
      id: "ch2",
      title: "Unexpected Encounters",
      emoji: "☂️",
      order: 2,
      isPublic: true,
      pageCount: 8,
    },
    {
      id: "ch3",
      title: "Growing Closer",
      emoji: "💜",
      order: 3,
      isPublic: true,
      pageCount: 12,
    },
    {
      id: "ch4",
      title: "Challenges & Revelations",
      emoji: "⚡",
      order: 4,
      isPublic: true,
      pageCount: 6,
    },
  ];

  return (
    <div className="p-8 bg-kdrama-lavender/10 min-h-[500px]">
      <div className="max-w-md mx-auto">
        <h3 className="font-myeongjo text-2xl text-kdrama-ink mb-6">Chapters</h3>
        <ChapterNav
          chapters={mockChapters}
          activeChapterId={activeId}
          onChapterClick={(id) => {
            setActiveId(id);
            console.log(`Chapter clicked: ${id}`);
          }}
        />
      </div>
    </div>
  );
}
