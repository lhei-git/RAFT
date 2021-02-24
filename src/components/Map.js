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

  // If error loading maps
  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={inputs.latLng}
        options={options}
      >
        {inputs.stations.map((station) => (
          <Marker
            key={station.id}
            position={{ lat: station.lat, lng: station.long }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

const mapContainerStyle = {
  zIndex: '1',
  width: '100vw',
  height: '400px',
};

export default Map;
