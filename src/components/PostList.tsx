"use client"

import Link from "next/link"
import { Post } from "@/types/post"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PostListProps {
  posts: Post[]
}

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            게시물이 없습니다.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="hover:shadow-lg dark:hover:shadow-lg/20 transition-all duration-200 hover:border-blue-200 dark:hover:border-blue-800"
        >
          <CardHeader>
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <Link href={`/posts/${post.id}`}>
                  <CardTitle className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer truncate">
                    {post.title}
                  </CardTitle>
                </Link>
                <CardDescription className="mt-2">
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="font-medium text-foreground">{post.author}</span>
                    <span>•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString('ko-KR')}</span>
                    <span>•</span>
                    <span>👁️ {post.views}</span>
                  </div>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {post.content}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
