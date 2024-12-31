export function getProfileUrl(username: string): string {
  // Handle the special case for Auto Moderator
  if (username === 'Auto Moderator') {
    return '/user/automoderator'
  }
  return `/user/${username.toLowerCase()}`
}

