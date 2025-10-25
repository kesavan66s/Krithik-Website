import { Knot } from "../Knot";

export default function KnotExample() {
  return (
    <div className="p-8 bg-kdrama-sky/20 min-h-[200px]">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h3 className="font-myeongjo text-xl text-kdrama-ink mb-4">Knot Sizes</h3>
          <div className="flex items-center gap-6">
            <Knot size="sm" label="Small knot" />
            <Knot size="md" label="Medium knot" />
            <Knot size="lg" label="Large knot" />
          </div>
        </div>
        <div>
          <h3 className="font-myeongjo text-xl text-kdrama-ink mb-4">Knot Tones</h3>
          <div className="flex items-center gap-6">
            <Knot tone="primary" size="lg" label="Primary (Thread)" />
            <Knot tone="gold" size="lg" label="Gold (Lavender)" />
            <Knot tone="muted" size="lg" label="Muted (Sakura)" />
          </div>
        </div>
      </div>
    </div>
  );
}
