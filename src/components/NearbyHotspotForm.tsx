import { type ChangeEvent, useState, type FormEvent } from 'react';

import Button from './Button';
import CoordinateInput from './CoordinateInput';

export default function NearbyHotspotForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  function getNearbyHotspots(event: FormEvent) {
    event.preventDefault();
    console.log(event);
  }

  function getUserPosition() {
    setIsLoading(true);
    setShowErrorMessage(false);

    navigator.geolocation.getCurrentPosition(
      onGetUserPositionSuccess,
      onGetUserPositionFail
    );
  }

  function onCoordinateChange(
    event: ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) {
    const { target } = event;
    const { value } = target;

    setter(value);
  }

  function onGetUserPositionFail() {
    setShowErrorMessage(true);
    setIsLoading(false);
  }

  function onGetUserPositionSuccess(position: GeolocationPosition) {
    const { coords } = position;
    const { latitude, longitude } = coords;

    setLatitude(latitude.toString());
    setLongitude(longitude.toString());
    setIsLoading(false);
  }

  function onLatitudeChange(event: ChangeEvent<HTMLInputElement>) {
    onCoordinateChange(event, setLatitude);
  }

  function onLongitudeChange(event: ChangeEvent<HTMLInputElement>) {
    onCoordinateChange(event, setLongitude);
  }

  return (
    <form
      className="nearby-hotspot-form"
      onSubmit={getNearbyHotspots}
    >
      <CoordinateInput
        disabled={isLoading}
        id="lat"
        label="Latitude (to at least two decimal places)"
        max={90}
        min={-90}
        onChange={onLatitudeChange}
        required
        value={latitude}
      />
      <CoordinateInput
        disabled={isLoading}
        id="lng"
        label="Longitude (to at least two decimal places)"
        max={180}
        min={-180}
        onChange={onLongitudeChange}
        required
        value={longitude}
      />
      <Button
        disabled={isLoading}
        label="Use My Location"
        onClick={getUserPosition}
        type="button"
      />
      <Button
        disabled={isLoading}
        label="Search"
        type="submit"
      />
      {showErrorMessage ? (
        <p>Could not get user position. Please try again.</p>
      ) : null}
    </form>
  );
}
