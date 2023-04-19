import BasePageTableEbirdObservation from '../../components/BasePageTableEbirdObservation';
import useEbirdApi from '../../hooks/useEbirdApi';

export default function RecentNotableObservationsRegion() {
  const { getRecentNotableObservationsInAregion } = useEbirdApi();

  async function onSubmit() {
    return await getRecentNotableObservationsInAregion('', 'simple');
  }

  return (
    <BasePageTableEbirdObservation
      onSubmit={onSubmit}
      title="Recent Notable Observations in a Region"
    />
  );
}
