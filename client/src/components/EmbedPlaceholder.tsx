import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram, Music2, ExternalLink } from "lucide-react";

interface EmbedPlaceholderProps {
  type: "instagram" | "spotify";
  url: string;
  title?: string;
}

export function EmbedPlaceholder({ type, url, title }: EmbedPlaceholderProps) {
  const config = {
    instagram: {
      icon: Instagram,
      label: "Instagram Reel",
      gradient: "from-purple-500 to-pink-500",
      buttonText: "View on Instagram",
    },
    spotify: {
      icon: Music2,
      label: "Spotify Track",
      gradient: "from-green-500 to-emerald-500",
      buttonText: "Listen on Spotify",
    },
  };

  const { icon: Icon, label, gradient, buttonText } = config[type];

  return (
    <Card className="overflow-hidden rounded-2xl border-0 shadow-md">
      <div className={`h-2 bg-gradient-to-r ${gradient}`} />
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 rounded-full bg-gradient-to-r ${gradient}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-myeongjo font-bold text-kdrama-ink dark:text-foreground">
              {title || label}
            </h4>
            <p className="font-noto text-sm text-muted-foreground">
              Embedded content
            </p>
          </div>
        </div>
        
        <div className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center mb-4">
          <Icon className="w-16 h-16 text-muted-foreground/30" />
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full font-noto"
          onClick={() => window.open(url, "_blank")}
          data-testid={`button-${type}-open`}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
