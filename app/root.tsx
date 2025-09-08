import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";

import "./tailwind.css";
import Header from "./common/Header";
import { ThemeProvider } from "./context/ThemeContext";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: "cropto" },
    {
      property: "og:title",
      content: "Very cool app",
    },
    {
      name: "description",
      content: "This app is the best",
    },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="relative font-sans selection:bg-red-600/90 selection:text-white">
        <div className="pointer-events-none fixed inset-0 -z-10 opacity-40 dark:opacity-30 [mask-image:radial-gradient(circle_at_center,black,transparent)]">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-orange-400/10 dark:from-red-500/10 dark:via-transparent dark:to-orange-300/10" />
        </div>
        <ThemeProvider>
          <Header />
          <main className="pt-24 pb-12 px-4 sm:px-6 max-w-6xl mx-auto w-full">{children}</main>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
