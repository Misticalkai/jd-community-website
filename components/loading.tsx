import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto py-8 px-4">
        <Card className="max-w-2xl mx-auto bg-white dark:bg-gray-800">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-20 w-20 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-40 bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-4 w-48 bg-gray-200 dark:bg-gray-700" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

