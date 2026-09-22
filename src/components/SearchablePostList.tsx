"use client"

import { useState, useMemo } from "react"
import { Post } from "@/types/post"
import { SearchBar } from "@/components/SearchBar"
import { PostList } from "@/components/PostList"
import { Pagination } from "@/components/Pagination"

interface SearchablePostListProps {
  initialPosts: Post[]
}

const POSTS_PER_PAGE = 10

export function SearchablePostList({ initialPosts }: SearchablePostListProps) {
  const [allPosts, setAllPosts] = useState<Post[]>(initialPosts)
  const [hasSearched, setHasSearched] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const paginatedPosts = useMemo(() => {
    const startIdx = (currentPage - 1) * POSTS_PER_PAGE
    const endIdx = startIdx + POSTS_PER_PAGE
    return allPosts.slice(startIdx, endIdx)
  }, [allPosts, currentPage])

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)

  const handleSearch = (results: Post[]) => {
    setAllPosts(results)
    setHasSearched(true)
    setCurrentPage(1)
  }

  const handleReset = () => {
    setAllPosts(initialPosts)
    setHasSearched(false)
    setCurrentPage(1)
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {hasSearched && (
        <div className="mb-4 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            검색 결과: {allPosts.length}개
          </p>
          <button
            onClick={handleReset}
            className="text-sm text-blue-600 hover:underline"
          >
            전체 보기
          </button>
        </div>
      )}
      <PostList posts={paginatedPosts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
