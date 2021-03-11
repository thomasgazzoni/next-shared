import Cookie from 'cookie-universal';

const cookies = Cookie();

export function getCookieValue(key: string, defaultValue: any = undefined) {
  return cookies.get(key) || defaultValue;
}

export function setCookieValue(key: string, value: any) {
  const expires = new Date();
  expires.setDate(expires.getDate() + 180);
  return cookies.set(key, value, {
    path: '/',
    expires: expires,
  });
}
