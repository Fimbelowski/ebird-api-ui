import BaseIndexPage from '../../../components/BaseIndexPage/BaseIndexPage';
import type PageLink from '../../../types/PageLink';

export default function Hotspots() {
  const pageLinks: PageLink[] = [
    {
      description: 'Fetches information about a specified hotspot.',
      path: 'hotspot-info',
      title: 'Hotspot Info',
    },
    {
      description: 'Fetches hotspots within a specified country or region.',
      path: 'hotspots-in-a-region',
      title: 'Hotspots in a Region',
    },
    {
      description: 'Fetches a list of hotspots near a given location.',
      path: 'nearby-hotspots',
      title: 'Nearby Hotspots',
    },
  ];

  return (
    <BaseIndexPage
      pageLinks={pageLinks}
      title="Hotspots"
    />
  );
}
