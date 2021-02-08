// CountySelect.js

import React, { useContext } from 'react';
import { InputsContext } from '../context/InputsContext';

const DataStationSelect = () => {
  const { inputs } = useContext(InputsContext);
  return (
    <>
      {inputs.stations.map(station => (
        <option key={station} value={station}>{station}</option>
      ))}
      {/* <option value="">Choose...</option>
      <option value="AK">Alaska</option> */}
    </>
  );
};

export default DataStationSelect;