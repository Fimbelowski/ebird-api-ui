import PATH from '../../../types/PATH';

const PAGE = {
  AdjacentRegions: {
    description:
      'Fetches the list of countries or regions that share a border with the specified region.',
    path: PATH.AdjacentRegions,
    requiresApiKey: true,
    title: 'Adjacent Regions',
  },
} as const;

export default PAGE;
