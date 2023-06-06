import { useState } from 'react';

import BackInput from '../../../../components/BaseInput/BackInput';
import BasePageTableEbirdHotspot from '../../../../components/BasePageTableEbirdHotspot';
import Button from '../../../../components/Button/Button';
import CoordinateInput from '../../../../components/CoordinateInput';
import type EbirdFormat from '../../../../services/ebird/types/EbirdRecordFormat';
import FormatSelect from '../../../../components/FormatSelect';
import { NumberInput } from '../../../../components/NumberInput';
import useEbirdApi from '../../../../services/ebird/useEbirdApi';

export default function HotspotsNearby() {
  const { getNearbyHotspots } = useEbirdApi();

  const [back, setBack] = useState<number>();
  const [distance, setDistance] = useState(25);
  const [format, setFormat] = useState<EbirdFormat>('csv');
  const [loadingPosition, setLoadingPosition] = useState(false);
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
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

    setLatitude(latitude);
    setLongitude(longitude);
    setLoadingPosition(false);
  }

  async function onSubmit() {
    return await getNearbyHotspots(
      latitude as number,
      longitude as number,
      format,
      back,
      distance
    );
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

  return (
    <BasePageTableEbirdHotspot
      disableSubmit={loadingPosition}
      formContent={formContent}
      onSubmit={onSubmit}
      title="Nearby hotspots"
    />
  );
}
