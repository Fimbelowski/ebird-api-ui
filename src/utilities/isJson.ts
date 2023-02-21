export default function isJson(text: string) {
  try {
    JSON.parse(text);
  } catch (e) {
    return false;
  }

  return true;
}
