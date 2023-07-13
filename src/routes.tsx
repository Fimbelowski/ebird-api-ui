import { createRoutesFromChildren, Route } from 'react-router-dom';

import AdjacentRegions from './pages/ref/geo/AdjacentRegions';
import BaseIndexPage from './components/BaseIndexPage/BaseIndexPage';
import ChecklistFeedOnADate from './pages/product/ChecklistFeedOnADate';
import EbirdTaxonomy from './pages/ref/taxonomy/EbirdTaxonomy';
import geographyPages from './pages/ref/geo/pages';
import HistoricObservationsOnADate from './pages/obs/HistoricObservationsOnADate';
import HotspotInfo from './pages/ref/hotspot/HotspotInfo';
import hotspotPages from './pages/ref/hotspot/pages';
import HotspotsInARegion from './pages/ref/hotspot/HotspotsInARegion';
import Index from './pages/Index';
import NearbyHotspots from './pages/ref/hotspot/NearbyHotspots';
import NearestObservationOfASpecies from './pages/obs/NearestObservationsOfASpecies';
import observationsPages from './pages/obs/pages';
import Path from './types/Path';
import productPages from './pages/product/pages';
import RecentChecklistsFeed from './pages/obs/RecentChecklistsFeed';
import RecentNearbyNotableObservations from './pages/obs/RecentNearbyNotableObservations';
import RecentNearbyObservations from './pages/obs/RecentNearbyObservations';
import RecentNearbyObservationsOfASpecies from './pages/obs/RecentNearbyObservationsOfASpecies';
import RecentNotableObservationsInARegion from './pages/obs/RecentNotableObservationsInARegion';
import RecentObservationsInARegion from './pages/obs/RecentObservationsInARegion';
import RecentObservationsOfASpeciesInARegion from './pages/obs/RecentObservationsOfASpeciesInARegion';
import regionPages from './pages/ref/region/pages';
import RegionInfo from './pages/ref/region/RegionInfo';
import RegionalStatisticsOnADate from './pages/product/RegionalStatisticsOnADate';
import Root from './pages/Root';
import SpeciesListForARegion from './pages/product/SpeciesListForARegion';
import SubregionList from './pages/ref/region/SubregionList';
import TaxaLocaleCodes from './pages/ref/taxonomy/TaxaLocaleCodes';
import TaxonomicForms from './pages/ref/taxonomy/TaxonomicForms';
import TaxonomicGroups from './pages/ref/taxonomy/TaxonomicGroups';
import taxonomyPages from './pages/ref/taxonomy/pages';
import TaxonomyVersions from './pages/ref/taxonomy/TaxonomyVersions';
import Top100 from './pages/product/Top100';
import ViewChecklist from './pages/product/ViewChecklist';

export default createRoutesFromChildren(
  <Route
    path={Path.Root}
    element={<Root />}
  >
    <Route
      element={<Index />}
      index
    />
    <Route path={Path.Geography}>
      <Route
        element={
          <BaseIndexPage
            description="Find a country's or region's neighbors."
            pages={geographyPages}
            title="Geography"
          />
        }
        index
      />
      <Route
        element={<AdjacentRegions />}
        path={Path.AdjacentRegions}
      />
    </Route>
    <Route path={Path.Hotspots}>
      <Route
        element={
          <BaseIndexPage
            description="Find the hotspots for a given country or region or nearby hotspots."
            pages={hotspotPages}
            title="Hotspots"
          />
        }
        index
      />
      <Route
        element={<HotspotInfo />}
        path={Path.HotspotInfo}
      />
      <Route
        element={<HotspotsInARegion />}
        path={Path.HotspotsInARegion}
      />
      <Route
        element={<NearbyHotspots />}
        path={Path.NearbyHotspots}
      />
    </Route>
    <Route path={Path.Observations}>
      <Route
        element={
          <BaseIndexPage
            description="Fetch observations submitted to eBird in checklists. Either for a specific country, region or location, or for nearby locations."
            pages={observationsPages}
            title="Observations"
          />
        }
        index
      />
      <Route
        element={<HistoricObservationsOnADate />}
        path={Path.HistoricObservationsOnADate}
      />
      <Route
        element={<NearestObservationOfASpecies />}
        path={Path.NearestObservationsOfASpeces}
      />
      <Route
        element={<RecentChecklistsFeed />}
        path={Path.RecentChecklistsFeed}
      />
      <Route
        element={<RecentNearbyNotableObservations />}
        path={Path.RecentNearbyNotableObservations}
      />
      <Route
        element={<RecentNearbyObservations />}
        path={Path.RecentNearbyObservations}
      />
      <Route
        element={<RecentNearbyObservationsOfASpecies />}
        path={Path.RecentNearbyObservationsOfASPecies}
      />
      <Route
        element={<RecentNotableObservationsInARegion />}
        path={Path.RecentNotableObservationsInARegion}
      />
      <Route
        element={<RecentObservationsInARegion />}
        path={Path.RecentObservationsInARegion}
      />
      <Route
        element={<RecentObservationsOfASpeciesInARegion />}
        path={Path.RecentObservationsOfASpeciesInARegion}
      />
    </Route>
    <Route path={Path.Product}>
      <Route
        element={
          <BaseIndexPage
            description="Product end-points make it easy to get the information shown in various pages on the eBird web site (Top 100 Contributors, checklist data, etc.)"
            pages={productPages}
            title="Product"
          />
        }
        index
      />
      <Route
        element={<ChecklistFeedOnADate />}
        path={Path.ChecklistFeedOnADate}
      />
      <Route
        element={<RegionalStatisticsOnADate />}
        path={Path.RegionalStatisticsOnADate}
      />
      <Route
        element={<SpeciesListForARegion />}
        path={Path.SpeciesListForARegion}
      />
      <Route
        element={<Top100 />}
        path={Path.Top100}
      />
      <Route
        element={<ViewChecklist />}
        path={Path.ViewChecklist}
      />
    </Route>
    <Route path={Path.Regions}>
      <Route
        element={
          <BaseIndexPage
            description="Get information about a specific region or get a list of all regions within a given region."
            pages={regionPages}
            title="Regions"
          />
        }
        index
      />
      <Route
        element={<RegionInfo />}
        path={Path.RegionInfo}
      />
      <Route
        element={<SubregionList />}
        path={Path.SubregionList}
      />
    </Route>
    <Route path={Path.Taxonomy}>
      <Route
        element={
          <BaseIndexPage
            description="Get taxonomic information about species as well as information about the taxonomy itself."
            pages={taxonomyPages}
            title="Taxonomy"
          />
        }
        index
      />
      <Route
        element={<EbirdTaxonomy />}
        path={Path.EbirdTaxonomy}
      />
      <Route
        element={<TaxaLocaleCodes />}
        path={Path.TaxaLocaleCodes}
      />
      <Route
        element={<TaxonomicForms />}
        path={Path.TaxonomicForms}
      />
      <Route
        element={<TaxonomicGroups />}
        path={Path.TaxonomicGroups}
      />
      <Route
        element={<TaxonomyVersions />}
        path={Path.TaxonomyVersions}
      />
    </Route>
  </Route>
);
