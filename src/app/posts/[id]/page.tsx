import { cache } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getPostById } from "@/lib/storage"
import { DeletePostButton } from "@/components/DeletePostButton"

// Dedupe per-request: getPostById has a view-count side effect, and both
// generateMetadata and the page component need the same post data.
const getCachedPost = cache((id: string) => getPostById(id))

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const post = await getCachedPost(params.id)

  if (!post) {
    return { title: "게시물을 찾을 수 없습니다 - VibeBoard" }
  }

  return {
    title: `${post.title} - VibeBoard`,
    description: post.content.slice(0, 150),
  }
}

export default async function PostDetailPage({ params }: { params: { id: string } }) {
  const post = await getCachedPost(params.id)

  if (!post) {
    notFound()
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{post.title}</CardTitle>
          <CardDescription>
            {post.author} • {new Date(post.createdAt).toLocaleDateString('ko-KR')} • 조회 {post.views}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none whitespace-pre-wrap mb-6">
            {post.content}
          </div>
          <div className="flex gap-2 pt-6 border-t">
            <Button asChild variant="outline">
              <Link href="/">목록으로</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/posts/${post.id}/edit`}>수정</Link>
            </Button>
            <DeletePostButton id={post.id} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
