import { supabase } from "./supabase"
import { Post, CreatePostInput, UpdatePostInput } from "@/types/post"

export async function getAllPosts(): Promise<Post[]> {
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

  // Increment view count
  await supabase
    .from("posts")
    .update({ views: data.views + 1 })
    .eq("id", id)

  return formatPost({ ...data, views: data.views + 1 })
}

export async function createPost(input: CreatePostInput): Promise<Post> {
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
  const { error } = await supabase.from("posts").delete().eq("id", id)

  if (error) {
    console.error("Error deleting post:", error)
    return false
  }

  return true
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
