import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cozora — Learn AI from the Experts Who Are Building It",
  description:
    "Weekly live sessions with AI practitioners. Master content creation, development, knowledge systems, and leadership — straight from the creators who are building with AI every day.",
  openGraph: {
    title: "Cozora — Learn AI from the Experts Who Are Building It",
    description:
      "Weekly live sessions with AI practitioners. Master content creation, development, knowledge systems, and leadership.",
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
