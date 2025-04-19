import type PATHS from '../utilities/PATHS';

export default interface Page {
  description: string;
  index?: boolean;
  path: (typeof PATHS)[keyof typeof PATHS];
  requiresApiKey?: boolean;
  title: string;
}
