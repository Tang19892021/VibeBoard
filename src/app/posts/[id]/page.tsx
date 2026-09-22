"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getPostById, deletePost } from "@/lib/storage"
import { Post } from "@/types/post"

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [post, setPost] = useState<Post | undefined>(undefined)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const foundPost = getPostById(params.id)
    setPost(foundPost)
  }, [params.id])

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setIsDeleting(true)
      deletePost(params.id)
      router.push("/")
    }
  }

  if (!post) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            게시물을 찾을 수 없습니다.
          </p>
        </CardContent>
      </Card>
    )
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
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "삭제 중..." : "삭제"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
