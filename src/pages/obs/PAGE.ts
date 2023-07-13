import Path from '../../types/PATH';

const PAGE = {
  HistoricObservationsOnADate: {
    description:
      'Fetches a list of all taxa seen in a country, region or location on a specific date.',
    path: Path.HistoricObservationsOnADate,
    requiresApiKey: true,
    title: 'Historic Observations on a Date',
  },
  NearestObservationsOfASpecies: {
    description:
      'Fetches the nearest locations where a species has been seen recently.',
    path: Path.NearestObservationsOfASpecies,
    requiresApiKey: true,
    title: 'Nearest Observations of a Species',
  },
  RecentChecklists: {
    description:
      'Fetches information on the most recently submitted checklists for a country or region.',
    path: Path.RecentChecklistsFeed,
    requiresApiKey: true,
    title: 'Recent Checklists',
  },
  RecentNearbyNotableObservations: {
    description:
      'Fetches a list of notable observations of birds seen at locations near a given set of coordinates.',
    path: Path.RecentNearbyNotableObservations,
    requiresApiKey: true,
    title: 'Recent Nearby Notable Observations',
  },
  RecentNearbyObservations: {
    description:
      'Fetches a list of recent observations of birds seen at locations near a given set of coordinates. Results include only the most recent observation for each species in the region specified.',
    path: Path.RecentNearbyObservations,
    requiresApiKey: true,
    title: 'Recent Nearby Observations',
  },
  RecentNearbyObservationsOfASpecies: {
    description:
      'Fetches a list of the nearest locations where a species has been seen recently.',
    path: Path.RecentNearbyObservationsOfASPecies,
    requiresApiKey: true,
    title: 'Recent Nearby Observations of a Species',
  },
  RecentNotableObservationsInARegion: {
    description:
      'Get the list of recent, notable observations of birds seen in a country, region or location.',
    path: Path.RecentNotableObservationsInARegion,
    requiresApiKey: true,
    title: 'Recent Notable Observations in a Region',
  },
  RecentObservationsInAregion: {
    description:
      'Get the list of recent observations of birds seen in a country, state, county, or location. Results include only the most recent observation for each species in the region specified.',
    path: Path.RecentObservationsInARegion,
    requiresApiKey: true,
    title: 'Recent Observations in a Region',
  },
  RecentObservationsOfASpeciesInARegion: {
    description:
      'Get the recent observations of a particular species in a country, region or location. Results include only the most recent observation from each location in the region specified.',
    path: Path.RecentObservationsOfASpeciesInARegion,
    requiresApiKey: true,
    title: 'Recent Observations of a Species in a Region',
  },
} as const;

export default PAGE;
