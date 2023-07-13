const BASE_PATH = '/';

enum FolderPath {
  Geography = `${BASE_PATH}geography`,
  Hotspots = `${BASE_PATH}hotspots`,
  Observations = `${BASE_PATH}observations`,
  Product = `${BASE_PATH}product`,
  Regions = `${BASE_PATH}regions`,
  Taxonomy = `${BASE_PATH}taxonomy`,
}

enum Path {
  AdjacentRegions = `${FolderPath.Geography}/adjacent-regions`,
  ChecklistFeedOnADate = `${FolderPath.Product}/checklist-feed-on-a-date`,
  EbirdTaxonomy = `${FolderPath.Taxonomy}/ebird-taxonomy`,
  Geography = FolderPath.Geography,
  HistoricObservationsOnADate = `${FolderPath.Observations}/historic-observations-on-a-date`,
  HotspotInfo = `${FolderPath.Hotspots}/hotspot-info`,
  Hotspots = FolderPath.Hotspots,
  HotspotsInARegion = `${FolderPath.Hotspots}/hotspots-in-a-region`,
  NearbyHotspots = `${FolderPath.Hotspots}/nearby-hotspots`,
  NearestObservationsOfASpeces = `${FolderPath.Observations}/nearest-observations-of-a-species`,
  Observations = FolderPath.Observations,
  Product = FolderPath.Product,
  RecentChecklistsFeed = `${FolderPath.Observations}/recent-checklists-feed`,
  RecentNearbyNotableObservations = `${FolderPath.Observations}/recent-nearby-notable-observations`,
  RecentNearbyObservations = `${FolderPath.Observations}/recent-nearby-observations`,
  RecentNearbyObservationsOfASPecies = `${FolderPath.Observations}/recent-nearby-observations-of-a-species`,
  RecentNotableObservationsInARegion = `${FolderPath.Observations}/recent-notable-observations-in-a-region`,
  RecentObservationsInARegion = `${FolderPath.Observations}/recent-observations-in-a-region`,
  RecentObservationsOfASpeciesInARegion = `${FolderPath.Observations}/recent-observations-of-a-species-in-a-region`,
  RegionalStatisticsOnADate = `${FolderPath.Product}/regional-statistics-on-a-date`,
  RegionInfo = `${FolderPath.Regions}/region-info`,
  Regions = FolderPath.Regions,
  Root = BASE_PATH,
  SpeciesListForARegion = `${FolderPath.Product}/species-list-for-a-region`,
  SubregionList = `${FolderPath.Regions}/sub-region-list`,
  TaxaLocaleCodes = `${FolderPath.Taxonomy}/taxa-locale-codes`,
  TaxonomicForms = `${FolderPath.Taxonomy}/taxonomic-forms`,
  TaxonomicGroups = `${FolderPath.Taxonomy}/taxonomic-groups`,
  Taxonomy = FolderPath.Taxonomy,
  TaxonomyVersions = `${FolderPath.Taxonomy}/taxonomy-versions`,
  Top100 = `${FolderPath.Product}/top-100`,
  ViewChecklist = `${FolderPath.Product}/view-checklist`,
}

export default Path;
