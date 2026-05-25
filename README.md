# 💬 Chat App Frontend

A real-time chat application built with **Next.js**, **TypeScript**, and **Socket.IO**. Supports live messaging, markdown rendering, image uploads via Cloudinary, and state management with Zustand.

🔗 **Live Demo:** [chat-app-frontend-eight-woad.vercel.app](https://chat-app-frontend-eight-woad.vercel.app)

---

## 🚀 Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Real-time | Socket.IO Client |
| State Management | Zustand |
| Data Fetching | TanStack React Query + Axios |
| Image Uploads | Next Cloudinary |
| Markdown | React Markdown + Rehype Highlight |
| Notifications | React Toastify |
| Icons | React Icons |

---

## ✨ Features

- **Real-time messaging** powered by Socket.IO
- **Markdown support** in chat messages with syntax highlighting
- **Image uploads** via Cloudinary
- **Global state management** with Zustand
- **Server state & caching** with TanStack React Query
- **Toast notifications** for user feedback
- **Fully typed** with TypeScript

---

## 📁 Project Structure

```
chat-app-frontend/
├── app/               # Next.js App Router (pages, layouts, components)
├── public/            # Static assets
├── next.config.ts     # Next.js configuration
├── tailwind.config    # Tailwind CSS configuration
├── tsconfig.json      # TypeScript configuration
├── eslint.config.mjs  # ESLint configuration
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

```env
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

| Script | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

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
