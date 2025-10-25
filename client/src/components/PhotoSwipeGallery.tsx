import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import { Play } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PhotoSwipeGalleryProps {
  images: string[];
  className?: string;
}

interface MediaItem {
  url: string;
  isVideo: boolean;
  original: string;
  width?: number;
  height?: number;
}

export function PhotoSwipeGallery({ images, className = "" }: PhotoSwipeGalleryProps) {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [dimensionsLoaded, setDimensionsLoaded] = useState(false);
  
  useEffect(() => {
    // Process media items and load image dimensions
    const loadMediaDimensions = async () => {
      const items = await Promise.all(images.map(async (item) => {
        const isVideo = item.startsWith('video:');
        const url = isVideo ? item.slice(6) : item; // Remove 'video:' prefix
        
        let width = 1024;
        let height = 768;
        
        if (!isVideo) {
          // Load actual image dimensions
          try {
            const img = new Image();
            await new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
              img.src = url;
            });
            width = img.naturalWidth || 1024;
            height = img.naturalHeight || 768;
          } catch (e) {
            console.warn('Failed to load image dimensions:', e);
          }
        }
        
        return { url, isVideo, original: item, width, height };
      }));
      
      setMediaItems(items);
      setDimensionsLoaded(true);
    };
    
    loadMediaDimensions();
  }, [images]);
  
  if (images.length === 0 || !dimensionsLoaded) return null;

  // Single media layout
  if (mediaItems.length === 1) {
    const item = mediaItems[0];
    
    if (item.isVideo) {
      // Single video - show video player directly
      return (
        <div className={`my-6 ${className}`}>
          <video
            controls
            className="w-full rounded-md shadow-md"
            preload="metadata"
            data-testid="video-single"
          >
            <source src={item.url} />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    } else {
      // Single image - use PhotoSwipe with proper aspect ratio
      return (
        <Gallery options={{ 
          showHideOpacity: true,
          zoom: false, // Disable zoom to prevent stretching
          allowPanToNext: false,
          bgOpacity: 0.95,
          // Maintain aspect ratio settings
          padding: { top: 40, bottom: 40, left: 0, right: 0 },
          // Prevent any stretching
          initialZoomLevel: 'fit',
          secondaryZoomLevel: 1.5,
          maxZoomLevel: 3,
        }}>
          <div className={`my-6 ${className}`}>
            <Item
              original={item.url}
              thumbnail={item.url}
              width={item.width}
              height={item.height}
            >
              {({ ref, open }) => (
                <img
                  ref={ref as React.Ref<HTMLImageElement>}
                  onClick={open}
                  src={item.url}
                  alt="Journal image"
                  className="w-full rounded-md cursor-pointer hover-elevate transition-all"
                  data-testid="image-single"
                />
              )}
            </Item>
          </div>
        </Gallery>
      );
    }
  }

  // Multiple media grid layout
  const gridClass = mediaItems.length === 2 
    ? "grid grid-cols-2 gap-3"
    : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3";

  return (
    <Gallery options={{ 
      showHideOpacity: true,
      zoom: false, // Disable zoom to prevent stretching
      bgOpacity: 0.95,
      // Maintain aspect ratio settings
      padding: { top: 40, bottom: 40, left: 0, right: 0 },
      // Prevent any stretching - use 'fit' to maintain aspect ratio
      initialZoomLevel: 'fit',
      secondaryZoomLevel: 1.5,
      maxZoomLevel: 3,
    }}>
      <div className={`my-6 ${className}`}>
        <div className={gridClass}>
          {mediaItems.map((item, index) => {
            if (item.isVideo) {
              // Video items show as video player with play overlay
              return (
                <Item
                  key={index}
                  html={`
                    <video controls autoplay class="pswp__video" style="width: 100%; height: 100%; object-fit: contain;">
                      <source src="${item.url}" />
                    </video>
                  `}
                  thumbnail={item.url}
                  width={item.width}
                  height={item.height}
                >
                  {({ ref, open }) => (
                    <div
                      ref={ref as React.Ref<HTMLDivElement>}
                      onClick={open}
                      className="relative aspect-square overflow-hidden rounded-md cursor-pointer hover-elevate transition-all group"
                      data-testid={`video-gallery-${index}`}
                    >
                      <video
                        src={item.url}
                        className="w-full h-full object-cover"
                        muted
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                        <Play className="w-12 h-12 text-white drop-shadow-lg" />
                      </div>
                    </div>
                  )}
                </Item>
              );
            } else {
              // Image items
              return (
                <Item
                  key={index}
                  original={item.url}
                  thumbnail={item.url}
                  width={item.width}
                  height={item.height}
                >
                  {({ ref, open }) => (
                    <div
                      ref={ref as React.Ref<HTMLDivElement>}
                      onClick={open}
                      className="relative aspect-square overflow-hidden rounded-md cursor-pointer hover-elevate transition-all group"
                      data-testid={`image-gallery-${index}`}
                    >
                      <img
                        src={item.url}
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </div>
                  )}
                </Item>
              );
            }
          })}
        </div>
      </div>
    </Gallery>
  );
}
