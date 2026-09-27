// lib/auth.ts
export function getSessionToken(): string {
  return process.env.ADMIN_SESSION_TOKEN || "";
}

export function verifyPassword(input: string): boolean {
  return input === process.env.ADMIN_PASSWORD;
}