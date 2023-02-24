import { Link } from 'react-router-dom';
import { useState } from 'react';

import classNames from '../utilities/classNames';
import type NavMenuItem from '../types/NavMenuItem';

interface Props {
  items: NavMenuItem[];
  label: string;
  menuAlignment?: 'left' | 'right';
}

export default function NavMenu({
  items,
  label,
  menuAlignment = 'left',
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  function menuClasses() {
    return classNames([
      'nav-menu__menu',
      `nav-menu__menu--align-${menuAlignment}`,
      isHovered ? '' : 'nav-menu__menu--hidden',
    ]);
  }

  function MenuItems() {
    const listItems = items.map(({ label, path }, index) => (
      <li
        className="nav-menu__item"
        key={index}
      >
        <Link
          className="nav-menu__link"
          to={path}
        >
          {label}
        </Link>
      </li>
    ));

    return <>{listItems}</>;
  }

  function onMouseEnter() {
    setIsHovered(true);
  }

  function onMouseLeave() {
    setIsHovered(false);
  }

  return (
    <div
      className="nav-menu__label"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {label}
      <menu className={menuClasses()}>
        <MenuItems />
      </menu>
    </div>
  );
}
