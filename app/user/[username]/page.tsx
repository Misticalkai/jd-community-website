import { notFound } from 'next/navigation';
import { getUserByUsername } from '@/lib/api';
import { getRoleDisplay, getDisplayUsername } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Shield, UserIcon } from 'lucide-react';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
  const user = await getUserByUsername(params.username);
  if (!user) {
    return {
      title: 'User Not Found',
    };
  }
  return {
    title: `${user.nickname}'s Profile | Jammer Dash`,
    description: `View ${user.nickname}'s profile on Jammer Dash`,
  };
}

export default async function UserProfile({ params }: { params: { username: string } }) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  const roleDisplay = getRoleDisplay(user.role_perms);
  const displayUsername = getDisplayUsername(user.username);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto py-8 px-4">
        <Card className="max-w-2xl mx-auto bg-white dark:bg-gray-800">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={`https://api.jammerdash.com/avatars/${user.id}.png`} alt={user.nickname} />
                <AvatarFallback>
                  <UserIcon className="h-10 w-10" />
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.nickname}</h1>
                  {user.is_staff && (
                    <Badge variant="secondary" className="gap-1">
                      <Shield className="h-3 w-3" />
                      Staff
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {displayUsername}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                {roleDisplay && (
                  <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                    {roleDisplay}
                  </Badge>
                )}
                {user.is_suspended && (
                  <Badge variant="destructive">Suspended</Badge>
                )}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                ID: {user.id}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

