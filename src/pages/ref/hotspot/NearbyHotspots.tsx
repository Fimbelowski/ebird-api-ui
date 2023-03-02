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
import parseEbirdHotspotRequestData from '../../../utilities/parseEbirdHotspotRequestData';
import useEbirdApi from '../../../hooks/useEbirdApi';
import useRequestState from '../../../hooks/useRequestState';

export default function NearbyHotspots() {
  const { hasQueried, rawResponse, setHasQueried, setRawResponse } =
    useRequestState();

  const [back, setBack] = useState('');
  const [distance, setDistance] = useState('25');
  const [format, setFormat] = useState<EbirdFormat>('csv');
  const [hotspots, setHotspots] = useState<EbirdHotspot[]>([]);
  const [loadingPosition, setLoadingPosition] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
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
        const parsedData = parseEbirdHotspotRequestData(data);
        setHotspots(parsedData);
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
        onChange={setLatitude}
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
        onChange={setLongitude}
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
        onChange={setDistance}
        placeholder="25"
        value={distance}
      />
      <BackInput
        className="nearby-hotspots__back-input"
        id="back"
        loading={loading()}
        onChange={setBack}
        value={back}
      />
      <FormatSelect
        id="format"
        loading={loading()}
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
