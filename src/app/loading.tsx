import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div>
      <div className="mb-8">
        <div className="h-10 w-32 bg-muted rounded animate-pulse mb-2" />
        <div className="h-5 w-24 bg-muted rounded animate-pulse" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-6 w-2/3 bg-muted rounded animate-pulse mb-2" />
              <div className="h-4 w-1/3 bg-muted rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-4 w-full bg-muted rounded animate-pulse mb-2" />
              <div className="h-4 w-4/5 bg-muted rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
