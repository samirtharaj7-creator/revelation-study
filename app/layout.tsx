import type { Metadata } from "next";
import { ReadingProgressBar } from "@/components/reading-progress";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Revelation Study Workspace",
    template: "%s | Revelation Workspace"
  },
  description: "A blank Revelation study interface ready for uploaded chapter, verse, chart, symbol, and timeline text.",
  metadataBase: new URL("http://localhost:3000")
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <TooltipProvider>
            <ReadingProgressBar />
            <SiteHeader />
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
