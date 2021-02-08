import React, { useReducer } from 'react';

export const InputsContext = React.createContext();

// REDUCER
const inputsReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SELECT_STATE':
      return { ...state, state: payload };
    case 'SELECT_COUNTY':
      return { ...state, county: payload };
    case 'SELECT_STATION':
      return { ...state, station: payload };
    case 'SELECT_MONTH':
      return { ...state, month: payload };
    case 'SELECT_YEAR':
      return { ...state, year: payload };
    case 'GET_COUNTIES':
      return { ...state, counties: payload };
    case 'GET_STATIONS':
      return { ...state, stations: payload };
    default:
      return state;
  }
};

export const InputsProvider = ({ children }) => {
  const [inputs, dispatch] = useReducer(inputsReducer, {
    state: '',
    county: '',
    station: '',
    month: '',
    year: '',
    counties: [],
    stations: [],
    // model data maybe
  });

  // ACTIONS
  const selectState = (state) =>
    dispatch({ type: 'SELECT_STATE', payload: state });
  const selectCounty = (county) =>
    dispatch({ type: 'SELECT_COUNTY', payload: county });
  const selectStation = (station) =>
    dispatch({ type: 'SELECT_STATION', payload: station });
  const selectMonth = (month) =>
    dispatch({ type: 'SELECT_STATION', payload: month });
  const selectYear = (year) =>
    dispatch({ type: 'SELECT_STATION', payload: year });
  const getCounties = () => {
    try {
      // axios call to get counties
      // const response = api.post('url/counties', { state: state });
      // dispatch({ type: 'GET_COUNTIES', action: response.data });
    } catch (err) {
      console.log(err);
    }
  };
  const getStations = () => {
    try {
      // axios call to get stations
      // const response = api.post('url/stations', { month, year, county, station });
      // dispatch({ type: 'GET_STATIONS', action: response.data });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <InputsContext.Provider
      value={{
        inputs,
        selectState,
        selectCounty,
        selectStation,
        selectMonth,
        selectYear,
        getCounties,
        getStations,
      }}
    >
      {children}
    </InputsContext.Provider>
  );
};
