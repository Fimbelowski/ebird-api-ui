import PageLink from '../PageLink/PageLink';
import type PageLinkInterface from '../../types/PageLink';

interface Props {
  pageLinks: PageLinkInterface[];
  title: string;
}

export default function BaseIndexPage({ pageLinks, title }: Props) {
  const listItems = pageLinks.map((pageLink) => (
    <PageLink
      {...pageLink}
      key={pageLink.title}
    />
  ));

  return (
    <div className="base-index-page">
      <h2 className="base-index-page__title">{title}</h2>
      <menu className="base-index-page__menu">{listItems}</menu>
    </div>
  );
}
