import { useState } from 'react';

import BackInput from '../../../components/BackInput';
import BasePage from '../../../components/BasePage';
import Button from '../../../components/Button';
import CoordinateInput from '../../../components/CoordinateInput';
import Details from '../../../components/Details';
import type EbirdFormat from '../../../types/EbirdFormat';
import EbirdHotspotTableDetailed from '../../../components/EbirdHotspotTableDetailed';
import EbirdHotspotTableSimple from '../../../components/EbirdHotspotTableSimple';
import FormatSelect from '../../../components/FormatSelect';
import type EbirdHotspot from '../../../types/EbirdHotspot';
import NumberInput from '../../../components/NumberInput';
import useEbirdApi from '../../../hooks/useEbirdApi';

export default function HotspotsNearby() {
  const { getNearbyHotspots } = useEbirdApi();

  const [back, setBack] = useState('');
  const [distance, setDistance] = useState('25');
  const [format, setFormat] = useState<EbirdFormat>('csv');
  const [hotspots, setHotspots] = useState<EbirdHotspot[]>([]);
  const [loadingPosition, setLoadingPosition] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [showPositionError, setShowPositionError] = useState(false);

  function getUserPosition() {
    setLoadingPosition(true);
    setShowPositionError(false);

    navigator.geolocation.getCurrentPosition(
      onGetUserPositionSuccess,
      onGetUserPositionFail
    );
  }

  function onGetUserPositionFail() {
    setShowPositionError(true);
    setLoadingPosition(false);
  }

  function onGetUserPositionSuccess(position: GeolocationPosition) {
    const { coords } = position;
    const { latitude, longitude } = coords;

    setLatitude(latitude.toString());
    setLongitude(longitude.toString());
    setLoadingPosition(false);
  }

  async function request() {
    return await getNearbyHotspots(latitude, longitude, format, back, distance);
  }

  const formContent = (
    <>
      <CoordinateInput
        disabled={loadingPosition}
        id="lat"
        label="Latitude (to at least two decimal places)"
        max={90}
        min={-90}
        onChange={setLatitude}
        placeholder="42.4799394"
        required
        value={latitude}
      />
      <CoordinateInput
        disabled={loadingPosition}
        id="lng"
        label="Longitude (to at least two decimal places)"
        max={180}
        min={-180}
        onChange={setLongitude}
        placeholder="-76.4556869"
        required
        value={longitude}
      />
      <Button
        className="hotspots-nearby__get-user-position"
        disabled={loadingPosition}
        onClick={getUserPosition}
        type="button"
      >
        Use My Location
      </Button>
      {loadingPosition ? (
        <p className="hotspots-nearby__loading-position">Getting position...</p>
      ) : null}
      {showPositionError ? (
        <p className="hotspots-nearby__position-error">
          Unable to get location. Please check permissions and try again.
        </p>
      ) : null}
      <NumberInput
        className="hotspots-nearby__distance-input"
        disabled={loadingPosition}
        id="distance"
        label="Distance (km)"
        max={500}
        min={0}
        onChange={setDistance}
        placeholder="25"
        value={distance}
      />
      <BackInput
        className="hotspots-nearby__back-input"
        disabled={loadingPosition}
        id="back"
        onChange={setBack}
        value={back}
      />
      <FormatSelect
        disabled={loadingPosition}
        id="format"
        onChange={setFormat}
        value={format}
      />
    </>
  );

  const resultsContent = (
    <>
      <Details summary="Detailed Table">
        <EbirdHotspotTableDetailed hotspots={hotspots} />
      </Details>
      <Details
        open
        summary="Simplified Table"
      >
        <EbirdHotspotTableSimple hotspots={hotspots} />
      </Details>
    </>
  );

  return (
    <BasePage<EbirdHotspot[]>
      disableSubmit={loadingPosition}
      formContent={formContent}
      onLoad={setHotspots}
      request={request}
      resultsContent={resultsContent}
      title="Nearby hotspots"
    />
  );
}
