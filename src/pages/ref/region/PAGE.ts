import PATH from '../../../types/PATH';

const PAGE = {
  RegionInfo: {
    description:
      'Get information on the name and geographical area covered by a region.',
    path: PATH.RegionInfo,
    requiresApiKey: true,
    title: 'Region Info',
  },
  SubregionList: {
    description:
      'Fetches the list of sub-regions within a specified country or region.',
    path: PATH.SubregionList,
    requiresApiKey: true,
    title: 'Sub-region List',
  },
} as const;

export default PAGE;
