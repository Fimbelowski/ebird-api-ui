import type PATH from './PATH';

export default interface Page {
  description: string;
  index?: boolean;
  path: (typeof PATH)[keyof typeof PATH];
  requiresApiKey?: boolean;
  title: string;
}
