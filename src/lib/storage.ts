import { Post, CreatePostInput, UpdatePostInput } from "@/types/post"

// In-memory storage for local development
let localPosts: Post[] = [
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

let supabase: any = null

try {
  const { default: sb } = require("./supabase")
  supabase = sb
} catch (e) {
  console.log("Supabase not available, using local storage")
}

const useLocal = !supabase || !process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("http")

export async function getAllPosts(): Promise<Post[]> {
  if (useLocal) {
    return localPosts.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching posts:", error)
    return []
  }

  return (data || []).map(formatPost)
}

export async function getPostById(id: string): Promise<Post | undefined> {
  if (useLocal) {
    const post = localPosts.find((p) => p.id === id)
    if (post) {
      post.views += 1
    }
    return post
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching post:", error)
    return undefined
  }

  if (!data) return undefined

  await supabase
    .from("posts")
    .update({ views: data.views + 1 })
    .eq("id", id)

  return formatPost({ ...data, views: data.views + 1 })
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  if (useLocal) {
    const newPost: Post = {
      id: String(Date.now()),
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
    }
    localPosts.push(newPost)
    return newPost
  }

  const { data, error } = await supabase
    .from("posts")
    .insert({
      title: input.title,
      content: input.content,
      author: input.author,
      views: 0,
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create post: ${error.message}`)
  }

  return formatPost(data)
}

export async function updatePost(
  id: string,
  input: UpdatePostInput
): Promise<Post | undefined> {
  if (useLocal) {
    const index = localPosts.findIndex((p) => p.id === id)
    if (index === -1) return undefined

    localPosts[index] = {
      ...localPosts[index],
      ...input,
      updatedAt: new Date(),
    }
    return localPosts[index]
  }

  const { data, error } = await supabase
    .from("posts")
    .update({
      title: input.title,
      content: input.content,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating post:", error)
    return undefined
  }

  return formatPost(data)
}

export async function deletePost(id: string): Promise<boolean> {
  if (useLocal) {
    const index = localPosts.findIndex((p) => p.id === id)
    if (index === -1) return false
    localPosts.splice(index, 1)
    return true
  }

  const { error } = await supabase.from("posts").delete().eq("id", id)

  if (error) {
    console.error("Error deleting post:", error)
    return false
  }

  return true
}

export async function searchPosts(query: string): Promise<Post[]> {
  if (useLocal) {
    return localPosts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase()) ||
      post.author.toLowerCase().includes(query.toLowerCase())
    )
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .or(
      `title.ilike.%${query}%,content.ilike.%${query}%,author.ilike.%${query}%`
    )
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error searching posts:", error)
    return []
  }

  return (data || []).map(formatPost)
}

function formatPost(data: any): Post {
  return {
    id: String(data.id),
    title: data.title,
    content: data.content,
    author: data.author,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
    views: data.views,
  }
}
