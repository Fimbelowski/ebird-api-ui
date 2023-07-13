export default interface Page {
  description: string;
  index?: boolean;
  path: string;
  requiresApiKey?: boolean;
  title: string;
}
