import PageLink from '../PageLink/PageLink';
import type PageLinkInterface from '../../types/PageLink';

interface Props {
  description: string;
  pageLinks: PageLinkInterface[];
  title: string;
}

export default function BaseIndexPage({
  description,
  pageLinks,
  title,
}: Props) {
  const listItems = pageLinks.map((pageLink) => (
    <PageLink
      {...pageLink}
      key={pageLink.title}
    />
  ));

  return (
    <div className="base-index-page">
      <h2 className="base-index-page__title">{title}</h2>
      <p className="base-index-page__description">{description}</p>
      <menu className="base-index-page__menu">{listItems}</menu>
    </div>
  );
}
