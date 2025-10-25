import { createContext, useContext, useState, ReactNode } from "react";

interface MusicPlayerContextType {
  currentSongUrl: string | null;
  currentSongName: string | null;
  forceReloadKey: number;
  setCurrentSong: (url: string | null, name: string | null, forceReload?: boolean) => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const [currentSongUrl, setCurrentSongUrl] = useState<string | null>(null);
  const [currentSongName, setCurrentSongName] = useState<string | null>(null);
  const [forceReloadKey, setForceReloadKey] = useState(0);

  const setCurrentSong = (url: string | null, name: string | null, forceReload = false) => {
    setCurrentSongUrl(url);
    setCurrentSongName(name);
    if (forceReload) {
      setForceReloadKey(prev => prev + 1);
    }
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        currentSongUrl,
        currentSongName,
        forceReloadKey,
        setCurrentSong,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const context = useContext(MusicPlayerContext);
  if (context === undefined) {
    throw new Error("useMusicPlayer must be used within a MusicPlayerProvider");
  }
  return context;
}
