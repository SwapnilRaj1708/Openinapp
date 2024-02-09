import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Openinapp",
  description: "Created using Next.js, Tailwind CSS, TypeScript and Prisma",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="bg-[var(--bg-color)]" lang="en">
      <body
        className={`${inter.className} h-full overflow-x-hidden bg-[var(--bg-color)]`}
      >
        <div className="h-full w-full">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
