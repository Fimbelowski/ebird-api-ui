import geographyPages from '../../pages/ref/geo/pages';
import hotspotPages from '../../pages/ref/hotspot/pages';
import NavMenu from '../../components/NavMenu/NavMenu';
import observationsPages from '../../pages/obs/pages';
import productPages from '../../pages/product/pages';
import regionPages from '../../pages/ref/region/pages';
import taxonomyPages from '../../pages/ref/taxonomy/pages';

export default function Nav() {
  return (
    <nav className="nav">
      <menu className="nav__menu">
        <NavMenu
          folderLabel="Geography"
          folderPath="geography"
          pages={geographyPages}
        />
        <NavMenu
          folderLabel="Hotspots"
          folderPath="hotspots"
          pages={hotspotPages}
        />
        <NavMenu
          folderLabel="Observations"
          folderPath="observations"
          pages={observationsPages}
        />
        <NavMenu
          folderLabel="Product"
          folderPath="product"
          pages={productPages}
        />
        <NavMenu
          folderLabel="Regions"
          folderPath="regions"
          pages={regionPages}
        />
        <NavMenu
          alignToRight
          folderLabel="Taxonomy"
          folderPath="taxonomy"
          pages={taxonomyPages}
        />
      </menu>
    </nav>
  );
}
