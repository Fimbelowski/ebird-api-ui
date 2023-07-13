import BaseIndexPage from '../../../components/BaseIndexPage/BaseIndexPage';
import type PageLink from '../../../types/PageLink';

export default function GeographyIndex() {
  const pageLinks: PageLink[] = [
    {
      description:
        'Fetches the list of countries or regions that share a border with the specified region.',
      path: 'adjacent-regions',
      requiresApiKey: true,
      title: 'Adjacent Regions',
    },
  ];

  return (
    <BaseIndexPage
      description="Find a country's or region's neighbors."
      pageLinks={pageLinks}
      title="Geography"
    />
  );
}
