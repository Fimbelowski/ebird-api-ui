import BaseIndexPage from '../../../components/BaseIndexPage/BaseIndexPage';
import type { PageLinkProps } from '../../../components/PageLink/PageLink';

export default function Geography() {
  const pageLinks: PageLinkProps[] = [
    {
      description:
        'Fetches the list of countries or regions that share a border with the specified region.',
      path: 'adjacent-regions',
      title: 'Adjacent Regions',
    },
  ];

  return (
    <BaseIndexPage
      pageLinks={pageLinks}
      title="Geography"
    />
  );
}
