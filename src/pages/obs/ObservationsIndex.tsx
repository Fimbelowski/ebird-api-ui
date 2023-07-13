import BaseIndexPage from '../../components/BaseIndexPage/BaseIndexPage';
import type PageLink from '../../types/PageLink';

export default function ObservationsIndex() {
  const pageLinks: PageLink[] = [
    {
      description:
        'Fetches a list of all taxa seen in a country, region or location on a specific date.',
      path: 'historic-observations-on-a-date',
      requiresApiKey: true,
      title: 'Historic Observations on a Date',
    },
    {
      description:
        'Fetches the nearest locations where a species has been seen recently.',
      path: 'nearest-observations-of-a-species',
      requiresApiKey: true,
      title: 'Nearest Observations of a Species',
    },
    {
      description:
        'Fetches information on the most recently submitted checklists for a country or region.',
      path: 'recent-checklists-feed',
      requiresApiKey: true,
      title: 'Recent Checklists',
    },
    {
      description:
        'Fetches a list of notable observations of birds seen at locations near a given set of coordinates.',
      path: 'recent-nearby-notable-observations',
      requiresApiKey: true,
      title: 'Recent Nearby Notable Observations',
    },
    {
      description:
        'Fetches a list of recent observations of birds seen at locations near a given set of coordinates. Results include only the most recent observation for each species in the region specified.',
      path: 'recent-nearby-observations',
      requiresApiKey: true,
      title: 'Recent Nearby Observations',
    },
    {
      description:
        'Fetches a list of the nearest locations where a species has been seen recently.',
      path: 'recent-nearby-observations-of-a-species',
      requiresApiKey: true,
      title: 'Recent Nearby Observations of a Species',
    },
    {
      description:
        'Get the list of recent, notable observations of birds seen in a country, region or location.',
      path: 'recent-notable-observations-in-a-region',
      requiresApiKey: true,
      title: 'Recent Notable Observations in a Region',
    },
    {
      description:
        'Get the list of recent observations of birds seen in a country, state, county, or location. Results include only the most recent observation for each species in the region specified.',
      path: 'recent-observations-in-a-region',
      requiresApiKey: true,
      title: 'Recent Observations in a Region',
    },
    {
      description:
        'Get the recent observations of a particular species in a country, region or location. Results include only the most recent observation from each location in the region specified.',
      path: 'recent-observations-of-a-species-in-a-region',
      requiresApiKey: true,
      title: 'Recent Observations of a Species in a Region',
    },
  ];

  return (
    <BaseIndexPage
      description="Fetch observations submitted to eBird in checklists. Either for a specific country, region or location, or for nearby locations."
      pageLinks={pageLinks}
      title="Observations"
    />
  );
}
