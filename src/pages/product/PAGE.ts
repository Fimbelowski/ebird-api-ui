import PATH from '../../types/PATH';

const PAGE = {
  ChecklistFeedOnADate: {
    description:
      'Fetches information on the checklists submitted on a given date for a country or region.',
    path: PATH.ChecklistFeedOnADate,
    requiresApiKey: true,
    title: 'Checklist Feed on a Date',
  },
  RegionalStatisticsOnADate: {
    description:
      'Fetches a summary of the number of checklists submitted, species seen and contributors on a given date for a country or region.',
    path: PATH.RegionalStatisticsOnADate,
    requiresApiKey: true,
    title: 'Regional Statistics on a Date',
  },
  SpeciesListForARegion: {
    description:
      'Fetches a list of species codes for species ever seen in a region, in taxonomic order (species taxa only).',
    path: PATH.SpeciesListForARegion,
    requiresApiKey: true,
    title: 'Species List for a Region',
  },
  Top100: {
    description:
      'Fetches the top 100 contributors on a given date for a country or region.',
    path: PATH.Top100,
    requiresApiKey: true,
    title: 'Top 100 Contributors',
  },
  ViewChecklist: {
    description: 'Fetches the details and observations of a given checklist.',
    path: PATH.ViewChecklist,
    requiresApiKey: true,
    title: 'View Checklist',
  },
} as const;

export default PAGE;
