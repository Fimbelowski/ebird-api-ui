import type ExtendedRouteObject from '../ExtendedRouteObject';
import HistoricObservationsOnADate from '../../pages/obs/HistoricObservationsOnADate';

const historicObservationsOnADate: ExtendedRouteObject = {
  element: <HistoricObservationsOnADate />,
  path: 'historic-observations-on-a-date',
  meta: {
    name: 'Historic Observations on a Date',
    requiresApiKey: true,
  },
};

export default historicObservationsOnADate;
