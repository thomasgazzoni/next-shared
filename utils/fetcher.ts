export default async function fetcher<T = any>(
  endpoint: string,
  options?: RequestInit,
) {
  const res = await fetch(endpoint, options);
  return res.json() as Promise<T>;
}
