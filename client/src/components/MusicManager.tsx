import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Music, Save, X, Edit2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Chapter, Section } from "@shared/schema";

export function MusicManager() {
  const { toast } = useToast();
  const [editingChapterId, setEditingChapterId] = useState<string | null>(null);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [chapterSongUrl, setChapterSongUrl] = useState("");
  const [sectionSongUrl, setSectionSongUrl] = useState("");

  const { data: chapters = [] } = useQuery<Chapter[]>({
    queryKey: ["/api/chapters"],
  });

  const { data: sections = [] } = useQuery<Section[]>({
    queryKey: ["/api/sections"],
  });

  const updateChapterMutation = useMutation({
    mutationFn: async (data: { id: string; songUrl: string | null }) => {
      return apiRequest("PATCH", `/api/chapters/${data.id}`, { songUrl: data.songUrl });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/chapters"] });
      toast({
        title: "Song updated",
        description: "Chapter song has been updated successfully.",
      });
      setEditingChapterId(null);
      setChapterSongUrl("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update chapter song.",
        variant: "destructive",
      });
    },
  });

  const updateSectionMutation = useMutation({
    mutationFn: async (data: { id: string; songUrl: string | null }) => {
      return apiRequest("PATCH", `/api/sections/${data.id}`, { songUrl: data.songUrl });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sections"] });
      toast({
        title: "Song updated",
        description: "Section song has been updated successfully.",
      });
      setEditingSectionId(null);
      setSectionSongUrl("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update section song.",
        variant: "destructive",
      });
    },
  });

  const handleEditChapter = (chapter: Chapter) => {
    setEditingChapterId(chapter.id);
    setChapterSongUrl(chapter.songUrl || "");
  };

  const handleSaveChapter = (chapterId: string) => {
    updateChapterMutation.mutate({
      id: chapterId,
      songUrl: chapterSongUrl || null,
    });
  };

  const handleEditSection = (section: Section) => {
    setEditingSectionId(section.id);
    setSectionSongUrl(section.songUrl || "");
  };

  const handleSaveSection = (sectionId: string) => {
    updateSectionMutation.mutate({
      id: sectionId,
      songUrl: sectionSongUrl || null,
    });
  };

  const isValidSpotifyUrl = (url: string) => {
    if (!url) return true; // Empty is valid (removes song)
    // Check for valid Spotify track URL with track ID
    const spotifyTrackRegex = /^https:\/\/open\.spotify\.com\/track\/[a-zA-Z0-9]+/;
    return spotifyTrackRegex.test(url);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-myeongjo flex items-center gap-2">
            <Music className="w-5 h-5 text-kdrama-thread" />
            Chapter Songs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {chapters.map((chapter) => (
            <div key={chapter.id} className="border rounded-md p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-myeongjo text-lg font-medium">{chapter.title}</h3>
                  {chapter.songUrl && editingChapterId !== chapter.id && (
                    <p className="text-sm text-muted-foreground font-mono truncate mt-1">
                      {chapter.songUrl}
                    </p>
                  )}
                  {!chapter.songUrl && editingChapterId !== chapter.id && (
                    <p className="text-sm text-muted-foreground italic mt-1">No song assigned</p>
                  )}
                </div>
                {editingChapterId !== chapter.id ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditChapter(chapter)}
                    data-testid={`button-edit-chapter-${chapter.id}`}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                ) : null}
              </div>

              {editingChapterId === chapter.id && (
                <div className="space-y-3 pt-2 border-t">
                  <div>
                    <Label className="font-noto text-sm">Spotify Track URL</Label>
                    <Input
                      value={chapterSongUrl}
                      onChange={(e) => setChapterSongUrl(e.target.value)}
                      placeholder="https://open.spotify.com/track/..."
                      className="font-mono text-sm mt-1"
                      data-testid="input-chapter-song-url"
                    />
                    {chapterSongUrl && !isValidSpotifyUrl(chapterSongUrl) && (
                      <p className="text-sm text-destructive mt-1">
                        Please enter a valid Spotify track URL
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleSaveChapter(chapter.id)}
                      disabled={!isValidSpotifyUrl(chapterSongUrl) || updateChapterMutation.isPending}
                      data-testid="button-save-chapter"
                    >
                      <Save className="w-4 h-4 mr-1" />
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingChapterId(null);
                        setChapterSongUrl("");
                      }}
                      data-testid="button-cancel-chapter"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-myeongjo flex items-center gap-2">
            <Music className="w-5 h-5 text-kdrama-thread" />
            Section Songs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="border rounded-md p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-myeongjo text-lg font-medium">{section.title}</h3>
                  {section.mood && (
                    <Badge variant="outline" className="mt-1 font-noto text-xs">
                      {section.mood}
                    </Badge>
                  )}
                  {section.songUrl && editingSectionId !== section.id && (
                    <p className="text-sm text-muted-foreground font-mono truncate mt-1">
                      {section.songUrl}
                    </p>
                  )}
                  {!section.songUrl && editingSectionId !== section.id && (
                    <p className="text-sm text-muted-foreground italic mt-1">No song assigned</p>
                  )}
                </div>
                {editingSectionId !== section.id ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditSection(section)}
                    data-testid={`button-edit-section-${section.id}`}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                ) : null}
              </div>

              {editingSectionId === section.id && (
                <div className="space-y-3 pt-2 border-t">
                  <div>
                    <Label className="font-noto text-sm">Spotify Track URL</Label>
                    <Input
                      value={sectionSongUrl}
                      onChange={(e) => setSectionSongUrl(e.target.value)}
                      placeholder="https://open.spotify.com/track/..."
                      className="font-mono text-sm mt-1"
                      data-testid="input-section-song-url"
                    />
                    {sectionSongUrl && !isValidSpotifyUrl(sectionSongUrl) && (
                      <p className="text-sm text-destructive mt-1">
                        Please enter a valid Spotify track URL
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleSaveSection(section.id)}
                      disabled={!isValidSpotifyUrl(sectionSongUrl) || updateSectionMutation.isPending}
                      data-testid="button-save-section"
                    >
                      <Save className="w-4 h-4 mr-1" />
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingSectionId(null);
                        setSectionSongUrl("");
                      }}
                      data-testid="button-cancel-section"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
