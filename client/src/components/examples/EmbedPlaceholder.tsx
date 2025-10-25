import { EmbedPlaceholder } from "../EmbedPlaceholder";

export default function EmbedPlaceholderExample() {
  return (
    <div className="p-8 bg-kdrama-lavender/10 min-h-[600px]">
      <div className="max-w-2xl mx-auto space-y-6">
        <h3 className="font-myeongjo text-2xl text-kdrama-ink mb-6">Media Embeds</h3>
        
        <EmbedPlaceholder
          type="instagram"
          url="https://www.instagram.com/reel/example"
          title="Behind the Scenes - Cherry Blossom Festival"
        />

        <EmbedPlaceholder
          type="spotify"
          url="https://open.spotify.com/track/example"
          title="Our Song - K-Drama OST"
        />
      </div>
    </div>
  );
}
