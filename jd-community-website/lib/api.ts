import { cache } from 'react'

export interface User {
  id: string;
  nickname: string;
  username: string;
  role_perms: string;
  is_staff: boolean;
  is_suspended: boolean;
}

interface UserListResponse {
  total: number;
  users: Array<{
    uuid: string;
    username: string;
  }>;
}

const userCache = new Map<string, User>();

async function fetchAllUsers(): Promise<UserListResponse> {
  const res = await fetch('https://api.jammerdash.com/v1/account/uuid', { next: { revalidate: 300 } });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

async function fetchUserByUUID(uuid: string): Promise<User | null> {
  try {
    const res = await fetch(`https://api.jammerdash.com/v1/account/${uuid}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const user = await res.json();
    userCache.set(user.username.toLowerCase(), user);
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export const getUserByUsername = cache(async (username: string): Promise<User | null> => {
  const searchUsername = username.toLowerCase() === 'automoderator' ? 'auto moderator' : username.toLowerCase();
  
  if (userCache.has(searchUsername)) {
    return userCache.get(searchUsername)!;
  }

  const userList = await fetchAllUsers();
  const userInfo = userList.users.find(u => u.username.toLowerCase() === searchUsername);

  if (!userInfo) {
    return null;
  }

  const user = await fetchUserByUUID(userInfo.uuid);
  if (user) {
    userCache.set(searchUsername, user);
  }

  return user;
});

