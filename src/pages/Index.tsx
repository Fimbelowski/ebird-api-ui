import BaseIndexPage from '../components/BaseIndexPage/BaseIndexPage';
import type Page from '../types/Page';
import Path from '../types/PATH';

export default function Index() {
  const pages: Page[] = [
    {
      description: "Find a country's or region's neighbors.",
      index: true,
      path: Path.Geography,
      title: 'Geography',
    },
    {
      description:
        'Find the hotspots for a given country or region or nearby hotspots.',
      index: true,
      path: Path.Hotspots,
      title: 'Hotspots',
    },
    {
      description:
        'Fetch observations submitted to eBird in checklists. Either for a specific country, region or location, or for nearby locations.',
      index: true,
      path: Path.Observations,
      title: 'Observations',
    },
    {
      description:
        'Product end-points make it easy to get the information shown in various pages on the eBird web site (Top 100 Contributors, checklist data, etc.)',
      index: true,
      path: Path.Product,
      title: 'Product',
    },
    {
      description:
        'Get information about a specific region or get a list of all regions within a given region.',
      index: true,
      path: Path.Regions,
      title: 'Regions',
    },
    {
      description:
        'Get taxonomic information about species as well as information about the taxonomy itself.',
      index: true,
      path: Path.Taxonomy,
      title: 'Taxonomy',
    },
  ];

  return (
    <BaseIndexPage
      description="eBird API UI wraps all 25 of the eBird API's endpoints, making it easy to make API requests."
      pages={pages}
    />
  );
}
