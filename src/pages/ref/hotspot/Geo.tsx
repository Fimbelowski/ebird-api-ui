import { type ChangeEvent, type FormEvent, useState } from 'react';

import BasePage from '../../../components/BasePage';
import Button from '../../../components/Button';
import CoordinateInput from '../../../components/CoordinateInput';
import type EbirdHotspot from '../../../types/EbirdHotspot';
import getValueFromChangeEvent from '../../../utilities/getValueFromChangeEvent';
import NumberInput from '../../../components/NumberInput';
import Select from '../../../components/Select';
import type SelectOption from '../../../types/SelectOption';
import useEbirdApi from '../../../utilities/useEbirdApi';

export default function Geo() {
  const [back, setBack] = useState('');
  const [distance, setDistance] = useState('25');
  const [format, setFormat] = useState<'csv' | 'json'>('csv');
  const [loadingPosition, setLoadingPosition] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [results, setResults] = useState<EbirdHotspot[]>([]);
  const [showPositionError, setShowPositionError] = useState(false);

  const formatOptions: SelectOption[] = [
    {
      label: 'CSV',
      value: 'csv',
    },
    {
      label: 'JSON',
      value: 'json',
    },
  ];

  const hasResults = results.length > 0;
  const loading = loadingPosition || loadingResults;

  const ebirdApi = useEbirdApi();

  function getNearbyHotspots(event: FormEvent) {
    event.preventDefault();

    setLoadingResults(true);

    ebirdApi
      .getNearbyHotspots(latitude, longitude, 'json', back, distance)
      .then(async (response) => await response.json())
      .then((data) => {
        setResults(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoadingResults(false);
      });
  }

  function getUserPosition() {
    setLoadingPosition(true);
    setShowPositionError(false);

    navigator.geolocation.getCurrentPosition(
      onGetUserPositionSuccess,
      onGetUserPositionFail
    );
  }

  function onBackChange(event: ChangeEvent<HTMLInputElement>) {
    const value = getValueFromChangeEvent(event);
    setBack(value);
  }

  function onDistanceChange(event: ChangeEvent<HTMLInputElement>) {
    const value = getValueFromChangeEvent(event);
    setDistance(value);
  }

  function onCoordinateChange(
    event: ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) {
    const value = getValueFromChangeEvent(event);
    setter(value);
  }

  function onFormatChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = getValueFromChangeEvent(event);

    if (value !== 'csv' && value !== 'json') {
      throw Error(`Invalid format: ${value}`);
    }

    setFormat(value);
  }

  function onLatitudeChange(event: ChangeEvent<HTMLInputElement>) {
    onCoordinateChange(event, setLatitude);
  }

  function onLongitudeChange(event: ChangeEvent<HTMLInputElement>) {
    onCoordinateChange(event, setLongitude);
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

  function ResultsTable() {
    const tableRows = results.map(
      ({ lat, latestObsDt, lng, locId, locName, numSpeciesAllTime }) => {
        return (
          <tr key={locId}>
            <td>{locName}</td>
            <td>{numSpeciesAllTime}</td>
            <td>{new Date(latestObsDt).toLocaleString()}</td>
            <td>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                rel="noreferrer"
                target="_blank"
              >
                Link
              </a>
            </td>
          </tr>
        );
      }
    );

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Species</th>
            <th>Latest Observation</th>
            <th>View on Google Maps</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    );
  }

  return (
    <BasePage
      className="geo"
      title="Nearby Hotspots"
    >
      <form
        className="geo__form"
        onSubmit={getNearbyHotspots}
      >
        <CoordinateInput
          className="geo__latitude-input"
          fullWidth
          id="lat"
          label="Latitude (to at least two decimal places)*"
          loading={loading}
          max={90}
          min={-90}
          onChange={onLatitudeChange}
          placeholder="42.4799394"
          required
          value={latitude}
        />
        <CoordinateInput
          className="geo__longitude-input"
          fullWidth
          id="lng"
          label="Longitude (to at least two decimal places)*"
          loading={loading}
          max={180}
          min={-180}
          onChange={onLongitudeChange}
          placeholder="-76.4556869"
          required
          value={longitude}
        />
        <Button
          className="geo__get-user-position"
          label="Use My Location"
          loading={loading}
          onClick={getUserPosition}
          type="button"
        />
        {loadingPosition ? (
          <p className="geo__loading-position">Getting position...</p>
        ) : null}
        {showPositionError ? (
          <p className="geo__position-error">
            Unable to get location. Please check permissions and try again.
          </p>
        ) : null}
        <NumberInput
          className="geo__distance-input"
          fullWidth
          id="distance"
          label="Distance (km)"
          loading={loading}
          max={500}
          min={0}
          onChange={onDistanceChange}
          placeholder="25"
          value={distance}
        />
        <NumberInput
          className="geo__back-input"
          fullWidth
          id="back"
          label="Back"
          loading={loading}
          max={30}
          min={1}
          onChange={onBackChange}
          placeholder="7"
          value={back}
        />
        <Select
          id="format"
          label="Format"
          loading={loading}
          onChange={onFormatChange}
          options={formatOptions}
          value={format}
        />
        <Button
          className="geo__submit"
          label="Search"
          loading={loading}
          type="submit"
        />
      </form>
      {loadingResults ? <p>Loading...</p> : null}
      <p>{hasResults ? `Results (${results.length})` : 'No Results'}</p>
      {hasResults ? <ResultsTable /> : null}
    </BasePage>
  );
}
