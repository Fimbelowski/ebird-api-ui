import { useState } from 'react';

import { Button } from '../Button/Button';
import CoordinateInput from '../CoordinateInput';
import { updateIsLoadingPosition } from '../../store/slices/loadingSlice';
import useAppDispatch from '../../store/hooks/useAppDispatch';
import useAppSelector from '../../store/hooks/useAppSelector';

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
  const isLoadingPosition = useAppSelector(
    (state) => state.loading.isLoadingPosition
  );
  const dispatch = useAppDispatch();

  const [positionError, setPositionError] = useState(false);

  function getUserPosition() {
    dispatch(updateIsLoadingPosition(true));
    setPositionError(false);

    navigator.geolocation.getCurrentPosition(
      onGetUserPositionSuccess,
      onGetUserPositionFail
    );
  }

  function onGetUserPositionFail() {
    setPositionError(true);
    dispatch(updateIsLoadingPosition(false));
  }

  function onGetUserPositionSuccess(position: GeolocationPosition) {
    const { coords } = position;
    const { latitude, longitude } = coords;

    setLatitude(latitude.toString());
    setLongitude(longitude.toString());
    dispatch(updateIsLoadingPosition(false));
  }

  return (
    <div className="location-input-group">
      <CoordinateInput
        disabled={isLoadingPosition}
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
        disabled={isLoadingPosition}
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
          disableWhenLoadingPosition
          fullWidth
          onClick={getUserPosition}
          secondary
          type="button"
        >
          Use My Location
        </Button>
      </div>
      {isLoadingPosition ? (
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
