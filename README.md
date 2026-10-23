# 💬 Chat App Frontend

A real-time chat application built with **Next.js**, **TypeScript**, and **Socket.IO**. Supports live messaging, an AI chat assistant, markdown rendering, image uploads via Cloudinary, and state management with Zustand.

🔗 **Live Demo:** [chat-app-frontend-eight-woad.vercel.app](https://chat-app-frontend-eight-woad.vercel.app)

---

## 🚀 Tech Stack

| Category         | Technology                        |
|------------------|-----------------------------------|
| Framework        | Next.js 16                        |
| Language         | TypeScript                        |
| Styling          | Tailwind CSS v4                   |
| Real-time        | Socket.IO Client                  |
| State Management | React query                           |
| Data Fetching    | TanStack React Query + Axios      |
| Image Uploads    | Next Cloudinary                   |
| Markdown         | React Markdown + Rehype Highlight |
| Notifications    | React Toastify                    |
| Icons            | React Icons                       |

---

## ✨ Features

- **Real-time messaging** powered by Socket.IO
- **AI chat assistant** with Redis-backed rate limiting
- **Markdown support** in chat messages with syntax highlighting
- **Image uploads** via Cloudinary
- **Cookie-based session handling** 
- **Global state management** with React query
- **Server state & caching** with TanStack React Query
- **Toast notifications** for user feedback
- **Fully typed** with TypeScript

---

## 🛡️ AI Chat Rate Limiting

The AI chat is protected by rate limiting backed by **Redis**, which prevents abuse and keeps usage within limits. The limit is enforced on the backend; this frontend handles the rate-limited response and shows feedback to the user when the limit is reached.

---

## 📁 Project Structure

```
chat-app-frontend/
├── app/                   # Next.js App Router
│   ├── (auth)/            # Authentication routes (login, register)
│   ├── (dashboard)/       # Main app routes (chat, requests, profile)
│   ├── components/        # Reusable UI components (including AI chat)
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API calls and backend communication
│   ├── types/             # Shared TypeScript types
│   ├── utils/             # Helper functions (e.g. cookie utilities)
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── providers.tsx      # App-wide providers (e.g. React Query)
├── public/                # Static assets
├── next.config.ts         # Next.js configuration
├── postcss.config.mjs     # PostCSS configuration (Tailwind CSS v4)
├── tsconfig.json          # TypeScript configuration
├── eslint.config.mjs      # ESLint configuration
└── package.json
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
git clone https://github.com/mHasan1037/chat-app-frontend.git
cd chat-app-frontend
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory and add the required variables:

```
NEXT_PUBLIC_API_URL=your_backend_api_url
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
# Add any other required environment variables
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## 📦 Available Scripts

| Script          | Description                  |
|-----------------|------------------------------|
| `npm run dev`   | Start the development server |
| `npm run build` | Build for production         |
| `npm run start` | Start the production server  |
| `npm run lint`  | Run ESLint                   |

---

## 🚢 Deployment

This project is deployed on **Vercel**. To deploy your own instance:

1. Push the repository to GitHub.
2. Import the project on [Vercel](https://vercel.com).
3. Set the required environment variables in the Vercel dashboard.
4. Deploy!

For more details, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

## 📄 License

This project is open source. See the repository for more details.
