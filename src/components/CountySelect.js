import React, { useContext } from 'react';
import { InputsContext } from '../context/InputsContext';

const CountySelect = () => {
  const { inputs } = useContext(InputsContext);
  return (
    <>
      {/* <option value="">Choose...</option> */}
      {inputs.counties.map(county => (
        <option value={county}>{county}</option>
      ))}
      {/* <option value="">Choose...</option>
      <option value="AK">Alaska</option> */}
    </>
  );
};

export default CountySelect;