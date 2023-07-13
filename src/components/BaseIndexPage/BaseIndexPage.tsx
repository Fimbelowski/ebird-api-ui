import { PageLink, type PageLinkProps } from '../PageLink/PageLink';

interface Props {
  pageLinks: PageLinkProps[];
  title: string;
}

export default function BaseIndexPage({ pageLinks, title }: Props) {
  const listItems = pageLinks.map(({ description, path, title }) => (
    <PageLink
      description={description}
      key={title}
      path={path}
      title={title}
    />
  ));

  return (
    <div className="base-index-page">
      <h2 className="base-index-page__title">{title}</h2>
      <menu>{listItems}</menu>
    </div>
  );
}
