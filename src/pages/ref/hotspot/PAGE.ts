import PATH from '../../../types/PATH';

const PAGE = {
  HotspotInfo: {
    description: 'Fetches information about a specified hotspot.',
    path: PATH.HotspotInfo,
    title: 'Hotspot Info',
  },
  HotspotsInARegion: {
    description: 'Fetches hotspots within a specified country or region.',
    path: PATH.HotspotsInARegion,
    title: 'Hotspots in a Region',
  },
  NearbyHotspots: {
    description: 'Fetches a list of hotspots near a given location.',
    path: PATH.NearbyHotspots,
    title: 'Nearby Hotspots',
  },
} as const;

export default PAGE;
