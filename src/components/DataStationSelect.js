import React, { useContext } from 'react';
import { InputsContext } from '../context/InputsContext';

const DataStationSelect = () => {
  const { inputs } = useContext(InputsContext);
  return (
    <>
      <option value="">Choose...</option>
      {inputs.stations.map((station) => (
        <option key={station.id} value={station.id}>
          {station.data_station_name}
        </option>
      ))}
      {/* <option value="">Choose...</option>
      <option value="AK">Alaska</option> */}
    </>
  );
};

export default DataStationSelect;
