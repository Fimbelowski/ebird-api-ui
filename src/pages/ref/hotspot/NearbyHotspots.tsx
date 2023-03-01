import { useState } from 'react';

import BackInput from '../../../components/BackInput';
import BasePage from '../../../components/BasePage';
import Button from '../../../components/Button';
import CoordinateInput from '../../../components/CoordinateInput';
import csvToArray from '../../../utilities/csvToArray';
import DetailedHotspotTable from '../../../components/DetailedHotspotTable';
import Details from '../../../components/Details';
import Format from '../../../types/Format';
import FormatSelect from '../../../components/FormatSelect';
import type EbirdHotspot from '../../../types/EbirdHotspot';
import isJson from '../../../utilities/isJson';
import NumberInput from '../../../components/NumberInput';
import SimpleHotspotTable from '../../../components/SimpleHotspotTable';
import useEbirdApi from '../../../hooks/useEbirdApi';

export default function NearbyHotspots() {
  const [back, setBack] = useState('');
  const [distance, setDistance] = useState('25');
  const [format, setFormat] = useState<Format>(Format.Csv);
  const [hasQueried, setHasQueried] = useState(false);
  const [hotspots, setHotspots] = useState<EbirdHotspot[]>([]);
  const [loadingPosition, setLoadingPosition] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [rawResponse, setRawResponse] = useState('');
  const [showPositionError, setShowPositionError] = useState(false);

  const { getNearbyHotspots } = useEbirdApi();

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

  function onBackChange(value: string) {
    setBack(value);
  }

  function onDistanceChange(value: string) {
    setDistance(value);
  }

  function onFormatChange(format: Format) {
    setFormat(format);
  }

  function onLatitudeChange(value: string) {
    setLatitude(value);
  }

  function onLongitudeChange(value: string) {
    setLongitude(value);
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

  function onSubmit() {
    setLoadingResults(true);

    getNearbyHotspots(latitude, longitude, format, back, distance)
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

  const formContent = (
    <>
      <CoordinateInput
        id="lat"
        label="Latitude (to at least two decimal places)"
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
        label="Longitude (to at least two decimal places)"
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
        loading={loading()}
        onClick={getUserPosition}
        type="button"
      >
        Use My Location
      </Button>
      {loadingPosition ? (
        <p className="nearby-hotspots__loading-position">Getting position...</p>
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
      <FormatSelect
        id="format"
        loading={loading()}
        onChange={onFormatChange}
        value={format}
      />
    </>
  );

  const resultsContent = (
    <>
      <Details summary="Detailed Table">
        <DetailedHotspotTable hotspots={hotspots} />
      </Details>
      <Details
        open
        summary="Simplified Table"
      >
        <SimpleHotspotTable hotspots={hotspots} />
      </Details>
    </>
  );

  return (
    <BasePage
      formContent={formContent}
      hasQueried={hasQueried}
      loading={loadingResults}
      onFormSubmit={onSubmit}
      rawResponse={rawResponse}
      resultsContent={resultsContent}
      title="Nearby hotspots"
    />
  );
}
