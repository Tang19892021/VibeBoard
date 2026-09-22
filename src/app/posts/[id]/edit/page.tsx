"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PostForm } from "@/components/PostForm"
import { getPostById, updatePost } from "@/lib/storage"
import { Post } from "@/types/post"
import { Card, CardContent } from "@/components/ui/card"

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [post, setPost] = useState<Post | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const foundPost = getPostById(params.id)
    setPost(foundPost)
  }, [params.id])

  const handleSubmit = (data: {
    title: string
    content: string
    author: string
  }) => {
    setIsLoading(true)
    updatePost(params.id, {
      title: data.title,
      content: data.content,
    })
    router.push(`/posts/${params.id}`)
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
      <PostForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        initialData={{
          title: post.title,
          content: post.content,
          author: post.author,
        }}
        submitLabel="수정"
      />
    </div>
  )
}
