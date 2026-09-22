"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { deletePost } from "@/lib/storage"

export function DeletePostButton({ id }: { id: string }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setIsDeleting(true)
      await deletePost(id)
      router.push("/")
    }
  }

  return (
    <Button
      variant="destructive"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? "삭제 중..." : "삭제"}
    </Button>
  )
}
