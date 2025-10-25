# K-Drama Journal

A colorful, journal-style web application inspired by K-Drama aesthetics, featuring the "Red String of Fate" visual motif. The application enables users to read beautifully formatted journal entries organized into chapters and sections, with reading progress tracking and analytics.

## Features

- 📖 **Beautiful Reading Experience**: Elegantly designed journal entries with K-Drama inspired aesthetics
- 🎨 **Custom Theming**: Unique color palette featuring sakura pink, lavender, and traditional Korean design elements
- 📊 **Progress Tracking**: Track your reading progress across chapters and sections
- 🔐 **Authentication System**: Secure login with role-based access (Admin, Reader)
- 🖼️ **Embedded Media**: Support for embedded images and Instagram content within journal pages
- 📱 **Responsive Design**: Works beautifully on desktop and mobile devices
- 👨‍💼 **Admin Tools**: Content management with inline editing capabilities for admin users

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Wouter** for lightweight routing
- **TanStack Query** for server state management
- **Radix UI** for accessible component primitives
- **Tailwind CSS** for styling
- **Shadcn/ui** component library

### Backend
- **Node.js** with TypeScript
- **Express.js** for API server
- **PostgreSQL** database (Neon serverless)
- **Drizzle ORM** for type-safe database queries
- **Passport.js** for authentication

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 20 or higher)
- **npm** (comes with Node.js)
- **PostgreSQL** database (or access to a Neon database)

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd kdrama-journal
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages for both the frontend and backend.

### 3. Set Up Environment Variables

Create a `.env` file in the root directory (if not already present) and add your database connection string:

```env
DATABASE_URL=postgresql://user:password@host:port/database
```

**For Replit Users:**
If you're running this on Replit, the database is automatically provisioned and the `DATABASE_URL` environment variable is already set. You can skip this step.

### 4. Initialize the Database

Push the database schema to your PostgreSQL database:

```bash
npm run db:push
```

This command uses Drizzle Kit to create all necessary tables in your database.

### 5. Seed Sample Data

Populate the database with sample K-Drama journal entries:

```bash
npx tsx server/seed.ts
```

This will create:
- 2 user accounts (admin and reader)
- 5 chapters covering different seasons
- 7 sections with various moods and themes
- Multiple pages with embedded images
- Beautiful K-Drama inspired content

### 6. Start the Development Server

```bash
npm run dev
```

The application will start on `http://localhost:5000` (or your Replit URL if using Replit).

## Default Login Credentials

After seeding the database, you can log in with these accounts:

### Admin Account
- **Username:** `admin`
- **Password:** `admin123`
- **Capabilities:** Full access to content management, analytics, and admin tools

### Reader Account
- **Username:** `reader`
- **Password:** `reader123`
- **Capabilities:** Read access to all content with progress tracking

## Project Structure

```
kdrama-journal/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   └── src/
│       ├── components/    # React components
│       │   ├── ui/       # Reusable UI components
│       │   └── ...       # Feature-specific components
│       ├── contexts/      # React context providers
│       ├── hooks/         # Custom React hooks
│       ├── lib/          # Utility functions and clients
│       ├── pages/        # Page components (routes)
│       └── App.tsx       # Main application component
├── server/                # Backend Express application
│   ├── db.ts            # Database connection
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API routes
│   ├── seed.ts          # Database seeding script
│   ├── storage.ts       # Data access layer
│   └── vite.ts          # Vite development middleware
├── shared/               # Shared code between client and server
│   └── schema.ts        # Database schema and types
├── package.json         # Dependencies and scripts
├── drizzle.config.ts   # Drizzle ORM configuration
├── vite.config.ts      # Vite configuration
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Available Scripts

### Development
- `npm run dev` - Start the development server with hot reload
- `npm run check` - Run TypeScript type checking

### Database
- `npm run db:push` - Push database schema changes to the database
- `npx tsx server/seed.ts` - Seed the database with sample data

### Production
- `npm run build` - Build the application for production
- `npm start` - Start the production server

## Database Schema

The application uses five main tables:

### Users
- Stores user accounts with role-based access control
- Roles: `admin`, `reader`, `guest`

### Chapters
- Top-level content organization
- Each chapter has a title, description, and order

### Sections
- Sub-divisions within chapters
- Contains mood, tags, thumbnail, and order

### Pages
- Individual content pages within sections
- Supports embedded content via `[embed:URL]` syntax

### Reading Progress
- Tracks user reading behavior
- Records completion status and last read timestamp

## Embedded Content

The application supports embedded content in journal pages using the following syntax:

### Images
```
[embed:https://example.com/image.jpg]
```

### Instagram Reels/Posts
```
[embed:https://www.instagram.com/p/POST_ID]
```

The content renderer will automatically detect and display these embeds appropriately.

## Customization

### Changing Colors
The color theme is defined in `tailwind.config.ts`. You can customize the K-Drama color palette:

```typescript
colors: {
  kdrama: {
    thread: "#DC143C",
    sakura: "#FFB7C5",
    lavender: "#E6E6FA",
    // ... more colors
  }
}
```

### Adding New Fonts
Fonts are loaded from Google Fonts in `client/index.html`. The application uses:
- **Nanum Myeongjo** for headings
- **Noto Sans KR** for body text

## Troubleshooting

### Database Connection Issues
- Ensure your `DATABASE_URL` is correctly set in the environment variables
- Check that your PostgreSQL database is running and accessible
- Run `npm run db:push` to ensure the schema is up to date

### Port Already in Use
If port 5000 is already in use, you can change it in `server/index.ts`:
```typescript
const PORT = process.env.PORT || 5000;
```

### Build Errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear the build cache: `rm -rf dist`

## Contributing

This is a personal project, but suggestions and improvements are welcome!

## License

MIT License - See LICENSE file for details

## Acknowledgments

- Inspired by K-Drama aesthetics and the Red String of Fate legend
- Built with love using modern web technologies
- Korean typography powered by Google Fonts

---

**Enjoy your K-Drama Journal experience! 🎭❤️**
