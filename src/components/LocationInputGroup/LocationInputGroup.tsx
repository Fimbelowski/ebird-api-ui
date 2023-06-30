import { useState } from 'react';

import Button from '../Button/Button';
import CoordinateInput from '../CoordinateInput';
import useLoading from '../../hooks/useLoading';

interface Props {
  latitude: string;
  longitude: string;
  setLatitude: (newValue: string) => void;
  setLongitude: (newValue: string) => void;
}

export default function LocationInputGroup({
  latitude,
  longitude,
  setLatitude,
  setLongitude,
}: Props) {
  const { loadingPosition, setLoadingPosition } = useLoading();

  const [positionError, setPositionError] = useState(false);

  function getUserPosition() {
    setLoadingPosition(true);
    setPositionError(false);

    navigator.geolocation.getCurrentPosition(
      onGetUserPositionSuccess,
      onGetUserPositionFail
    );
  }

  function onGetUserPositionFail() {
    setPositionError(true);
    setLoadingPosition(false);
  }

  function onGetUserPositionSuccess(position: GeolocationPosition) {
    const { coords } = position;
    const { latitude, longitude } = coords;

    setLatitude(latitude.toString());
    setLongitude(longitude.toString());
    setLoadingPosition(false);
  }

  return (
    <div className="location-input-group">
      <CoordinateInput
        disabled={loadingPosition}
        id="lat"
        label="Latitude (to at least two decimal places)"
        max="90"
        min="-90"
        onChange={setLatitude}
        placeholder="42.4799394"
        required
        value={latitude}
      />
      <CoordinateInput
        disabled={loadingPosition}
        id="lng"
        label="Longitude (to at least two decimal places)"
        max="180"
        min="-180"
        onChange={setLongitude}
        placeholder="-76.4556869"
        required
        value={longitude}
      />
      <div className="location-input-group__button">
        <Button
          disabled={loadingPosition}
          fullWidth
          onClick={getUserPosition}
          type="button"
        >
          Use My Location
        </Button>
      </div>
      {loadingPosition ? (
        <p className="location-input-group__loading-position">
          Getting position...
        </p>
      ) : null}
      {positionError ? (
        <p className="location-input-group__position-error">
          Unable to get location. Please check permissions and try again.
        </p>
      ) : null}
    </div>
  );
}
