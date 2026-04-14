export const config = {
  matcher: ['/((?!_next|favicon\\.ico|login\\.html|api/login).*)'],
};

export default function middleware(request) {
  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(/(?:^|;\s*)av_auth=([^;]+)/);

  if (match) {
    try {
      if (atob(match[1]) === process.env.SITE_PASSWORD) {
        return;
      }
    } catch {}
  }

  const url = new URL(request.url);
  url.pathname = '/login.html';
  url.search = '';
  return Response.redirect(url, 302);
}
