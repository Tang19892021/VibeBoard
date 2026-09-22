import { Post, CreatePostInput, UpdatePostInput } from "@/types/post"

// In-memory storage
let posts: Post[] = [
  {
    id: "1",
    title: "첫 번째 게시물",
    content: "환영합니다! 이것은 첫 번째 게시물입니다.",
    author: "관리자",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    views: 7,
  },
  {
    id: "2",
    title: "두 번째 게시물",
    content: "NextJS와 shadcn/ui로 만든 게시판입니다.",
    author: "사용자",
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02"),
    views: 28,
  },
]

export function getAllPosts(): Post[] {
  return posts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export function getPostById(id: string): Post | undefined {
  const post = posts.find((p) => p.id === id)
  if (post) {
    post.views += 1
  }
  return post
}

export function createPost(input: CreatePostInput): Post {
  const newPost: Post = {
    id: String(posts.length + 1),
    ...input,
    createdAt: new Date(),
    updatedAt: new Date(),
    views: 0,
  }
  posts.push(newPost)
  return newPost
}

export function updatePost(id: string, input: UpdatePostInput): Post | undefined {
  const index = posts.findIndex((p) => p.id === id)
  if (index === -1) return undefined

  posts[index] = {
    ...posts[index],
    ...input,
    updatedAt: new Date(),
  }
  return posts[index]
}

export function deletePost(id: string): boolean {
  const index = posts.findIndex((p) => p.id === id)
  if (index === -1) return false

  posts.splice(index, 1)
  return true
}
