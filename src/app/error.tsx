"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Card>
      <CardHeader>
        <CardTitle>문제가 발생했습니다</CardTitle>
        <CardDescription>
          페이지를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={reset}>다시 시도</Button>
      </CardContent>
    </Card>
  )
}
