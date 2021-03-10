import { useCallback, useContext, useEffect } from 'react';
import './App.css';
import { InputsContext } from './context/InputsContext';
import { Table } from 'react-bootstrap';
import { Data } from '@react-google-maps/api';
import React from 'react';
import Plot from 'react-plotly.js';

const Results = ({ ready }) => {
  const { inputs } = useContext(InputsContext);

  console.log(inputs.training_data && inputs.training_data);

  const linearModelTableHeaders = [];
  const clusterModelTableHeaders = [];

  const avgRecordTableHeaders = [
    'Average Temperature',
    'Lowest Temperature',
    'Highest Temperature',
  ];

  const temps1 = [
    { low: 34, med: 54, high: 80 },
    { low: 1.2, med: 1.3, high: -0.9 },
    { low: 7, med: 8, high: 5 },
  ];

  const temps2 = [
    { low: 34, med: 54, high: 80 },
    { low: 1.2, med: 1.3, high: -0.9 },
    { low: 7, med: 8, high: 5 },
  ];

  const temps3 = [
    { low: 34, med: 54 },
    { low: 1.2, med: 1.3 },
    { low: 7, med: 8 },
  ];

  const generateLinearTable = useCallback(
    (temps1) => {
      return temps1.map((data, i) => (
        <tr key={i}>
          <td style={{ fontWeight: 675 }}>{data.name}</td>
          <td>{data.prediction[0].toFixed(2)}&#176;C</td>
          <td>{data.metrics.mse.toFixed(2)}</td>
          <td>{data.metrics.r2.toFixed(2)}</td>
        </tr>
      ));
    },
    [inputs.model]
  );

  // const generateClusterModelCalculations = (
  //   temps2,
  //   clusterModelTableHeaders
  // ) => {
  //   console.log(typeof temps2);
  //   return temps2.map((data, i) => (
  //     <tr key={i}>
  //       <td style={{ fontWeight: 675 }}>{clusterModelTableHeaders[i]}</td>
  //       <td>{Math.max(...data)}</td>
  //       <td>{'fsd'}</td>
  //       <td>{'esfr'}</td>
  //     </tr>
  //   ));
  // };

  let average = (array) => array.reduce((a, b) => a + b) / array.length;

  const generateAvgRecordTemperatures = (temps3, avgRecordTableHeaders) => {
    return temps3.map((data, i) => (
      <tr key={i}>
        <td style={{ fontWeight: 675 }}>{avgRecordTableHeaders[i]}</td>
        <td>{data.low}</td>
        <td>{data.med}</td>
        <td>{data.high}</td>
      </tr>
    ));
  };

  return (
    <div className="tables">
      <h1> Results </h1>
      {ready ? (
        <>
          <div className="linearTable">
            <h4>Linear Model Predictions</h4>
            <Table responsive="sm">
              <thead>
                <tr>
                  <th> </th>
                  <th>Average Temperature</th>
                  <th>MSE</th>
                  <th>R^2</th>
                </tr>
              </thead>
              <tbody>
                {generateLinearTable(inputs.model, linearModelTableHeaders)}
              </tbody>
            </Table>
          </div>
          <div>
            <p> </p>
          </div>
          <div className="clusterModelTable">
            <h4>Cluster Model Calculations</h4>
            {/* <p>
              This chart shows the median, highest, and lowest temperatures of
              the year
            </p> */}
            <Table responsive="sm">
              <thead>
                <tr>
                  <th> </th>
                  <th>Average</th>
                  <th>Highest Temperature</th>
                  <th>Lowest Temperature</th>
                  {/* <th>Average (pre-1980)</th>
                  <th>Average (post-1980)</th> */}
                </tr>
              </thead>
              <tbody>
                {/* {generateClusterModelCalculations(
                  inputs.cluster[0],
                  clusterModelTableHeaders
                )} */}
                <tr>
                  <td style={{ fontWeight: 700 }}>Lowest Temperature</td>
                  <td>
                    {average(inputs.cluster[0]['Low Temp Cluster']).toFixed(2)}
                    &#176;C
                  </td>
                  <td>
                    {Math.max(...inputs.cluster[0]['Low Temp Cluster']).toFixed(2)}
                    &#176;C
                  </td>
                  <td>
                    {Math.min(...inputs.cluster[0]['Low Temp Cluster']).toFixed(2)}
                    &#176;C
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>Middle Temperature</td>
                  <td>
                    {average(inputs.cluster[0]['Mid Temp Cluster']).toFixed(2)}
                    &#176;C
                  </td>
                  <td>
                    {Math.max(...inputs.cluster[0]['Mid Temp Cluster']).toFixed(
                      2
                    )}
                    &#176;C
                  </td>
                  <td>
                    {Math.min(...inputs.cluster[0]['Mid Temp Cluster']).toFixed(
                      2
                    )}
                    &#176;C
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>Highest Temperature</td>
                  <td>
                    {average(inputs.cluster[0]['High Temp Cluster']).toFixed(2)}
                    &#176;C
                  </td>
                  <td>
                    {Math.max(...inputs.cluster[0]['High Temp Cluster']).toFixed(2)}
                    &#176;C
                  </td>
                  <td>
                    {Math.min(...inputs.cluster[0]['High Temp Cluster']).toFixed(2)}
                    &#176;C
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div>
            <p> </p>
          </div>
          {/* <div className="avgRecordTable">
      <h4>Average and Record Temperatures</h4>
      <Table responsive="sm">
        <thead>
          <tr>
            <th> </th>
            <th>Pre-1980</th>
            <th>Post-1980</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {generateAvgRecordTemperatures(temps3, avgRecordTableHeaders)}
        </tbody>
      </Table>
    </div> */}
          <div className="plots">
            <div className="histTempDataPlot">
              <Plot
                data={[
                  {
                    x: [1, 1.5, 2, 3],
                    y: [2, 4, 6, 3],
                    type: 'scatter',
                    mode: 'markers',
                    marker: { color: 'black' },
                  },
                ]}
                layout={{
                  width: 600,
                  height: 500,
                  title: 'Historical Temperature Data',
                }}
              />
            </div>
            <div className="histRangeTempsPlot">
              <Plot
                data={[
                  {
                    x: [1, 1.5, 2, 3],
                    y: [2, 4, 6, 3],
                    type: 'scatter',
                    mode: 'markers',
                    marker: { color: 'black' },
                  },
                ]}
                layout={{
                  width: 600,
                  height: 500,
                  title: 'Historical High Temp Cluster/Low Range Temperatures',
                }}
              />
            </div>
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default Results;
