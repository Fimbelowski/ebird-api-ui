import type Page from '../../types/Page';

const pageLinks: Page[] = [
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

export default pageLinks;
