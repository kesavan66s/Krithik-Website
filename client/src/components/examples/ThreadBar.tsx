import { useState, useEffect } from "react";
import { ThreadBar } from "../ThreadBar";

export default function ThreadBarExample() {
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        setProgress((prev) => (prev >= 1 ? 0 : prev + 0.01));
      }
    }, 100);
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <div className="p-8 bg-kdrama-cream/30 min-h-[200px]">
      <div className="max-w-2xl mx-auto space-y-6">
        <h3 className="font-myeongjo text-2xl text-kdrama-ink">Thread Progress</h3>
        <ThreadBar
          progress={progress}
          paused={paused}
          showLabels={true}
          onMilestone={(m) => console.log(`Milestone reached: ${m * 100}%`)}
        />
        <button
          onClick={() => setPaused(!paused)}
          className="px-4 py-2 bg-kdrama-thread text-white rounded-2xl hover-elevate active-elevate-2"
          data-testid="button-toggle-pause"
        >
          {paused ? "Resume" : "Pause"}
        </button>
      </div>
    </div>
  );
}
