import { type ChangeEvent, type FormEvent, useState } from 'react';

import BackInput from '../../../components/BackInput';
import BasePage from '../../../components/BasePage';
import Button from '../../../components/Button';
import CoordinateInput from '../../../components/CoordinateInput';
import csvToArray from '../../../utilities/csvToArray';
import Details from '../../../components/Details';
import Form from '../../../components/Form';
import type EbirdHotspot from '../../../types/EbirdHotspot';
import getValueFromChangeEvent from '../../../utilities/getValueFromChangeEvent';
import isJson from '../../../utilities/isJson';
import NumberInput from '../../../components/NumberInput';
import Select from '../../../components/Select';
import type SelectOption from '../../../types/SelectOption';
import Table from '../../../components/Table';
import type TableCell from '../../../types/TableCell';
import type TableHeader from '../../../types/TableHeader';
import useEbirdApi from '../../../utilities/useEbirdApi';

export default function NearbyHotspots() {
  const [back, setBack] = useState('');
  const [distance, setDistance] = useState('25');
  const [format, setFormat] = useState<'csv' | 'json'>('csv');
  const [hasQueried, setHasQueried] = useState(false);
  const [hotspots, setHotspots] = useState<EbirdHotspot[]>([]);
  const [loadingPosition, setLoadingPosition] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [rawResponse, setRawResponse] = useState('');
  const [showPositionError, setShowPositionError] = useState(false);

  const detailedTableCells: Array<TableCell<EbirdHotspot>> = [
    {
      callback: (item) => item.locId,
    },
    {
      callback: (item) => item.locName,
    },
    {
      callback: (item) => item.countryCode,
    },
    {
      callback: (item) => item.subnational1Code,
    },
    {
      callback: (item) => item.subnational2Code,
    },
    {
      align: 'right',
      callback: (item) => item.lat.toLocaleString(),
    },
    {
      align: 'right',
      callback: (item) => item.lng.toLocaleString(),
    },
    {
      callback: (item) => item.latestObsDt,
    },
    {
      align: 'right',
      callback: (item) => item.numSpeciesAllTime.toLocaleString(),
    },
  ];

  const detailedTableHeaders: TableHeader[] = [
    {
      label: 'locId',
    },
    {
      label: 'locName',
    },
    {
      label: 'countryCode',
    },
    {
      label: 'subnational1Code',
    },
    {
      label: 'subnational2Code',
    },
    {
      align: 'right',
      label: 'lat',
    },
    {
      align: 'right',
      label: 'lng',
    },
    {
      label: 'latestObsDt',
    },
    {
      align: 'right',
      label: 'numSpeciesAllTime',
    },
  ];

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

  const simpleTableCells: Array<TableCell<EbirdHotspot>> = [
    {
      callback: (item) => item.locName,
      wrap: true,
    },
    {
      align: 'right',
      callback: (item) => item.numSpeciesAllTime.toLocaleString(),
    },
    {
      callback: (item) => (
        <time>{new Date(item.latestObsDt).toLocaleString()}</time>
      ),
    },
    {
      callback: (item) => (
        <a
          href={`https://maps.google.com/?q=${item.lat},${item.lng}`}
          rel="noreferrer"
          target="_blank"
        >
          Link
        </a>
      ),
    },
  ];

  const simpleTableHeaders: TableHeader[] = [
    {
      label: 'Name',
    },
    {
      align: 'right',
      label: 'Species Observed',
    },
    {
      label: 'Latest Observation',
    },
    {
      label: 'View on Google Maps',
    },
  ];

  const ebirdApi = useEbirdApi();

  function getNearbyHotspots(event: FormEvent) {
    event.preventDefault();

    setLoadingResults(true);

    ebirdApi
      .getNearbyHotspots(latitude, longitude, format, back, distance)
      .then(async (response) => await response.text())
      .then((data) => {
        setHotspots(
          isJson(data)
            ? JSON.parse(data)
            : csvToArray(data, [
                'locId',
                'countryCode',
                'subnational1Code',
                'subnational2Code',
                'lat',
                'lng',
                'locName',
                'latestObsDt',
                'numSpeciesAllTime',
              ])
        );
        setRawResponse(data);
        setHasQueried(true);
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

  function loading() {
    return loadingPosition || loadingResults;
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

  function showResults() {
    return hasQueried && !loading();
  }

  return (
    <BasePage title="Nearby hotspots">
      <Form onSubmit={getNearbyHotspots}>
        <CoordinateInput
          id="lat"
          label="Latitude (to at least two decimal places)*"
          loading={loading()}
          max={90}
          min={-90}
          onChange={onLatitudeChange}
          placeholder="42.4799394"
          required
          value={latitude}
        />
        <CoordinateInput
          id="lng"
          label="Longitude (to at least two decimal places)*"
          loading={loading()}
          max={180}
          min={-180}
          onChange={onLongitudeChange}
          placeholder="-76.4556869"
          required
          value={longitude}
        />
        <Button
          className="nearby-hotspots__get-user-position"
          label="Use My Location"
          loading={loading()}
          onClick={getUserPosition}
          type="button"
        />
        {loadingPosition ? (
          <p className="nearby-hotspots__loading-position">
            Getting position...
          </p>
        ) : null}
        {showPositionError ? (
          <p className="nearby-hotspots__position-error">
            Unable to get location. Please check permissions and try again.
          </p>
        ) : null}
        <NumberInput
          className="nearby-hotspots__distance-input"
          id="distance"
          label="Distance (km)"
          loading={loading()}
          max={500}
          min={0}
          onChange={onDistanceChange}
          placeholder="25"
          value={distance}
        />
        <BackInput
          className="nearby-hotspots__back-input"
          id="back"
          loading={loading()}
          onChange={onBackChange}
          value={back}
        />
        <Select
          id="format"
          label="Format"
          loading={loading()}
          onChange={onFormatChange}
          options={formatOptions}
          value={format}
        />
        <Button
          className="nearby-hotspots__submit"
          label="Search"
          loading={loading()}
          type="submit"
        />
      </Form>
      {loadingResults ? <p>Loading...</p> : null}
      {showResults() ? (
        <div className="nearby-hotspots__results">
          <Details summary="Raw Response">{rawResponse}</Details>
          <Details summary="Detailed Table">
            <Table<EbirdHotspot>
              cells={detailedTableCells}
              headers={detailedTableHeaders}
              items={hotspots}
            />
          </Details>
          <Details
            open
            summary="Simplified Table"
          >
            <Table<EbirdHotspot>
              cells={simpleTableCells}
              headers={simpleTableHeaders}
              items={hotspots}
            />
          </Details>
        </div>
      ) : null}
    </BasePage>
  );
}
