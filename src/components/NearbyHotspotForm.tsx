import { type ChangeEvent, useState, type FormEvent } from 'react';

import Button from './Button';
import CoordinateInput from './CoordinateInput';
import type EbirdHotspot from '../types/EbirdHotspot';
import getValueFromChangeEvent from '../utilities/getValueFromChangeEvent';
import NumberInput from './NumberInput';
import PasswordInput from './PasswordInput';
import useEbirdApi from '../utilities/useEbirdApi';

export default function NearbyHotspotForm() {
  const ebirdApi = useEbirdApi();

  const [apiKey, setApiKey] = useState('');
  const [back, setBack] = useState('');
  const [distance, setDistance] = useState('25');
  const [isLoading, setIsLoading] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [results, setResults] = useState<EbirdHotspot[]>([]);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  function getNearbyHotspots(event: FormEvent) {
    event.preventDefault();

    ebirdApi
      .getNearbyHotspots(apiKey, latitude, longitude, 'json', back, distance)
      .then(async (response) => await response.json())
      .then((data) => {
        setResults(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getUserPosition() {
    setIsLoading(true);
    setShowErrorMessage(false);

    navigator.geolocation.getCurrentPosition(
      onGetUserPositionSuccess,
      onGetUserPositionFail
    );
  }

  function onApiKeyChange(event: ChangeEvent<HTMLInputElement>) {
    const value = getValueFromChangeEvent(event);
    setApiKey(value);
  }

  function onBackChange(event: ChangeEvent<HTMLInputElement>) {
    const value = getValueFromChangeEvent(event);
    setBack(value);
  }

  function onCoordinateChange(
    event: ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) {
    const value = getValueFromChangeEvent(event);
    setter(value);
  }

  function onDistanceChange(event: ChangeEvent<HTMLInputElement>) {
    const value = getValueFromChangeEvent(event);
    setDistance(value);
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
      <PasswordInput
        id="api-key"
        label="API Key*"
        onChange={onApiKeyChange}
        required
        value={apiKey}
      />
      <CoordinateInput
        disabled={isLoading}
        id="lat"
        label="Latitude (to at least two decimal places)*"
        max={90}
        min={-90}
        onChange={onLatitudeChange}
        placeholder="42.4799394"
        required
        value={latitude}
      />
      <CoordinateInput
        disabled={isLoading}
        id="lng"
        label="Longitude (to at least two decimal places)*"
        max={180}
        min={-180}
        onChange={onLongitudeChange}
        placeholder="-76.4556869"
        required
        value={longitude}
      />
      <Button
        disabled={isLoading}
        label="Use My Location"
        onClick={getUserPosition}
        type="button"
      />
      <NumberInput
        id="distance"
        label="Distance (km)"
        max={500}
        min={0}
        onChange={onDistanceChange}
        placeholder="25"
        value={distance}
      />
      <NumberInput
        id="back"
        label="Back"
        max={30}
        min={1}
        onChange={onBackChange}
        placeholder="7"
        value={back}
      />
      <Button
        disabled={isLoading}
        label="Search"
        type="submit"
      />
      {showErrorMessage ? (
        <p>Could not get user position. Please try again.</p>
      ) : null}
      <p>Results ({results.length})</p>
    </form>
  );
}
