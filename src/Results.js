import { useContext, useEffect } from 'react';
import './App.css';
import { InputsContext } from './context/InputsContext';
import { Table } from 'react-bootstrap';
import { Data } from '@react-google-maps/api';
import React from 'react';
import Plot from 'react-plotly.js';

const Results = () => {
  const linearModelTableHeaders = ['Average Temperature', 'MSE', 'R\xB2'];
  const clusterModelTableHeaders = [
    'Average',
    'Highest',
    'Lowest',
    'Average (pre-1980)',
    'Average (post-1980',
  ];

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
    { low: 7, med: 8, high: 5 },
    { low: 7, med: 8, high: 5 },
  ];

  const temps3 = [
    { low: 34, med: 54 },
    { low: 1.2, med: 1.3 },
    { low: 7, med: 8 },
  ];

  const generateLinearTable = (temps1, linearModelTableHeaders) => {
    return temps1.map((data, i) => (
      <tr key={i}>
        <td style={{ fontWeight: 675 }}>{linearModelTableHeaders[i]}</td>
        <td>{data.low}</td>
        <td>{data.med}</td>
        <td>{data.high}</td>
      </tr>
    ));
  };

  const generateClusterModelCalculations = (
    temps2,
    clusterModelTableHeaders
  ) => {
    return temps2.map((data, i) => (
      <tr key={i}>
        <td style={{ fontWeight: 675 }}>{clusterModelTableHeaders[i]}</td>
        <td>{data.low}</td>
        <td>{data.med}</td>
        <td>{data.high}</td>
      </tr>
    ));
  };

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
      <div className="linearTable">
        <h4>Linear Model Predictions</h4>
        <Table responsive="sm">
          <thead>
            <tr>
              <th> </th>
              <th>Low Range</th>
              <th>Medium Range</th>
              <th>High Range</th>
            </tr>
          </thead>
          <tbody>{generateLinearTable(temps1, linearModelTableHeaders)}</tbody>
        </Table>
      </div>
      <div>
        <p> </p>
      </div>
      <div className="clusterModelTable">
        <h4>Cluster Model Calculations</h4>
        <Table responsive="sm">
          <thead>
            <tr>
              <th> </th>
              <th>Low Range</th>
              <th>Medium Range</th>
              <th>High Range</th>
            </tr>
          </thead>
          <tbody>
            {generateClusterModelCalculations(temps2, clusterModelTableHeaders)}
          </tbody>
        </Table>
      </div>
      <div>
        <p> </p>
      </div>
      <div className="avgRecordTable">
        <h4>Average and Record Temperatures</h4>
        <Table responsive="sm">
          <thead>
            <tr>
              <th> </th>
              <th>Pre-1980</th>
              <th>Post-1980</th>
            </tr>
          </thead>
          <tbody>
            {generateAvgRecordTemperatures(temps3, avgRecordTableHeaders)}
          </tbody>
        </Table>
      </div>
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
              title: 'Historical High/Middle/Low Range Temperatures',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Results;
