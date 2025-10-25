import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Music2 } from "lucide-react";

interface MusicConfirmationDialogProps {
  open: boolean;
  onConfirm: () => void;
  musicType: "chapter" | "section";
  musicName: string;
}

export function MusicConfirmationDialog({
  open,
  onConfirm,
  musicType,
  musicName,
}: MusicConfirmationDialogProps) {
  const isChapterMusic = musicType === "chapter";

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-w-md" data-testid="dialog-music-confirmation">
        <AlertDialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-kdrama-thread/10 flex items-center justify-center">
              <Music2 className="w-8 h-8 text-kdrama-thread" />
            </div>
          </div>
          <AlertDialogTitle className="font-myeongjo text-center text-xl">
            {isChapterMusic
              ? "Background Music Available"
              : "Special Music Moment"}
          </AlertDialogTitle>
          <AlertDialogDescription className="font-noto text-center">
            {isChapterMusic ? (
              <>
                This chapter has background music that will automatically play throughout your reading.
                <br />
                <span className="text-foreground font-medium mt-2 block">
                  "{musicName}"
                </span>
                <br />
                <span className="text-muted-foreground text-sm mt-2 block">
                  Music will continue playing as you move between sections and pages in this chapter.
                </span>
              </>
            ) : (
              <>
                This section contains special music for this moment.
                <br />
                <span className="text-foreground font-medium mt-2 block">
                  "{musicName}"
                </span>
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          <AlertDialogAction
            onClick={onConfirm}
            className="min-w-[120px]"
            data-testid="button-music-ok"
          >
            OK, Start Music
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
