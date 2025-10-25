import InstagramGallery from "@/components/InstagramGallery";

export default function TestGallery() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">New Instagram Gallery Navigation</h1>
        <p className="mb-6">
          Click "+2 more" to open the gallery. The navigation is now in a control bar below the Instagram content - much more reliable!
        </p>
        
        <div className="space-y-8">
          <div className="border rounded-lg p-6 bg-card">
            <h2 className="text-lg font-semibold mb-4">Gallery with 3 items (Post + Reel + Post)</h2>
            <InstagramGallery urls={[
              "https://www.instagram.com/p/C3LZuNOPQx5/",
              "https://www.instagram.com/reel/C9HQoUJp0c5/",
              "https://www.instagram.com/p/C2kZ_NvOQx5/"
            ]} />
          </div>
          
          <div className="border rounded-lg p-6 bg-card">
            <h2 className="text-lg font-semibold mb-4">Gallery with 2 posts</h2>
            <InstagramGallery urls={[
              "https://www.instagram.com/p/C3LZuNOPQx5/",
              "https://www.instagram.com/p/C5LZuNOPQx5/"
            ]} />
          </div>
        </div>
      </div>
    </div>
  );
}