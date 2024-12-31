export function getProfileUrl(username: string): string {
  return `/user/${username.toLowerCase() === 'auto moderator' ? 'automoderator' : username.toLowerCase()}`;
}

export function getRoleDisplay(role: string): string | null {
  switch (role) {
    case 'supporter':
      return 'Support';
    case 'bot':
      return 'Bot';
    case 'jd_moderator':
      return 'JD Moderator';
    case 'jd_admin':
      return 'JD Admin';
    case 'jd_super_admin':
      return 'JD Super Admin';
    case 'player':
      return null;
    default:
      return role;
  }
}

export function getDisplayUsername(username: string): string {
  return username.toLowerCase() === 'auto moderator' ? '@Auto Moderator' : `@${username}`;
}

