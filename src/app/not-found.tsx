import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotFound() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>페이지를 찾을 수 없습니다</CardTitle>
        <CardDescription>
          요청하신 페이지가 존재하지 않거나 삭제되었습니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild>
          <Link href="/">홈으로 돌아가기</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
