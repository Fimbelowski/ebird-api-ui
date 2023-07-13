import type PageLink from '../../../types/PageLink';

const pageLinks: PageLink[] = [
  {
    description:
      'Get information on the name and geographical area covered by a region.',
    path: 'region-info',
    requiresApiKey: true,
    title: 'Region Info',
  },
  {
    description:
      'Fetches the list of sub-regions within a specified country or region.',
    path: 'sub-region-list',
    requiresApiKey: true,
    title: 'Sub-region List',
  },
];

export default pageLinks;
