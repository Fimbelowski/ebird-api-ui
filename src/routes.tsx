import { createRoutesFromChildren, Route } from 'react-router-dom';

import AdjacentRegions from './pages/ref/geo/AdjacentRegions';
import BaseIndexPage from './components/BaseIndexPage/BaseIndexPage';
import ChecklistFeedOnADate from './pages/product/ChecklistFeedOnADate';
import EbirdTaxonomy from './pages/ref/taxonomy/EbirdTaxonomy';
import Feedback from './pages/Feedback';
import geographyPages from './pages/ref/geo/pages';
import HistoricObservationsOnADate from './pages/obs/HistoricObservationsOnADate';
import HotspotInfo from './pages/ref/hotspot/HotspotInfo';
import hotspotPages from './pages/ref/hotspot/pages';
import HotspotsInARegion from './pages/ref/hotspot/HotspotsInARegion';
import Index from './pages/Index';
import NearbyHotspots from './pages/ref/hotspot/NearbyHotspots';
import NearestObservationOfASpecies from './pages/obs/NearestObservationsOfASpecies';
import observationsPages from './pages/obs/pages';
import PATH from './types/PATH';
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
    path={PATH.Root}
    element={<Root />}
  >
    <Route
      element={<Index />}
      index
    />
    <Route
      element={<Feedback />}
      path={PATH.Feedback}
    />
    <Route path={PATH.Geography}>
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
        path={PATH.AdjacentRegions}
      />
    </Route>
    <Route path={PATH.Hotspots}>
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
        path={PATH.HotspotInfo}
      />
      <Route
        element={<HotspotsInARegion />}
        path={PATH.HotspotsInARegion}
      />
      <Route
        element={<NearbyHotspots />}
        path={PATH.NearbyHotspots}
      />
    </Route>
    <Route path={PATH.Observations}>
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
        path={PATH.HistoricObservationsOnADate}
      />
      <Route
        element={<NearestObservationOfASpecies />}
        path={PATH.NearestObservationsOfASpecies}
      />
      <Route
        element={<RecentChecklistsFeed />}
        path={PATH.RecentChecklistsFeed}
      />
      <Route
        element={<RecentNearbyNotableObservations />}
        path={PATH.RecentNearbyNotableObservations}
      />
      <Route
        element={<RecentNearbyObservations />}
        path={PATH.RecentNearbyObservations}
      />
      <Route
        element={<RecentNearbyObservationsOfASpecies />}
        path={PATH.RecentNearbyObservationsOfASPecies}
      />
      <Route
        element={<RecentNotableObservationsInARegion />}
        path={PATH.RecentNotableObservationsInARegion}
      />
      <Route
        element={<RecentObservationsInARegion />}
        path={PATH.RecentObservationsInARegion}
      />
      <Route
        element={<RecentObservationsOfASpeciesInARegion />}
        path={PATH.RecentObservationsOfASpeciesInARegion}
      />
    </Route>
    <Route path={PATH.Product}>
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
        path={PATH.ChecklistFeedOnADate}
      />
      <Route
        element={<RegionalStatisticsOnADate />}
        path={PATH.RegionalStatisticsOnADate}
      />
      <Route
        element={<SpeciesListForARegion />}
        path={PATH.SpeciesListForARegion}
      />
      <Route
        element={<Top100 />}
        path={PATH.Top100}
      />
      <Route
        element={<ViewChecklist />}
        path={PATH.ViewChecklist}
      />
    </Route>
    <Route path={PATH.Regions}>
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
        path={PATH.RegionInfo}
      />
      <Route
        element={<SubregionList />}
        path={PATH.SubregionList}
      />
    </Route>
    <Route path={PATH.Taxonomy}>
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
        path={PATH.EbirdTaxonomy}
      />
      <Route
        element={<TaxaLocaleCodes />}
        path={PATH.TaxaLocaleCodes}
      />
      <Route
        element={<TaxonomicForms />}
        path={PATH.TaxonomicForms}
      />
      <Route
        element={<TaxonomicGroups />}
        path={PATH.TaxonomicGroups}
      />
      <Route
        element={<TaxonomyVersions />}
        path={PATH.TaxonomyVersions}
      />
    </Route>
  </Route>
);
