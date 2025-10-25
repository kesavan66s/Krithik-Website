import { FateLinks } from "../FateLinks";

export default function FateLinksExample() {
  const mockCandidates = [
    {
      id: "1",
      title: "Lost in Translation",
      slug: "lost-in-translation",
      tags: ["language", "culture", "misunderstanding"],
      mood: "Bittersweet",
      description: "When words fail but hearts understand...",
    },
    {
      id: "2",
      title: "The Convenience Store Date",
      slug: "convenience-store-date",
      tags: ["late-night", "ramyeon", "companionship"],
      mood: "Cozy",
      description: "Sharing instant noodles at 3 AM became our tradition...",
    },
    {
      id: "3",
      title: "Cherry Blossoms in Yeouido",
      slug: "cherry-blossoms",
      tags: ["spring", "cherry-blossoms", "promises"],
      mood: "Hopeful",
      description: "Under the sakura trees, we made a promise...",
    },
  ];

  return (
    <div className="p-8 bg-gradient-to-b from-kdrama-cream/20 to-kdrama-sky/20 min-h-[600px]">
      <div className="max-w-6xl mx-auto">
        <FateLinks
          currentPageId="current"
          candidates={mockCandidates}
          onNavigate={(slug) => console.log(`Navigate to: ${slug}`)}
        />
      </div>
    </div>
  );
}
