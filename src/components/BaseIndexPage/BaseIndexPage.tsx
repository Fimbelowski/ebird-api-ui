import PageLink from '../PageLink/PageLink';
import type Page from '../../types/Page';

interface Props {
  description: string;
  pages: Page[];
  title?: string;
}

export default function BaseIndexPage({ description, pages, title }: Props) {
  const listItems = pages.map((pageLink) => (
    <PageLink
      {...pageLink}
      key={pageLink.title}
    />
  ));

  return (
    <div className="base-index-page">
      {title === undefined ? null : (
        <h2 className="base-index-page__title">{title}</h2>
      )}
      <p className="base-index-page__description">{description}</p>
      <menu className="base-index-page__menu">{listItems}</menu>
    </div>
  );
}
