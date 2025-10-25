import { useState } from "react";
import { Play, Grid3X3, ChevronLeft, ChevronRight, Instagram, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { InstagramEmbed } from "./InstagramEmbed";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface InstagramGalleryProps {
  urls: string[];
}

export default function InstagramGallery({ urls }: InstagramGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Parse URLs to determine if they're reels or posts
  const getInstagramType = (url: string): "reel" | "post" => {
    const cleanUrl = url.split('?')[0];
    if (cleanUrl.includes('/reel/') || cleanUrl.includes('/tv/')) {
      return "reel";
    }
    return "post";
  };

  // Get Instagram ID from URL for display
  const getInstagramId = (url: string): string | null => {
    const cleanUrl = url.split('?')[0];
    const reelMatch = cleanUrl.match(/\/(reel|p|tv)\/([a-zA-Z0-9_-]+)/);
    return reelMatch ? reelMatch[2] : null;
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null && selectedIndex < urls.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handleOpenGallery = (startIndex: number = 0) => {
    setSelectedIndex(startIndex);
    setIsGalleryOpen(true);
  };

  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
    setSelectedIndex(null);
  };

  // Count types for display
  const countTypes = () => {
    let reels = 0;
    let posts = 0;
    urls.forEach(url => {
      if (getInstagramType(url) === "reel") {
        reels++;
      } else {
        posts++;
      }
    });
    return { reels, posts };
  };

  // If only one URL, just show the embed
  if (urls.length === 1) {
    return <InstagramEmbed url={urls[0]} className="my-0" />;
  }

  const { reels, posts } = countTypes();
  const remainingCount = urls.length - 1;

  return (
    <>
      {/* Main display: First post + More indicator */}
      <div className="flex flex-col lg:flex-row gap-4 items-start my-6">
        {/* First Instagram Post - Full Display */}
        <div className="flex-1 w-full lg:max-w-[500px]">
          <InstagramEmbed url={urls[0]} className="my-0" />
        </div>

        {/* More Indicator Card */}
        {remainingCount > 0 && (
          <Card 
            className="relative overflow-hidden cursor-pointer group hover-elevate active-elevate-2 transition-all duration-300 w-full lg:w-auto lg:min-w-[200px]"
            onClick={() => handleOpenGallery(1)}
            data-testid="button-instagram-more"
          >
            <div className="p-6 lg:p-8">
              {/* Background gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Content */}
              <div className="relative flex flex-col items-center text-center space-y-3">
                {/* Instagram gradient circle */}
                <div className="p-4 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 shadow-lg">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                
                {/* Count display */}
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    +{remainingCount} more
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {remainingCount === 1 ? (
                      getInstagramType(urls[1]) === "reel" ? "Reel" : "Post"
                    ) : (
                      <>
                        {reels > 0 && `${reels} Reel${reels > 1 ? 's' : ''}`}
                        {reels > 0 && posts > 0 && ' & '}
                        {posts > 0 && `${posts} Post${posts > 1 ? 's' : ''}`}
                      </>
                    )}
                  </p>
                </div>

                {/* Call to action */}
                <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  Click to view all
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Gallery Dialog with all posts */}
      <Dialog open={isGalleryOpen} onOpenChange={handleCloseGallery}>
        <DialogContent className="w-[90vw] sm:w-[85vw] md:w-[75vw] lg:w-[65vw] max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogTitle className="sr-only">
            Instagram Gallery - {selectedIndex !== null ? selectedIndex + 1 : 1} of {urls.length}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Navigate through Instagram {urls.length > 1 ? 'posts and reels' : getInstagramType(urls[0])}
          </DialogDescription>
          {/* Navigation Controls Bar - Fixed at top */}
          {urls.length > 1 && selectedIndex !== null && (
            <div className="flex justify-between items-center gap-2 sm:gap-4 p-4 sm:p-6 sm:pb-4 border-b bg-background">
              <Button
                onClick={handlePrevious}
                disabled={selectedIndex === 0}
                className="flex items-center gap-1 sm:gap-2"
                variant="outline"
                size="sm"
                data-testid="button-instagram-previous"
                aria-label="Previous post"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </Button>
              
              {/* Page indicators */}
              <div className="flex gap-1">
                {urls.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === selectedIndex 
                        ? "bg-primary w-6" 
                        : "bg-muted hover:bg-muted-foreground/50"
                    }`}
                    aria-label={`Go to item ${index + 1}`}
                  />
                ))}
              </div>
              
              <Button
                onClick={handleNext}
                disabled={selectedIndex === urls.length - 1}
                className="flex items-center gap-1 sm:gap-2"
                variant="outline"
                size="sm"
                data-testid="button-instagram-next"
                aria-label="Next post"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
          
          {/* Content area - scrollable to ensure full visibility */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 sm:px-6 py-4">
            {/* Instagram Embed Container - centered */}
            <div className="relative w-full flex items-center justify-center">
              {selectedIndex !== null && (
                <InstagramEmbed 
                  key={`instagram-${selectedIndex}-${urls[selectedIndex]}`}
                  url={urls[selectedIndex]} 
                  className="my-0"
                />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}