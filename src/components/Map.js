import react, { useContext, useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { InputsContext } from '../context/InputsContext';

const options = {
  // styles: **go to snazzymaps.com for styles**
  disableDefaultUI: true,
  zoomControl: true, //this brings back the zoom ui buttons
  // gestureHandling: "none"
};

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });
  const { inputs } = useContext(InputsContext);
  const [selectedMarker, setSelectedMarker] = useState();

  // If error loading maps
  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={9}
        center={inputs.latLng}
        options={options}
      >
        {inputs.stations.map((station) => (
          <Marker
            key={station.id}
            position={{ lat: station.lat, lng: station.long }}
            onClick={() => setSelectedMarker(station)}
          />
        ))}

        {/* show the window above the marker */}
        {selectedMarker ? (
          <InfoWindow
            position={{
              lat: selectedMarker.lat + 0.09,
              lng: selectedMarker.long,
            }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div style={{ textAlign: 'left' }}>
              <p>
                <b>{selectedMarker.data_station_name}</b>
              </p>
              <p>
                <b>id:</b> {selectedMarker.id}
              </p>
              <p>
                <b>lat:</b> {selectedMarker.lat}
              </p>
              <p>
                <b>lng:</b> {selectedMarker.long}
              </p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
};

const mapContainerStyle = {
  minWidth: '300px',
  zIndex: '1',
  width: '100%',
  height: '400px',
};

export default Map;
