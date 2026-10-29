import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cozora: Learn AI from the Experts Who Are Building It",
  description:
    "Your path through AI skills, from the creators building them. Join a community of 50+ of the top Substack AI creators and get 2 new Claude skills every week, in a fully searchable library with the ready-to-run prompt and the why behind it.",
  openGraph: {
    title: "Cozora: Learn AI from the Experts Who Are Building It",
    description:
      "Your path through AI skills, from the creators building them. 2 new Claude skills every week.",
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
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;600;700;800&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
