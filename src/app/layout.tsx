import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
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
    <html lang="ko">
      <body className="min-h-screen flex flex-col bg-background">
        <nav className="border-b bg-white sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              VibeBoard
            </Link>
            <Button asChild variant="default">
              <Link href="/posts/create">글 작성</Link>
            </Button>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto px-4 py-8 flex-1 w-full">
          {children}
        </main>
        <footer className="border-t bg-gray-50 py-8 mt-16">
          <div className="max-w-4xl mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 VibeBoard. Made with Next.js, TypeScript, and shadcn/ui</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
