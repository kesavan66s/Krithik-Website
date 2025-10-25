# K-Drama Journal

## Overview
A web application inspired by K-Drama aesthetics, featuring a "Red String of Fate" visual motif. It allows users to read formatted journal entries organized into chapters and sections with progress tracking and analytics. Admins can manage content and view activity logs. The application caters to two user roles: Readers, who consume content and track progress, and Admins, who create and manage content while accessing detailed analytics.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
**Framework**: React with TypeScript, using Vite.
**Routing**: Wouter.
**State Management**: TanStack Query for server state, React Context API for authentication, and React hooks for local component state.
**UI Component System**: Radix UI primitives, custom component library built on shadcn/ui, Tailwind CSS with a K-Drama-themed palette, and custom fonts (Nanum Myeongjo, Noto Sans KR).
**Key Design Patterns**: Component composition, separation of concerns, and custom hooks.

### Backend Architecture
**Framework**: Express.js with TypeScript on Node.js.
**API Design**: RESTful API for authentication, user management, chapter/section/page CRUD, reading progress, and analytics.
**Data Access Layer**: Storage abstraction using an `IStorage` interface.
**Server-Side Rendering**: Vite middleware for development.

### Data Storage
**Database**: PostgreSQL via `pg` driver with Neon backend.
**ORM**: Drizzle ORM for type-safe queries.
**Schema Design**: `users`, `chapters`, `sections`, `pages`, `readingProgress`, `analyticsEvents`.
**Migration Strategy**: Drizzle Kit.

### Authentication & Authorization
**Authentication**: Username/password with session storage in localStorage.
**Authorization**: Role-based access control (RBAC) with `guest`, `reader`, and `admin` roles.
**Session Management**: Client-side session persistence.

### Key Architectural Decisions
**Monorepo Structure**: Shared schema definitions between client and server via `@shared` path alias for type safety.
**Session Strategy**: Client-side session management for simplicity.
**Data Model Hierarchy**: Three-level content organization (Chapter → Section → Page) supporting optional Spotify music URLs.
**Reading Analytics**: Page-level and section-level granularity with progress milestones.
**Component Design**: Composition over inheritance, focused on K-Drama design guidelines.
**Build Optimization**: Separate build processes for client (Vite) and server (esbuild).

## External Dependencies

**Database Service**: Neon PostgreSQL database via standard `pg` driver.
**UI Libraries**: Radix UI, Embla Carousel, Lucide React, PhotoSwipe 5 (react-photoswipe-gallery), class-variance-authority, clsx.
**Development Tools**: Replit-specific plugins (development banner, cartographer), runtime error overlay.
**Build & Deployment**: esbuild (server), Vite (client).
**Typography**: Google Fonts (Nanum Myeongjo, Noto Sans KR).

## Recent Changes (October 25, 2025)

### UI Standardization and Visual Consistency (October 25, 2025)
- **Thumbnail Consistency**: All placeholder thumbnails now use the same rose/sakura/lavender gradient
  - Gradient: `from-kdrama-rose/20 via-kdrama-sakura/30 to-kdrama-lavender/20`
  - Icon color: `#f0425c` (vibrant red-pink)
  - Icons: Book icon for chapters, BookOpen icon for sections, Heart for liked sections
- **Heart Button Improvements**: Hearts always show outline, always visible, consistently red colored
- **Badge Styling**: Liked Sections badge made transparent with no border
- **PolaroidCard Refactoring**: Liked sections page now uses standardized PolaroidCard component
- **Files Updated**: home.tsx, PolaroidCard.tsx, admin/SectionManagement.tsx, admin/ChapterManagement.tsx, liked-sections.tsx

### Session Management Improvements (October 25, 2025)
- **Session Validation**: Added `/api/auth/validate` endpoint to check if user exists in database
- **Auto-validation on Startup**: AuthContext now validates stored sessions on app initialization
- **Invalid Session Detection**: API routes now check for foreign key violations and invalid user IDs
- **Automatic Redirect**: Invalid sessions automatically redirect to login page
- **Improved Error Messages**: More user-friendly error messages for expired sessions
- **Error Handling Enhancement**: All like/unlike operations now properly handle session expiry
- **Database Constraint Fix**: Added unique constraint to prevent duplicate likes at database level

## Earlier Changes (October 25, 2025)

### Section Liking Feature (October 25, 2025)
- **Like Button in Section Reader**: Heart icon button next to section titles allows users to like/unlike sections
- **Sidebar Like Indicators**: Quick like/unlike buttons in section sidebar for all sections in a chapter
- **Liked Sections Collection**: Special "Liked Sections" card on home page shows count of liked sections
- **Liked Sections Page**: Dedicated page (`/liked-sections`) displays all liked sections grouped by chapters
- **Database Schema**: Added `liked_sections` table to track user likes with timestamps
- **API Endpoints**: 
  - POST `/api/sections/:id/like` - Like a section
  - DELETE `/api/sections/:id/like` - Unlike a section  
  - GET `/api/users/:id/liked-sections` - Get all liked sections for a user
  - GET `/api/sections/:id/like-status` - Check if user has liked a section
  - GET `/api/sections/:id/like-count` - Get total like count for a section
- **Visual Feedback**: 
  - Filled heart icon for liked sections, empty for unliked
  - Rose/pink color scheme matching K-Drama aesthetic
  - Toast notifications on like/unlike actions
  - Like count display next to heart button in reader
- **User Experience**: 
  - Must be logged in to like sections
  - Liked sections persist across sessions
  - Quick access from home page when user has liked sections
  - Responsive grid layout on liked sections page with thumbnails

## Earlier Changes (October 24, 2025)

### Instagram Gallery with "One Full + More" Display (October 24, 2025)
- **New Design**: Show first Instagram post/reel fully embedded, with "+X more" indicator for additional content
- **Smart Display**: Avoids thumbnail issues by showing actual Instagram embed immediately
- **"+X More" Card**: Elegant indicator with Instagram gradient, plus icon, and content type breakdown
- **Responsive Layout**: Side-by-side on desktop (embed + indicator), stacked on mobile
- **Redesigned Navigation**: Navigation controls placed in a control bar below Instagram content
  - Previous/Next buttons with text labels and disabled states
  - Clickable page indicator dots for direct navigation to any item
  - Type indicator (Reel/Post) and counter at top of dialog
  - Clean separation from Instagram content with border
- **Gallery Dialog**: Click "+X more" to open full gallery with all posts and reliable navigation
- **Content Types**: Shows count of reels vs posts in the more indicator
- **Test Content**: Added "Behind the Scenes" section with Instagram galleries to seed data
- **Gallery syntax**: `[instagram-gallery:url1,url2,url3]` for multiple items
- **Single Instagram**: Still uses `[embed:url]` format for backward compatibility

### Minimal Instagram Embeds
- Created custom InstagramEmbed component with cleaner, minimal UI
- Removed visual clutter while keeping Instagram reels playback and post navigation
- Added custom header with Instagram icon and "Open" button for external viewing
- CSS minimizes borders, shadows, and padding while respecting Instagram's terms
- Instagram embeds now match journal's K-Drama aesthetic with burgundy accents
- Reels still play inline, multi-image posts retain swipe functionality
- Max width constrained to 500px for better readability in journal format

## Earlier Updates (October 24, 2025)

### Mixed Media Galleries with PhotoSwipe 5
- Unified media galleries supporting both images and videos in the same carousel
- Videos marked with `video:` prefix in gallery embeds: `[gallery:url1,video:url2,url3]`
- **Fixed aspect ratio preservation**: Images now maintain their natural dimensions when zooming
  - Auto-detects actual image dimensions instead of using hardcoded values
  - Uses `initialZoomLevel: 'fit'` to prevent stretching or distortion
  - Disabled zoom toggle to prevent accidental stretching
  - Images always display at correct aspect ratio in lightbox
- Single video displays as inline player, multiple media items show as interactive grid
- Video thumbnails in grid show play icon overlay, expand to video player in lightbox
- MediaEmbedDialog handles both image (10MB) and video (50MB) uploads in one interface
- Supported video formats: MP4, WebM, MOV, AVI, WMV, OGG
- Gallery format unchanged: `[embed:url]` for single images, `[gallery:url1,url2,url3]` for mixed media
- Gallery layout: Responsive grid (2-column for 2 items, 3-column for 3+ items)
- Mobile-optimized with touch gestures, pinch-to-zoom, swipe navigation for all media types

### Tiptap WYSIWYG Editor
- Replaced React-Quill with Tiptap for better customization and no font override issues
- Modern headless editor built on ProseMirror with full control over UI and behavior
- Full toolbar: undo, redo, bold, italic, underline, strikethrough, font family, font size, text color, highlight color, subscript, superscript, ordered/unordered lists, text alignment (left, center, right, justify), links, images
- Custom K-Drama fonts in dropdown (8 total with English labels):
  - Korean fonts: Nanum Myeongjo (default), Noto Sans KR, Nanum Pen Script, Nanum Brush Script, Gaegu
  - Standard fonts: Serif, Sans-serif, Monospace
- Font size options: Small (12px), Normal (16px), Large (20px), Huge (24px)
- Text color picker: Native HTML color picker (eyedropper) + 20 predefined color swatches, auto-closes after swatch selection
- Highlight color picker: Native HTML color picker (eyedropper) + 15 predefined colors (yellow/red/green/blue/purple shades), auto-closes after swatch selection
- Custom FontSize extension: Injects fontSize attribute onto TextStyle mark with proper HTML serialization
- K-Drama themed styling matching burgundy/cream color scheme with dark mode support
- Image upload integration with existing `/api/upload/image` endpoint
- MediaToolbar preserved for video and Spotify embeds alongside rich text features
- HTML output for clean, accessible content (page content) or plain text (title/mood/tags in single-line mode)
- Content synchronization: Editor syncs when value prop changes (page navigation, edit mode toggle)
- No duplicate extension conflicts (StarterKit link disabled, custom Link extension used)
- Undo/Redo buttons: Located at the start of toolbar, disabled when history stack is empty
- Single-line mode: For title, mood, and tags fields, prevents Enter key and emits plain text instead of HTML
- Section titles, mood, and tags now use TiptapEditor with full formatting capabilities (bold, colors, fonts, etc.)
- Mood field updated from single string to array (like tags) supporting comma-separated values with rich formatting