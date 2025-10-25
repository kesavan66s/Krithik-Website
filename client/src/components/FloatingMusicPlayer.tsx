import { Music, X } from "lucide-react";
import { useMusicPlayer } from "@/contexts/MusicPlayerContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";

// Extend Window interface for Spotify iFrame API
declare global {
  interface Window {
    onSpotifyIframeApiReady?: (IFrameAPI: any) => void;
    Spotify?: any;
  }
}

export function FloatingMusicPlayer() {
  const { currentSongUrl, currentSongName, forceReloadKey } = useMusicPlayer();
  const [isApiReady, setIsApiReady] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const embedControllerRef = useRef<any>(null);
  const embedContainerRef = useRef<HTMLDivElement>(null);

  // Check if Spotify iFrame API is ready
  useEffect(() => {
    if (typeof window.Spotify !== 'undefined') {
      setIsApiReady(true);
    } else {
      window.onSpotifyIframeApiReady = (IFrameAPI) => {
        window.Spotify = IFrameAPI;
        setIsApiReady(true);
      };
    }
  }, []);

  // Extract Spotify URI from various Spotify URL formats
  const getSpotifyUri = (url: string | null) => {
    if (!url) return null;
    
    // Handle different Spotify URL formats
    const trackMatch = url.match(/track\/([a-zA-Z0-9]+)/);
    if (trackMatch) {
      return `spotify:track:${trackMatch[1]}`;
    }
    
    const albumMatch = url.match(/album\/([a-zA-Z0-9]+)/);
    if (albumMatch) {
      return `spotify:album:${albumMatch[1]}`;
    }
    
    const playlistMatch = url.match(/playlist\/([a-zA-Z0-9]+)/);
    if (playlistMatch) {
      return `spotify:playlist:${playlistMatch[1]}`;
    }
    
    return null;
  };

  const spotifyUri = getSpotifyUri(currentSongUrl);

  // Create Spotify embed controller when API is ready and URI changes
  useEffect(() => {
    if (!isApiReady || !spotifyUri || !embedContainerRef.current || !window.Spotify) {
      return;
    }

    // Clear previous embed if exists
    if (embedControllerRef.current) {
      embedControllerRef.current.destroy();
      embedControllerRef.current = null;
    }

    // Clear container
    embedContainerRef.current.innerHTML = '';

    const options = {
      uri: spotifyUri,
      width: '100%',
      height: 152,
    };

    const callback = (EmbedController: any) => {
      embedControllerRef.current = EmbedController;
      
      // Listen for when the player is ready to play
      let hasAttemptedPlay = false;
      
      EmbedController.addListener('playback_update', (e: any) => {
        // Once we get the first playback update, the player is ready
        // Call play() if we haven't already
        if (!hasAttemptedPlay) {
          hasAttemptedPlay = true;
          // Reduced delay for faster playback
          setTimeout(() => {
            try {
              const playResult = EmbedController.play();
              // Check if play() returns a Promise before calling catch
              if (playResult && typeof playResult.catch === 'function') {
                playResult.catch((err: any) => {
                  console.log('Autoplay blocked or failed:', err);
                  // Fallback: try again after a shorter delay
                  setTimeout(() => {
                    try {
                      EmbedController.play();
                    } catch (e) {
                      // Silent fail - user can manually click play
                    }
                  }, 500);
                });
              }
            } catch (err) {
              console.log('Autoplay error:', err);
            }
          }, 100);
        }
      });
      
      // Backup: Also try to play after a delay in case playback_update doesn't fire
      setTimeout(() => {
        if (!hasAttemptedPlay) {
          hasAttemptedPlay = true;
          try {
            EmbedController.play();
          } catch (e) {
            // Silent fail
          }
        }
      }, 800);
    };

    window.Spotify.createController(embedContainerRef.current, options, callback);

    return () => {
      if (embedControllerRef.current) {
        embedControllerRef.current.destroy();
        embedControllerRef.current = null;
      }
    };
  }, [isApiReady, spotifyUri, forceReloadKey]);

  // Handle minimize - music continues playing
  const handleMinimize = () => {
    setIsMinimized(true);
  };

  // Handle expand - show player again
  const handleExpand = () => {
    setIsMinimized(false);
  };

  // Don't render if no song is set
  if (!currentSongUrl || !spotifyUri) {
    return null;
  }

  return (
    <div
      className="fixed top-4 right-4 z-50"
      data-testid="floating-music-player"
    >
      {/* Minimized state - just the icon */}
      {isMinimized && (
        <Button
          size="icon"
          variant="default"
          className="h-12 w-12 rounded-full shadow-2xl backdrop-blur-md bg-[#ffe9ed] dark:bg-background/50 hover:bg-background/60 dark:hover:bg-background/70 border-2 border-white dark:border-kdrama-cream ring-2 ring-kdrama-heart/50"
          onClick={handleExpand}
          data-testid="button-expand-player"
        >
          <Music className="h-6 w-6 text-kdrama-heart drop-shadow-md" />
        </Button>
      )}

      {/* Expanded player - hidden with CSS when minimized to keep iframe mounted */}
      <Card className={`overflow-hidden shadow-2xl bg-card border-kdrama-thread/20 w-[300px] ${isMinimized ? 'hidden' : ''}`}>
        <div className="p-3 flex items-center justify-between bg-kdrama-accent/10 border-b border-kdrama-thread/20">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Music className="h-4 w-4 text-kdrama-thread flex-shrink-0" />
            <p className="text-sm font-noto font-medium text-foreground truncate" data-testid="text-song-name">
              {currentSongName || "Now Playing"}
            </p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 flex-shrink-0"
            onClick={handleMinimize}
            data-testid="button-minimize-player"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="bg-background" ref={embedContainerRef} data-testid="spotify-embed-container">
          {/* Spotify embed will be created here by the iFrame API */}
        </div>
      </Card>
    </div>
  );
}
