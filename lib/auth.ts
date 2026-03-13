export function generateToken() {
  return 'token_' + Date.now();
}

export function verifyToken(token: string) {
  return !!token && token.startsWith('token_');
}

export function getAdminFromToken(token: string) {
  if (!verifyToken(token)) return null;
  return { id: '1', email: 'admin@example.com', role: 'admin' };
}
