"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Post } from "@/types/post"
import { searchPosts } from "@/lib/storage"

interface SearchBarProps {
  onSearch: (results: Post[]) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim()) {
        setIsLoading(true)
        const results = await searchPosts(query)
        onSearch(results)
        setIsLoading(false)
      } else {
        onSearch([])
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query, onSearch])

  return (
    <div className="mb-6">
      <Input
        placeholder="게시물 검색... (제목, 내용, 작성자)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={isLoading}
        className="text-base"
      />
      {isLoading && <p className="text-xs text-muted-foreground mt-2">검색 중...</p>}
    </div>
  )
}
