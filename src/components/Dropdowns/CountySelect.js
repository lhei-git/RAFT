import React, { useContext } from 'react';
import { InputsContext } from '../../context/InputsContext';

const CountySelect = () => {
  const { inputs } = useContext(InputsContext);
  return (
    <>
      <option value="">Choose...</option>
      {inputs.counties.map((county, i) => (
        <option key={i} value={county}>
          {county}
        </option>
      ))}
    </>
  );
};

export default CountySelect;
