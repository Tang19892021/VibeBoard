"use client"

import { FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PostFormProps {
  onSubmit: (data: {
    title: string
    content: string
    author: string
  }) => void | Promise<void>
  isLoading?: boolean
  initialData?: {
    title: string
    content: string
    author: string
  }
  submitLabel?: string
}

export function PostForm({
  onSubmit,
  isLoading = false,
  initialData,
  submitLabel = "등록",
}: PostFormProps) {
  const [title, setTitle] = useState(initialData?.title || "")
  const [content, setContent] = useState(initialData?.content || "")
  const [author, setAuthor] = useState(initialData?.author || "")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title.trim() || !content.trim() || !author.trim()) {
      alert("모든 항목을 입력해주세요.")
      return
    }
    await onSubmit({ title, content, author })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>게시물 {submitLabel}</CardTitle>
        <CardDescription>
          제목, 내용, 작성자를 입력하세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">작성자</label>
            <Input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="이름을 입력하세요"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="text-sm font-medium">제목</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="text-sm font-medium">내용</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력하세요"
              rows={8}
              disabled={isLoading}
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "처리 중..." : submitLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
