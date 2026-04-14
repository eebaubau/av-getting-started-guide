export const config = { runtime: 'edge' };

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const form = await request.formData();
  const password = form.get('password');

  if (typeof password === 'string' && password === process.env.SITE_PASSWORD) {
    const token = btoa(password);
    return new Response(null, {
      status: 303,
      headers: {
        'Set-Cookie': `av_auth=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`,
        'Location': '/',
      },
    });
  }

  return new Response(null, {
    status: 303,
    headers: { 'Location': '/login.html?error=1' },
  });
}
