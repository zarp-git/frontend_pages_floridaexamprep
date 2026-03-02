import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Static Export | Florida Exam Prep",
  description: "Static page for HTML export",
};

export default function StaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;500;600;700;800;900&family=Rubik:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
