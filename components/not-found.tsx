import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="container flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400">The requested user profile does not exist.</p>
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  )
}

