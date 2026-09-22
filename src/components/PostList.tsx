"use client"

import Link from "next/link"
import { Post } from "@/types/post"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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
        <Card key={post.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <Link href={`/posts/${post.id}`}>
                  <CardTitle className="hover:underline cursor-pointer">
                    {post.title}
                  </CardTitle>
                </Link>
                <CardDescription>
                  {post.author} • {new Date(post.createdAt).toLocaleDateString('ko-KR')} • 조회 {post.views}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {post.content}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
