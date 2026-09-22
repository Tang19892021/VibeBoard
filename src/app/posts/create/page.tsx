"use client"

import { useRouter } from "next/navigation"
import { PostForm } from "@/components/PostForm"
import { createPost } from "@/lib/storage"

export default function CreatePostPage() {
  const router = useRouter()

  const handleSubmit = (data: {
    title: string
    content: string
    author: string
  }) => {
    createPost(data)
    router.push("/")
  }

  return (
    <div>
      <PostForm onSubmit={handleSubmit} submitLabel="작성" />
    </div>
  )
}
