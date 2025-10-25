# K-Drama Journal Design Guidelines

## Design Philosophy
A colorful, bubbly journal experience inspired by K-Drama aesthetics with the signature **Red String of Fate** motif visually connecting chapters, pages, and reader journeys.

## Color Palette

### Primary Colors
- **Sakura Pink**: #FFB7C5 (romantic, soft accent)
- **Lavender**: #B8A2FF (dreamy, secondary accent)
- **Sky Blue**: #CDE7F0 (calming backgrounds)
- **Cream**: #FFF7DA (warm content backgrounds)
- **Ink**: #2D2A32 (primary text)

### Red String System
- **Thread Red**: #D7263D (signature connecting element)
- **Knot Shadow Dark**: #A40E2D (depth)
- **Knot Shadow Light**: #F25F5C (highlights)

## Typography

### Font Families
- **Headings/Titles**: Nanum Myeongjo (Korean serif, elegant)
- **Body Text**: Noto Sans KR (Korean sans-serif, readable)

### Scale & Hierarchy
- Page titles: Large, Nanum Myeongjo, with emoji support
- Chapter headings: Medium-large, Nanum Myeongjo
- Body content: Comfortable reading size, Noto Sans KR
- Labels/UI: Small, Noto Sans KR

## Layout System

### Spacing
Use Tailwind spacing units: 2, 4, 6, 8, 12, 16, 24 for consistent rhythm

### Corners & Depth
- Border radius: `rounded-2xl` for cards, containers, and media embeds
- Shadows: Soft, diffused (blur: 24px, spread: 0, opacity: 12-16%)
- Layering: Thread elements beneath content, knots float above

### Content Structure
- Clean margins with generous whitespace
- Content max-width for optimal reading (prose-lg equivalent)
- Responsive polaroid-style cards for suggestions

## Red String of Fate Motif

### ThreadBar Component
- Thin red line (#D7263D) running horizontally at page top
- Progress indicator fills left-to-right as user scrolls
- **Knots** (small hearts) appear at 25%, 50%, 75%, 100% milestones
- **Active state**: Taut, full opacity thread
- **Paused state**: Slight sag, reduced opacity (60-70%)
- Smooth transitions (120-180ms ease-in-out)

### Visual Thread Elements
- Sidebar: Thin vertical red thread with decorative knots
- Page headers: Thread weaves through title area
- Chapter breaks: Knot nodes marking transitions
- FateLinks: Curved threads connecting current page to suggestions

### Knot Styling
- Heart-shaped nodes in red (#D7263D)
- Subtle pulse animation on hover (scale 1.05, 180ms)
- Shadow depth using knot shadow colors
- Sizes: sm (12px), md (16px), lg (24px)

## Component Styling

### Cards & Containers
- Polaroid aesthetic: white/cream background, slight rotation (-2° to 2°)
- Pinned appearance with small thread loop at top
- Gentle sway on hover (1-2° rotation, 180ms)
- Rounded corners (rounded-2xl)
- Soft shadow for depth

### Embeds (Instagram/Spotify)
- Responsive wrapper maintaining aspect ratio
- Rounded corners matching theme
- Subtle border or shadow
- Loading states with skeleton screens in theme colors

### Buttons & Interactive Elements
- Primary: Sakura pink fill with white text
- Secondary: Outline style with lavender border
- Hover states: Slight scale (1.02) and deeper shadow
- Focus: High-contrast outline for accessibility

### Editor Tools (Admin Only)
- Floating toolbar with cream background
- Pill-shaped buttons with icons
- Slash menu with K-drama themed icons
- Drag handles styled as small thread loops

## Iconography & Decorative Elements
- **Icons**: Hearts, umbrellas, polaroids, flower petals
- Use sparingly for visual interest without clutter
- Integrate thread motif into navigation and dividers
- Chapter emojis displayed prominently

## Motion & Animation

### Principles
- Timing: 120-180ms for micro-interactions
- Easing: ease-in-out for natural feel
- **Respect `prefers-reduced-motion`**: Replace animations with simple fades or static states

### Key Animations
- Thread progress: Smooth width transition
- Knot milestones: Subtle pop-in (scale from 0 to 1)
- Polaroid sway: Gentle rotation on hover
- Page transitions: Soft fade (no dramatic movements)
- Heartbeat pulse: Subtle scale for active tracking indicator

## Reading Experience

### Content Presentation
- Comfortable line height (1.7-1.8)
- Optimal line length (65-75 characters)
- Clear paragraph spacing
- Thread markers at 25/50/75/100% invisible to readers

### FateLinks Section
- 1-3 polaroid cards showing suggested pages
- Red thread curves connecting current page to each
- Card includes: cover image, title, mood tag, brief description
- Hover reveals full description tooltip

## Admin Dashboard Aesthetics
- **Timeline view**: Horizontal thread with knots representing page views
- **Journey map**: Circular chapter layout with thread tracing reading path
- **KPI cards**: Soft backgrounds (sky/lavender/cream) with ink text
- Data visualizations use theme color palette

## Accessibility Requirements
- Color contrast: Ensure WCAG AA minimum (4.5:1 for text)
- Focus indicators: High-contrast outlines on all interactive elements
- Thread/knot elements have appropriate ARIA labels
- Keyboard navigation for all functionality
- Screen reader friendly milestone announcements

## Images
- **Hero Section**: Not applicable - this is a journal/reading interface, not a marketing site
- **Page Covers**: Optional cover images for individual pages (landscape, 16:9 recommended)
- **Polaroid Cards**: Thumbnail images for page suggestions (square or portrait, 4:5)
- **Background Patterns**: Subtle, theme-colored decorative elements (petals, threads) at very low opacity (5-8%)