export default async function parseResponseAsJson<T>(response: Response) {
  return (await response.json()) as T;
}
