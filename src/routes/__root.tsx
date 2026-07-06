import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { MusicProvider, MusicToggle } from "../components/music";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-gradient-gold">404</h1>
        <p className="mt-4 text-muted-foreground">This page wandered off.</p>
        <Link to="/" className="mt-6 inline-block rounded-full bg-primary px-6 py-2 text-primary-foreground">Go home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <div>
        <h1 className="font-display text-2xl">Something went sideways</h1>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-4 rounded-full bg-primary px-6 py-2 text-primary-foreground">Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "A Little Birthday Surprise" },
      { name: "description", content: "A handmade birthday surprise.....made with love, for a bold and beautiful sister >>>" },
      { property: "og:title", content: "A Little Birthday Surprise" },
      { property: "og:description", content: "A handmade birthday surprise.....made with love, for a bold and beautiful sister >>>" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "A Little Birthday Surprise" },
      { name: "twitter:description", content: "A handmade birthday surprise.....made with love, for a bold and beautiful sister >>>" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6f9a7c54-e694-4813-a8b8-cdc3a4c0ebfb/id-preview-d9fc2b2d--a1079208-4c78-4c0e-a81a-2d0f68d54be7.lovable.app-1783379392901.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6f9a7c54-e694-4813-a8b8-cdc3a4c0ebfb/id-preview-d9fc2b2d--a1079208-4c78-4c0e-a81a-2d0f68d54be7.lovable.app-1783379392901.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,800;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,500;1,300&family=Inter:wght@300;400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <MusicProvider>
        <Outlet />
        <MusicToggle />
      </MusicProvider>
    </QueryClientProvider>
  );
}
