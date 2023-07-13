import { Link } from 'react-router-dom';
import { useState } from 'react';

import classNames from '../../utilities/classNames';
import type Page from '../../types/Page';

interface Props {
  alignToRight?: boolean;
  folderLabel: string;
  folderPath: string;
  pages: Page[];
}

export default function NavMenu({
  alignToRight = false,
  folderLabel,
  folderPath,
  pages,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  function Menu() {
    const listItems = pages.map(({ path, title }) => (
      <Link
        className="nav-menu__link"
        key={path}
        to={path}
      >
        {title}
      </Link>
    ));

    return <menu className={menuClasses()}>{listItems}</menu>;
  }

  function containerClasses() {
    return classNames(['nav-menu', { 'nav-menu--hovered': isHovered }]);
  }

  function menuClasses() {
    return classNames([
      'nav-menu__menu',
      { 'nav-menu__menu--right': alignToRight },
    ]);
  }

  function onMouseEnter() {
    setIsHovered(true);
  }

  function onMouseLeave() {
    setIsHovered(false);
  }

  return (
    <div
      className={containerClasses()}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link
        className="nav-menu__link"
        to={folderPath}
      >
        {folderLabel}
      </Link>
      {isHovered ? <Menu /> : null}
    </div>
  );
}
