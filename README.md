This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Environment Variables

The following environment variables are required for deployment:

```bash
# AI API Keys
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key

# Server Configuration
PORT=8080  # Optional, defaults to 8080
NEXT_PUBLIC_SOCKET_URL=your_socket_url  # Optional, defaults to window.location.origin

# Node Environment
NODE_ENV=production  # Set automatically in production
```

Make sure to set these environment variables in your deployment platform (e.g., Cloud Run, Vercel, etc.).

## GitHub Actions Setup

For deployment to work with GitHub Actions, you need to add the following secrets to your GitHub repository:

1. Go to your repository settings
2. Navigate to Settings > Secrets and variables > Actions
3. Add the following secrets:
   - `OPENAI_API_KEY`
   - `ANTHROPIC_API_KEY`
   - `GCP_SA_EMAIL` (for Google Cloud authentication)

The deployment workflow will automatically use these secrets during the build and deployment process.
