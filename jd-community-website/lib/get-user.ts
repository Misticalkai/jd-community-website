export interface User {
  id: string
  nickname: string
  username: string
  role_perms: string
  is_staff: boolean
  is_suspended: boolean
}

export async function getUserByUsername(username: string): Promise<User> {
  // Handle the special case for Auto Moderator
  const searchUsername = username === 'automoderator' ? 'Auto Moderator' : username
  
  // First get all users to find the matching username
  const res = await fetch('https://api.jammerdash.com/v1/accounts')
  
  if (!res.ok) {
    throw new Error('Failed to fetch users')
  }
  
  const users: User[] = await res.json()
  const user = users.find(u => u.username.toLowerCase() === searchUsername.toLowerCase())
  
  if (!user) {
    throw new Error('User not found')
  }
  
  // Now fetch the specific user details
  const userRes = await fetch(`https://api.jammerdash.com/v1/account/${user.id}`)
  
  if (!userRes.ok) {
    throw new Error('Failed to fetch user details')
  }
  
  return userRes.json()
}

