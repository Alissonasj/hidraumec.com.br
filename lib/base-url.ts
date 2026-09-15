export function baseUrl() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const vercelUrl = process.env.VERCEL_URL;
  const baseUrl =
    appUrl ?? (vercelUrl ? `https://${vercelUrl}` : 'http://localhost:3000');

  return baseUrl;
}
