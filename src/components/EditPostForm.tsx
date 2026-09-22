"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PostForm } from "@/components/PostForm"
import { updatePost } from "@/lib/storage"

interface EditPostFormProps {
  id: string
  initialData: {
    title: string
    content: string
    author: string
  }
}

export function EditPostForm({ id, initialData }: EditPostFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: {
    title: string
    content: string
    author: string
  }) => {
    setIsLoading(true)
    try {
      await updatePost(id, {
        title: data.title,
        content: data.content,
      })
      router.push(`/posts/${id}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PostForm
      onSubmit={handleSubmit}
      isLoading={isLoading}
      initialData={initialData}
      submitLabel="수정"
    />
  )
}
