import { Link } from 'react-router-dom';
import { useState } from 'react';

import classNames from '../../utilities/classNames';

export interface NavMenuItem {
  label: string;
  path: string;
}

interface Props {
  alignToRight?: boolean;
  folderLabel: string;
  folderPath: string;
  menuItems: NavMenuItem[];
}

export function NavMenu({
  alignToRight = false,
  folderLabel,
  folderPath,
  menuItems,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  function Menu() {
    const listItems = menuItems.map(({ label, path }) => (
      <Link
        className="nav-menu__link"
        key={path}
        to={`${folderPath}/${path}`}
      >
        {label}
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
        to={folderLabel}
      >
        {folderLabel}
      </Link>
      {isHovered ? <Menu /> : null}
    </div>
  );
}
