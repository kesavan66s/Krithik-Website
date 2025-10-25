import { PolaroidCard } from "../PolaroidCard";

export default function PolaroidCardExample() {
  return (
    <div className="p-8 bg-kdrama-cream/20 min-h-[400px]">
      <div className="max-w-4xl mx-auto">
        <h3 className="font-myeongjo text-2xl text-kdrama-ink mb-6">Polaroid Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PolaroidCard
            title="First Meeting Under the Rain"
            mood="Romantic"
            tags={["destiny", "umbrella", "seoul"]}
            description="The moment our paths crossed on that rainy evening..."
            onClick={() => console.log("Card clicked")}
          />
          <PolaroidCard
            title="Coffee Shop Confessions"
            mood="Sweet"
            tags={["coffee", "confession", "heartfelt"]}
            description="Words unspoken finally found their way out..."
          />
          <PolaroidCard
            title="Sunset at Han River"
            mood="Peaceful"
            tags={["sunset", "han-river", "reflection"]}
            description="Watching the sun set, we talked about everything and nothing..."
          />
        </div>
      </div>
    </div>
  );
}
