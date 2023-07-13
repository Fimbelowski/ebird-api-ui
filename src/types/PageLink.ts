export default interface PageLink {
  description: string;
  index?: boolean;
  path: string;
  requiresApiKey?: boolean;
  title: string;
}
