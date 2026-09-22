import { getPostById } from "@/lib/storage"
import { Card, CardContent } from "@/components/ui/card"
import { EditPostForm } from "@/components/EditPostForm"

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id)

  if (!post) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            게시물을 찾을 수 없습니다.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div>
      <EditPostForm
        id={params.id}
        initialData={{
          title: post.title,
          content: post.content,
          author: post.author,
        }}
      />
    </div>
  )
}
