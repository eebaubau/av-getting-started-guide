export const config = {
  matcher: ['/((?!_next|favicon.ico|api/).*)'],
};

export default function middleware(request) {
  const auth = request.headers.get('authorization');

  if (auth) {
    const [scheme, encoded] = auth.split(' ');
    if (scheme === 'Basic' && encoded) {
      const decoded = atob(encoded);
      const idx = decoded.indexOf(':');
      const user = decoded.slice(0, idx);
      const pass = decoded.slice(idx + 1);
      if (user === 'angeles' && pass === process.env.SITE_PASSWORD) {
        return;
      }
    }
  }

  return new Response('Authentication required. envset=' + (process.env.SITE_PASSWORD ? 'yes:' + process.env.SITE_PASSWORD.length : 'no') + ' authhdr=' + (auth ? 'yes' : 'no'), {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Angeles Ventures", charset="UTF-8"',
    },
  });
}
