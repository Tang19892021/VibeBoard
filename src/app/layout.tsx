import type { Metadata } from "next"
import Link from "next/link"
import { ThemeProvider } from "next-themes"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"
import "./globals.css"

export const metadata: Metadata = {
  title: "VibeBoard - 게시판",
  description: "Next.js와 shadcn/ui로 만든 게시판 사이트",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <nav className="border-b bg-white dark:bg-slate-950 sticky top-0 z-50">
            <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                VibeBoard
              </Link>
              <div className="flex gap-2">
                <ThemeToggle />
                <Button asChild variant="default">
                  <Link href="/posts/create">글 작성</Link>
                </Button>
              </div>
            </div>
          </nav>
          <main className="max-w-4xl mx-auto px-4 py-8 flex-1 w-full">
            {children}
          </main>
          <footer className="border-t bg-gray-50 dark:bg-slate-900 py-8 mt-16">
            <div className="max-w-4xl mx-auto px-4 text-center text-sm text-muted-foreground">
              <p>&copy; 2024 VibeBoard. Made with Next.js, TypeScript, and shadcn/ui</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
