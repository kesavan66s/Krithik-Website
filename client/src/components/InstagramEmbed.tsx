import { InstagramEmbed as SocialInstagramEmbed } from 'react-social-media-embed';

interface InstagramEmbedProps {
  url: string;
  className?: string;
}

export function InstagramEmbed({ url, className = "" }: InstagramEmbedProps) {
  return (
    <div className={`instagram-embed-container ${className}`}>
      {/* Instagram embed using react-social-media-embed */}
      <div className="instagram-iframe-wrapper" style={{ display: 'flex', justifyContent: 'center' }}>
        <SocialInstagramEmbed 
          url={url}
          width={380}
          placeholderImageUrl=""
          placeholderSpinnerDisabled={false}
        />
      </div>
    </div>
  );
}