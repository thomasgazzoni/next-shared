import Cookie from 'cookie-universal';

const cookies = Cookie();

export function getCookieValue(key: string, defaultValue: any = undefined) {
  return cookies.get(key) || defaultValue;
}

export function setCookieValue(key: string, value: any) {
  return cookies.set(key, value, {
    path: '/',
    expires: new Date(Date.now() + 2592000),
  });
}
