# Wand AI Challenge

This is a [Next.js](https://nextjs.org) project that demonstrates a multi-agent chatbot system with independent agents working together.

## Live Demo

Check out the working prototype: [https://wand-ai-challenge.vercel.app/assistants/](https://wand-ai-challenge.vercel.app/assistants/)

## Project Overview

### Design Decisions

- Focus on UI/UX and chatbot functionality
- Showcase independent agent operations
- Seamless integration of agents with chatbot flow
- Modern tech stack:
  - [Next.js](https://nextjs.org/) for full-stack development
  - [Zustand](https://github.com/pmndrs/zustand) for state management
  - [Tailwind CSS](https://tailwindcss.com/) for styling
  - [Shadcn UI](https://ui.shadcn.com/) for components
  - [Lucide](https://lucide.dev/) for icons
  - [Vercel](https://vercel.com/) for deployment

### Trade-offs & Limitations

- Unified Next.js approach with SSE API for backend
- Use of third-party icon libraries instead of custom SVGs
- No dark mode implementation
- No authentication system
- No database integration
- Fixed message responses (non-dynamic chatbot)
- Static chart implementation
- No message validation

## Getting Started

1. Install dependencies:

```bash
yarn install
```

2. Run the development server:

```bash
yarn dev
# or
npm run dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing the System

1. Navigate to the assistants page
2. Start a conversation with the chatbot
3. Observe the independent agents working in parallel
4. Follow the chatbot conversation flow

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn UI Documentation](https://ui.shadcn.com/)

## Deployment

The project is deployed on [Vercel](https://vercel.com/). For deployment details, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
