import type { Metadata } from "next";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Task Manager",
  description:
    "Simple Task App using Next.js App Router + MUI with feature-based structure and shared context",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
