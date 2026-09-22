import { PostList } from "@/components/PostList"
import { SearchablePostList } from "@/components/SearchablePostList"
import { getAllPosts } from "@/lib/storage"

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">게시판</h1>
        <p className="text-muted-foreground">
          전체 게시물 {posts.length}개
        </p>
      </div>
      <SearchablePostList initialPosts={posts} />
    </div>
  )
}
