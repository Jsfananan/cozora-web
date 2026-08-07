import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cozora — Learn AI from the Experts Who Are Building It",
  description:
    "Join a community of 40+ of the top Substack AI creators and get new Claude skills every week — the ready-to-run prompt, the why behind it, and a fully searchable library. You don't learn AI alone.",
  openGraph: {
    title: "Cozora — Learn AI from the Experts Who Are Building It",
    description:
      "Join 40+ of the top Substack AI creators and get new Claude skills every week — ready-to-run prompts, the why behind them, and a fully searchable library.",
    url: "https://cozora.org",
    siteName: "Cozora",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Sora:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
