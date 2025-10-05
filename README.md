# Portfolio Pro

admin: admin@blog.com || 123456
user: user@blog.com || 123456

A modern, full-stack portfolio website with integrated blog functionality, built with Next.js 15 and featuring a sleek, responsive design with advanced animations and user authentication.

## 🚀 Live Deployment

**Live Demo**: [View Live Site](https://a7-blog.vercel.app/)

## 📋 Project Overview

Portfolio Pro is a comprehensive personal portfolio website that showcases my work as a frontend developer. The platform combines a beautiful portfolio presentation with a fully functional blog system, complete with content management capabilities, user authentication, and modern web technologies.

### Key Features

- **🎨 Modern Portfolio Design**: Sleek, responsive design with gradient animations and glassmorphism effects
- **📝 Integrated Blog System**: Full-featured blog with rich text editing, image uploads, and content management
- **🔐 User Authentication**: Secure login system with NextAuth.js and JWT tokens
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **⚡ Performance Optimized**: Next.js 15 with App Router, ISR, and optimized images
- **🎯 Content Management**: Dashboard for creating, editing, and managing blog posts
- **📊 Analytics Ready**: View tracking and engagement metrics
- **🖼️ Image Optimization**: Advanced image handling with blur placeholders and lazy loading
- **📄 Rich Text Editor**: Quill.js integration for professional content creation

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

### Backend & Database
- **Next.js API Routes** - Serverless backend
- **Prisma** - Type-safe database ORM
- **SQLite** - Local development database
- **NextAuth.js** - Authentication solution

### Content & Media
- **UploadThing** - File upload service
- **Quill.js** - Rich text editor
- **React Quill** - React wrapper for Quill

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Turbopack** - Fast bundling (dev mode)

## 🚀 Setup Instructions

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/FAHIMXGG/portfolio-pro.git
   cd portfolio-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="file:./dev.db"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   
   # Backend API (for blog data)
   BACKEND_URL="https://a7-blog-server.vercel.app"
   
   # UploadThing (for file uploads)
   UPLOADTHING_APP_ID="your-uploadthing-app-id"
   UPLOADTHING_SECRET="your-uploadthing-secret"
   ```

4. **Initialize the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
portfolio-pro/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── blog/              # Blog pages
│   │   ├── dashboard/         # Admin dashboard
│   │   ├── about/             # About page
│   │   ├── projects/          # Projects showcase
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   │   ├── ui/               # UI components
│   │   └── dashboard/        # Dashboard-specific components
│   ├── lib/                  # Utility functions
│   └── types/                # TypeScript type definitions
├── prisma/                   # Database schema and migrations
├── public/                   # Static assets
└── tailwind.config.ts        # Tailwind configuration
```

## 🎯 Key Features Explained

### Portfolio Showcase
- **Hero Section**: Animated gradient background with call-to-action buttons
- **Projects Gallery**: Interactive project cards with live demo links
- **About Section**: Personal information with social media links
- **Contact Form**: Integrated contact functionality

### Blog System
- **Public Blog**: Paginated blog listing with search and filtering
- **Rich Content**: Full-featured blog posts with images and formatting
- **Admin Dashboard**: Content management system for blog posts
- **SEO Optimized**: Meta tags and structured data for search engines

### Authentication
- **Secure Login**: JWT-based authentication with NextAuth.js
- **Protected Routes**: Dashboard access restricted to authenticated users
- **Session Management**: Persistent login sessions with secure cookies

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically on every push

### Environment Variables for Production

Set these in your deployment platform:

```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-production-secret"
BACKEND_URL="https://a7-blog-server.vercel.app"
UPLOADTHING_APP_ID="your-uploadthing-app-id"
UPLOADTHING_SECRET="your-uploadthing-secret"
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ahasanul Haque (Fahim)**

- **Portfolio**: [Live Site](https://portfolio-pro.vercel.app)
- **GitHub**: [@FAHIMXGG](https://github.com/FAHIMXGG)
- **LinkedIn**: [fahimx](https://www.linkedin.com/in/fahimx/)
- **Twitter**: [@fahim2259](https://twitter.com/fahim2259)
- **Email**: [Contact via Portfolio](https://portfolio-pro.vercel.app/about)

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Vercel** - For seamless deployment experience
- **Tailwind CSS** - For the utility-first CSS framework
- **Radix UI** - For accessible component primitives
- **UploadThing** - For file upload infrastructure

## 📊 Project Stats

- **Built with**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **Deployment**: Vercel
- **Performance**: 95+ Lighthouse Score

---

⭐ **Star this repository if you found it helpful!**