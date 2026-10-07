export function apiUrl(path: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const vercelUrl = process.env.VERCEL_URL;
  const baseUrl =
    appUrl ?? (vercelUrl ? `https://${vercelUrl}` : 'http://localhost:3000');
  const origin =
    typeof window === 'undefined' ? baseUrl : window.location.origin;

  return new URL(path, origin);
}
