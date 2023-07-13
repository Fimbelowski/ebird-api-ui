import { NavMenu, type NavMenuItem } from '../../components/NavMenu/NavMenu';

export default function Nav() {
  const geographyNavMenuItems: NavMenuItem[] = [
    {
      label: 'Adjacent Regions',
      path: 'adjacent-regions',
    },
  ];

  const hotspotNavMenuItems: NavMenuItem[] = [
    {
      label: 'Hotspot Info',
      path: 'hotspot-info',
    },
    {
      label: 'Hotspots in a Region',
      path: 'hotspots-in-a-region',
    },
    {
      label: 'Nearby Hotspots',
      path: 'nearby-hotspots',
    },
  ];

  const observationNavMenuItems: NavMenuItem[] = [
    {
      label: 'Historic Observations on a Date',
      path: 'historic-observations-on-a-date',
    },
    {
      label: 'Nearest Observations of a Species',
      path: 'nearest-observations-of-a-species',
    },
    {
      label: 'Recent Checklists Feed',
      path: 'recent-checklists-feed',
    },
    {
      label: 'Recent Nearby Notable Observations',
      path: 'recent-nearby-notable-observations',
    },
    {
      label: 'Recent Nearby Observations',
      path: 'recent-nearby-observations',
    },
    {
      label: 'Recent Nearby Observations of a Species',
      path: 'recent-nearby-observations-of-a-species',
    },
    {
      label: 'Recent Notable Observations in a Region',
      path: 'recent-notable-observations-in-a-region',
    },
    {
      label: 'Recent Observations in a Region',
      path: 'recent-observations-in-a-region',
    },
    {
      label: 'Recent Observations of a Species in a Region',
      path: 'recent-observations-of-a-species-in-a-region',
    },
  ];

  const productNavMenuItems: NavMenuItem[] = [
    {
      label: 'Checklist Feed on a Date',
      path: 'checklist-feed-on-a-date',
    },
    {
      label: 'Regional Statistics on a Date',
      path: 'regional-statistics-on-a-date',
    },
    {
      label: 'Species List for a Region',
      path: 'species-list-for-a-region',
    },
    {
      label: 'Top 100 Contributors',
      path: 'top-100',
    },
    {
      label: 'View Checklist',
      path: 'view-checklist',
    },
  ];

  const regionNavMenuItems: NavMenuItem[] = [
    {
      label: 'Region Info',
      path: 'region-info',
    },
    {
      label: 'Sub-region List',
      path: 'sub-region-list',
    },
  ];

  const taxonomyNavMenuItems: NavMenuItem[] = [
    {
      label: 'eBird Taxonomy',
      path: 'ebird-taxonomy',
    },
    {
      label: 'Taxa Locale Codes',
      path: 'taxa-locale-codes',
    },
    {
      label: 'Taxonomic Forms',
      path: 'taxonomic-forms',
    },
    {
      label: 'Taxonomic Groups',
      path: 'taxonomic-groups',
    },
    {
      label: 'Taxonomy Versions',
      path: 'taxonomy-versions',
    },
  ];

  return (
    <nav className="nav">
      <menu className="nav__menu">
        <NavMenu
          folderLabel="Geography"
          folderPath="geography"
          menuItems={geographyNavMenuItems}
        />
        <NavMenu
          folderLabel="Hotspots"
          folderPath="hotspots"
          menuItems={hotspotNavMenuItems}
        />
        <NavMenu
          folderLabel="Observations"
          folderPath="observations"
          menuItems={observationNavMenuItems}
        />
        <NavMenu
          folderLabel="Product"
          folderPath="product"
          menuItems={productNavMenuItems}
        />
        <NavMenu
          folderLabel="Regions"
          folderPath="regions"
          menuItems={regionNavMenuItems}
        />
        <NavMenu
          alignToRight
          folderLabel="Taxonomy"
          folderPath="taxonomy"
          menuItems={taxonomyNavMenuItems}
        />
      </menu>
    </nav>
  );
}
