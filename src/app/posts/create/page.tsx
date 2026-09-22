"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PostForm } from "@/components/PostForm"
import { createPost } from "@/lib/storage"

export default function CreatePostPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: {
    title: string
    content: string
    author: string
  }) => {
    setIsLoading(true)
    try {
      await createPost(data)
      router.push("/")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <PostForm onSubmit={handleSubmit} isLoading={isLoading} submitLabel="작성" />
    </div>
  )
}
