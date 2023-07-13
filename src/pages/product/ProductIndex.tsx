import BaseIndexPage from '../../components/BaseIndexPage/BaseIndexPage';
import type PageLink from '../../types/PageLink';

export default function ProductIndex() {
  const pageLinks: PageLink[] = [
    {
      description:
        'Fetches information on the checklists submitted on a given date for a country or region.',
      path: 'checklist-feed-on-a-date',
      requiresApiKey: true,
      title: 'Checklist Feed on a Date',
    },
    {
      description:
        'Fetches a summary of the number of checklists submitted, species seen and contributors on a given date for a country or region.',
      path: 'regional-statistics-on-a-date',
      requiresApiKey: true,
      title: 'Regional Statistics on a Date',
    },
    {
      description:
        'Fetches a list of species codes for species ever seen in a region, in taxonomic order (species taxa only).',
      path: 'species-list-for-a-region',
      requiresApiKey: true,
      title: 'Species List for a Region',
    },
    {
      description:
        'Fetches the top 100 contributors on a given date for a country or region.',
      path: 'top-100',
      requiresApiKey: true,
      title: 'Top 100 Contributors',
    },
    {
      description: 'Fetches the details and observations of a given checklist.',
      path: 'view-checklist',
      requiresApiKey: true,
      title: 'View Checklist',
    },
  ];

  return (
    <BaseIndexPage
      description="Product end-points make it easy to get the information shown in various pages on the eBird web site (Top 100 Contributors, checklist data, etc.)"
      pageLinks={pageLinks}
      title="Product"
    />
  );
}
