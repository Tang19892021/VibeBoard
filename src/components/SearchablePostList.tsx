"use client"

import { useState } from "react"
import { Post } from "@/types/post"
import { SearchBar } from "@/components/SearchBar"
import { PostList } from "@/components/PostList"

interface SearchablePostListProps {
  initialPosts: Post[]
}

export function SearchablePostList({ initialPosts }: SearchablePostListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = (results: Post[]) => {
    setPosts(results)
    setHasSearched(true)
  }

  const handleReset = () => {
    setPosts(initialPosts)
    setHasSearched(false)
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {hasSearched && (
        <div className="mb-4 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            검색 결과: {posts.length}개
          </p>
          <button
            onClick={handleReset}
            className="text-sm text-blue-600 hover:underline"
          >
            전체 보기
          </button>
        </div>
      )}
      <PostList posts={posts} />
    </div>
  )
}
