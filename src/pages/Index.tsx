import BaseIndexPage from '../components/BaseIndexPage/BaseIndexPage';
import type Page from '../types/Page';

export default function Index() {
  const pages: Page[] = [
    {
      description: "Find a country's or region's neighbors.",
      index: true,
      path: 'geography',
      title: 'Geography',
    },
    {
      description:
        'Find the hotspots for a given country or region or nearby hotspots.',
      index: true,
      path: 'hotspots',
      title: 'Hotspots',
    },
    {
      description:
        'Fetch observations submitted to eBird in checklists. Either for a specific country, region or location, or for nearby locations.',
      index: true,
      path: 'observations',
      title: 'Observations',
    },
    {
      description:
        'Product end-points make it easy to get the information shown in various pages on the eBird web site (Top 100 Contributors, checklist data, etc.)',
      index: true,
      path: 'product',
      title: 'Product',
    },
    {
      description:
        'Get information about a specific region or get a list of all regions within a given region.',
      index: true,
      path: 'regions',
      title: 'Regions',
    },
    {
      description:
        'Get taxonomic information about species as well as information about the taxonomy itself.',
      index: true,
      path: 'taxonomy',
      title: 'Taxonomy',
    },
  ];

  return (
    <BaseIndexPage
      description="eBird API UI wraps all 25 of the eBird API's endpoints, allowing you to make API requests easily."
      pages={pages}
      title=""
    />
  );
}
