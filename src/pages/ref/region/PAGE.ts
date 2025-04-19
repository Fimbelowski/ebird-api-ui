import PATHS from '../../../types/PATHS';

const PAGE = {
  RegionInfo: {
    description:
      'Get information on the name and geographical area covered by a region.',
    path: PATHS.RegionInfo,
    requiresApiKey: true,
    title: 'Region Info',
  },
  SubregionList: {
    description:
      'Fetches the list of sub-regions within a specified country or region.',
    path: PATHS.SubregionList,
    requiresApiKey: true,
    title: 'Sub-region List',
  },
} as const;

export default PAGE;
