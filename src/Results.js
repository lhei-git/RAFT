import { useCallback, useContext, useEffect } from 'react';
import './App.css';
import { InputsContext } from './context/InputsContext';
import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Data } from '@react-google-maps/api';
import React from 'react';
import Plot from 'react-plotly.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';


const Results = ({ ready }) => {
  const { inputs } = useContext(InputsContext);

  console.log(inputs.training_data && inputs.training_data)

  const generateLinearTable = (temps1) => {
      return temps1.map((data, i) => (
        <tr key={i}>
          <td style={{ fontWeight: 675 }}>{data.name}</td>
          <td>{data.prediction[0].toFixed(2)}&#176;C</td>
          <td>{data.metrics.mse.toFixed(2)}</td>
          <td>{data.metrics.r2.toFixed(2)}</td>
        </tr>
      ));
    };

    const renderR2Tooltip = (props) => (
      <Tooltip {...props}>
        Measure of how close the data is to the fitted regression line.
      </Tooltip>
    );

    const renderMSETooltip = (props) => (
      <Tooltip {...props}>
        Measure of the model's predictive power.
      </Tooltip>
    );

  let average = (array) => array.reduce((a, b) => a + b) / array.length;

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
                  <th>MSE
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderMSETooltip}
                  >
                     <FontAwesomeIcon icon={faQuestionCircle} style={{marginLeft: '2px', fontSize: '0.7rem', verticalAlign: '5px'}} />
                  </OverlayTrigger>
                  </th>
                  <th>R&sup2;  
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderR2Tooltip}
                  >
                     <FontAwesomeIcon icon={faQuestionCircle} style={{marginLeft: '2px', fontSize: '0.7rem', verticalAlign: '5px'}} />
                  </OverlayTrigger>
                  </th>
                </tr>
              </thead>
              <tbody>
                {generateLinearTable(inputs.model)}
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
              {console.log(inputs.training_data)}
              <Plot
                data={[
                  {
                    x: inputs.training_data['year'],
                    y: inputs.training_data[Object.keys(inputs.training_data)[0]],
                    type: 'scatter',
                    mode: 'markers',
                    name: 'historical data',
                    marker: { color: 'black' },
                  },
                ]}
                layout={{
                  width: 600,
                  height: 500,
                  title: 'Historical Temperature Data',
                  yaxis: {
                    title: 'Temperature (&#176;C)'
                  },
                  xaxis: {
                    title: 'Year'
                  }
                }}
              />
            </div>
            <div className="histRangeTempsPlot">
              <Plot
                data={[
                  {
                    x: inputs.cluster[1]['High Temp Plot Cluster'][0],
                    y: inputs.cluster[1]['High Temp Plot Cluster'][1],
                    type: 'scatter',
                    mode: 'markers',
                    name: 'High Temps',
                    marker: { color: 'red' },
                  },
                  {
                    x: inputs.cluster[1]['Mid Temp Plot Cluster'][0],
                    y: inputs.cluster[1]['Mid Temp Plot Cluster'][1],
                    type: 'scatter',
                    mode: 'markers',
                    name: 'Med Temps',
                    marker: { color: 'green' },
                  },
                  {
                    x: inputs.cluster[1]['Low Temp Plot Cluster'][0],
                    y: inputs.cluster[1]['Low Temp Plot Cluster'][1],
                    type: 'scatter',
                    mode: 'markers',
                    name: 'Low Temps',
                    marker: { color: 'blue' },
                  },
                ]}
                layout={{
                  width: 600,
                  height: 500,
                  title: 'Historical High Temp Cluster/Low Range Temperatures',
                  xref: 'paper',
                  yref: 'paper',
                  yaxis: {
                    title: 'Temperature (&#176;C)'
                  },
                  xaxis: {
                    title: 'Year'
                  }
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
