import { Suspense, useCallback, useContext, useEffect, useState } from 'react';
import './../App.css';
import { InputsContext, InputsProvider } from '../context/InputsContext';
import {
  Card,
  Table,
  OverlayTrigger,
  Tooltip,
  ListGroup,
  ListGroupItem,
  Badge,
  Form,
} from 'react-bootstrap';
import { Data } from '@react-google-maps/api';
import React from 'react';
import Plot from 'react-plotly.js';
import Skeleton from '@material-ui/lab/Skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

import DataPlot from './Plot';
import { Grid } from '@material-ui/core';

const Results = ({ getData }) => {
  const { inputs, getModelData, getClusters, getTrainingData } = useContext(
    InputsContext
  );
  const [dataRetrieved, setDataRetrieved] = useState(false);
  const [convertToF, setConvertToF] = useState(false);
  // const [dataRetrieved2, setDataRetrieved2] = useState(false);

  const [trainingPlotData, setTrainingPlotData] = useState([]);
  const [clusterPlotData, setClusterPlotData] = useState([]);
  const [month, setMonth] = useState(inputs.month);

  // false is default
  // false = scatter, true = line
  const [toggle, setToggle] = useState(false);
  const toggleClick = () => {
    setToggle(!toggle);
  };

  const months = {
    JAN: 'January',
    FEB: 'Februrary',
    MAR: 'March',
    APR: 'April',
    MAY: 'May',
    JUN: 'June',
    JUL: 'July',
    AUG: 'August',
    SEP: 'September',
    OCT: 'October',
    NOV: 'November',
    DEC: 'December',
  };

  const graphLabelStyle = {
    textAlign: 'Left',
    fontWeight: 675,
    minWidth: '100px',
    maxWidth: '200px',
  };

  const convertCtoF = (t) => (t / 5) * 9 + 32;

  // useEffect(() => {
  //   setMonth(inputs.month);
  // }, [inputs.month])

  const convert = (b, norm, call) =>
    b ? <>{call(norm).toFixed(2)}&#176;F</> : <>{norm}&#176;C</>;

  useEffect(() => {
    setMonth(inputs.month);
    setTrainingPlotData([]);
    setClusterPlotData([]);
    getModelData(inputs.year, inputs.month);
  }, [getData]);

  useEffect(() => {
    if (Object.keys(inputs.model).length > 0) {
      getClusters();
      getTrainingData();
    }
  }, [inputs.model]);

  useEffect(() => {
    const generateXvalues = (se, data, key = 'year') => {
      var arr = [];

      for (let i = 0; i < data['station'].length; i++) {
        let d = data[key][i];
        let idx = se.indexOf(data['station'][i]);
        try {
          arr[idx].push(d);
        } catch (e) {
          arr.push([d]);
        }
      }

      return arr; // [[x values per station], [] , []...]
    };

    if (
      inputs.cluster.length > 0 &&
      Object.keys(inputs.training_data).length > 0
    ) {
      const stations = Array.from(
        new Set(inputs.training_data['training_data']['station'])
      );
      const xvals = generateXvalues(
        stations,
        inputs.training_data['training_data'],
        month
      );
      const yearvals = generateXvalues(
        stations,
        inputs.training_data['training_data'],
        'year'
      );
      const data = xvals.map((data, i) => ({
        x: yearvals[i],
        y: data,
        type: 'scatter',
        mode: !toggle ? 'markers' : 'lines+markers',
        name: stations[i],
      }));
      console.log(
        new Set(inputs.training_data['training_data']['station']),
        stations,
        xvals,
        data
      );
      setTrainingPlotData(data);
      let cls = inputs.cluster[0];
      setClusterPlotData([
        {
          x: cls['High Temp Cluster'][0],
          y: cls['High Temp Cluster'][1],
          type: 'scatter',
          mode: 'markers',
          name: 'High Temps',
          marker: { color: 'red' },
        },
        {
          x: cls['Mid Temp Cluster'][0],
          y: cls['Mid Temp Cluster'][1],
          type: 'scatter',
          mode: 'markers',
          name: 'Med Temps',
          marker: { color: 'green' },
        },
        {
          x: cls['Low Temp Cluster'][0],
          y: cls['Low Temp Cluster'][1],
          type: 'scatter',
          mode: 'markers',
          name: 'Low Temps',
          marker: { color: 'blue' },
        },
      ]);
      setDataRetrieved(true);
    }
  }, [inputs.training_data, inputs.cluster, toggle]);

  const generateSkeleton = (rows, cols) =>
    [...Array(rows)].map((_, i) => (
      <tr key={i}>
        {[...Array(cols)].map((_, j) => (
          <td key={j}>
            <Skeleton animation="wave" />
          </td>
        ))}
      </tr>
    ));

  const generateModelDataTable = (temps) => {
    let labels = ['Low', 'Middle', 'High', 'All Data'];
    return temps.map((data, i) =>
      data ? (
        <tr key={i}>
          <td style={graphLabelStyle}>
            {data?.name.split(' ')[0] === 'All'
              ? 'All Data'
              : data?.name.split(' ')[0]}
          </td>
          <td>
            {convert(convertToF, data?.prediction[0].toFixed(2), convertCtoF)}
          </td>
          <td>{data?.metrics.mse.toFixed(2)}</td>
          <td>{data?.metrics.r2.toFixed(2)}</td>
        </tr>
      ) : (
        <tr key={i}>
          <td style={{ textAlign: 'left' }}>{labels[i]}</td>
          <td>Not Enough Data</td>
          <td></td>
          <td></td>
        </tr>
      )
    );
  };

  const generateClusterTable = (temps, pre, post) => {
    let tempTitle = ['Low', 'Middle', 'High'];
    let tempCluster = [
      'Low Temp Cluster',
      'Mid Temp Cluster',
      'High Temp Cluster',
    ];

    return tempCluster.map((t, i) => {
      let avgTemp = average(temps[t][1]).toFixed(2);
      let maxTemp = Math.max(...temps[t][1]).toFixed(2);
      let minTemp = Math.min(...temps[t][1]).toFixed(2);
      let postAvg = average(post['Post ' + t][1]).toFixed(2);
      let preAvg = average(pre['Pre ' + t][1]).toFixed(2);
      return (
        <tr key={i}>
          <td style={graphLabelStyle}>{tempTitle[i]}</td>
          <td>
            {convert(convertToF, avgTemp, convertCtoF)}
            <br />
            <Badge variant="dark">
              {temps[t][0][0]} - {temps[t][0][temps[t][0].length - 1]}
            </Badge>
          </td>
          <td>
            {convert(convertToF, maxTemp, convertCtoF)}
            <br />
            <Badge variant="dark">
              {temps[t][0][temps[t][1].indexOf(Math.max(...temps[t][1]))]}
            </Badge>
          </td>
          <td>
            {convert(convertToF, minTemp, convertCtoF)}
            <br />
            <Badge variant="dark">
              {temps[t][0][temps[t][1].indexOf(Math.min(...temps[t][1]))]}
            </Badge>
          </td>
          <td>
            {convert(convertToF, preAvg, convertCtoF)}
            <br />
            <Badge variant="dark">
              {pre['Pre ' + t][0][0]} -{' '}
              {pre['Pre ' + t][0][pre['Pre ' + t][0].length - 1]}
            </Badge>
          </td>
          <td>
            {/*arrow go here with logic */}
            {convert(convertToF, postAvg, convertCtoF)}
            {preAvg < postAvg ? (
              <FontAwesomeIcon
                icon={faArrowUp}
                style={{
                  marginLeft: '2px',
                  fontSize: '0.7rem',
                  verticalAlign: '5px',
                  color: 'red',
                }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faArrowDown}
                style={{
                  marginLeft: '2px',
                  fontSize: '0.7rem',
                  verticalAlign: '5px',
                  color: 'green',
                }}
              />
            )}
            <br />
            <Badge variant="dark">
              {post['Post ' + t][0][0]} -{' '}
              {post['Post ' + t][0][post['Post ' + t][0].length - 1]}
            </Badge>
          </td>
        </tr>
      );
    });
  };

  const generatePrePostTable = (temps) => {
    const labels = ['Post-1980', 'Pre-1980', 'All Data'];
    return Object.keys(temps)
      .reverse()
      .map((data, i) => {
        const avgTemp = average(temps[data][month]).toFixed(2);
        const maxTemp = Math.max(...temps[data][month]).toFixed(2);
        const minTemp = Math.min(...temps[data][month]).toFixed(2);
        return (
          <tr>
            <td>{labels.reverse()[i]}</td>
            <td>
              {convert(convertToF, avgTemp, convertCtoF)}
              {data === 'post' ? (
                average(temps['post'][month]) > average(temps['pre'][month]) ? (
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    style={{
                      marginLeft: '2px',
                      fontSize: '0.7rem',
                      verticalAlign: '5px',
                      color: 'red',
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    style={{
                      marginLeft: '2px',
                      fontSize: '0.7rem',
                      verticalAlign: '5px',
                      color: 'green',
                    }}
                  />
                )
              ) : (
                ''
              )}
              <br />
              <Badge variant="dark">
                {temps[data]['year'][0]} -{' '}
                {temps[data]['year'][temps[data][month].length - 1]}
              </Badge>
            </td>
            <td>
              {convert(convertToF, maxTemp, convertCtoF)}
              {data === 'post' ? (
                Math.max(...temps['post'][month]) >
                Math.max(...temps['pre'][month]) ? (
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    style={{
                      marginLeft: '2px',
                      fontSize: '0.7rem',
                      verticalAlign: '5px',
                      color: 'red',
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    style={{
                      marginLeft: '2px',
                      fontSize: '0.7rem',
                      verticalAlign: '5px',
                      color: 'green',
                    }}
                  />
                )
              ) : (
                ''
              )}
              <br />
              <Badge variant="dark">
                {
                  temps[data]['year'][
                    temps[data][month].indexOf(Math.max(...temps[data][month]))
                  ]
                }
              </Badge>
            </td>
            <td>
              {convert(convertToF, minTemp, convertCtoF)}
              {data === 'post' ? (
                Math.min(...temps['post'][month]) >
                Math.min(...temps['pre'][month]) ? (
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    style={{
                      marginLeft: '2px',
                      fontSize: '0.7rem',
                      verticalAlign: '5px',
                      color: 'red',
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    style={{
                      marginLeft: '2px',
                      fontSize: '0.7rem',
                      verticalAlign: '5px',
                      color: 'green',
                    }}
                  />
                )
              ) : (
                ''
              )}
              <br />
              <Badge variant="dark">
                {
                  temps[data]['year'][
                    temps[data][month].indexOf(Math.min(...temps[data][month]))
                  ]
                }
              </Badge>
            </td>
          </tr>
        );
      });
  };

  const renderR2Tooltip = (props) => (
    <Tooltip {...props}>
      Measure of how close the data is to the fitted regression line.
    </Tooltip>
  );

  const renderMSETooltip = (props) => (
    <Tooltip {...props}>Measure of the model's predictive power.</Tooltip>
  );

  let average = (array) => array.reduce((a, b) => a + b) / array.length;

  const ModelDataTable = () => {
    return (
      <>
        <Table responsive hover>
          <thead>
            <tr>
              <th>Cluster</th>
              <th>Average Temperature</th>
              <th>
                MSE
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderMSETooltip}
                >
                  <FontAwesomeIcon
                    icon={faQuestionCircle}
                    style={{
                      marginLeft: '2px',
                      fontSize: '0.7rem',
                      verticalAlign: '5px',
                    }}
                  />
                </OverlayTrigger>
              </th>
              <th>
                R&sup2;
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderR2Tooltip}
                >
                  <FontAwesomeIcon
                    icon={faQuestionCircle}
                    style={{
                      marginLeft: '2px',
                      fontSize: '0.7rem',
                      verticalAlign: '5px',
                    }}
                  />
                </OverlayTrigger>
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(inputs.model).length > 0
              ? generateModelDataTable(inputs.model)
              : generateSkeleton(4, 4)}
          </tbody>
        </Table>
      </>
    );
  };

  const ClusterDataTable = () => {
    // console.log('ran2');

    return (
      <>
        <Table responsive hover>
          <thead>
            <tr>
              <th>Cluster</th>
              <th>Mean</th>
              <th>Highest</th>
              <th>Lowest</th>
              <th>Pre-1980 Mean</th>
              <th>Post-1980 Mean</th>
            </tr>
          </thead>
          <tbody>
            {inputs.cluster.length > 0
              ? generateClusterTable(
                  inputs.cluster[0],
                  inputs.cluster[1],
                  inputs.cluster[2]
                )
              : generateSkeleton(3, 6)}
          </tbody>
        </Table>
      </>
    );
  };

  const PrePostTable = () => {
    console.log('ran3');

    return (
      <>
        <Table hover>
          <thead>
            <tr>
              <th> </th>
              <th>Mean</th>
              <th>Highest</th>
              <th>Lowest</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(inputs.training_data).length > 0
              ? generatePrePostTable(inputs.training_data)
              : generateSkeleton(3, 4)}
          </tbody>
        </Table>
      </>
    );
  };

  const getPlot = useCallback(
    (data, layout) => {
      return dataRetrieved ? <DataPlot data={data} layout={layout} /> : '';
    },
    [inputs.training_data, inputs.cluster, dataRetrieved]
  );

  return (
    <div className="results">
      <h2> {`${inputs.county}, ${inputs.state} Temperature Profile`} </h2>
      <h2 style={{ marginTop: '5px' }}> {`for ${months[inputs.month]}`} </h2>
      <Grid
        component="label"
        container
        spacing={1}
        style={{ position: 'absolute', left: '0', top: '0' }}
      >
        <Grid item>&#176;C</Grid>
        <Grid item>
          <Form.Check
            type="switch"
            id="convertTemp"
            onClick={() => setConvertToF(!convertToF)}
          />
        </Grid>
        <Grid item>&#176;F</Grid>
      </Grid>
      <div className="tables-charts-two">
        <div className="linearTable">
          <h1
            style={{ fontSize: '2em', fontWeight: 'bolder', color: '#2f5597' }}
          >
            Average Temperature Predictions for: {months[inputs.month]},{' '}
            {inputs.year}
          </h1>
          <p style={{ fontSize: '1.2em' }}>
            Data source: Selected stations of NOAA's GHCND
            <br />
            Model: Linear Regression Model Using Year and Average Temperatures
          </p>
          <Card>
            <Card.Body style={{ padding: '.3em 1.25em 0px' }}>
              <ModelDataTable />
            </Card.Body>
          </Card>
        </div>

        <div className="clusterModelTable">
          <h1
            style={{ fontSize: '2em', fontWeight: 'bolder', color: '#2f5597' }}
          >
            Low, Middle and High Average Temperature Clusters
          </h1>
          <p style={{ fontSize: '1.2em' }}>
            Data source: Selected Stations of NOAA's GHCND
            <br />
            Model: SciKitLearn K-Means
          </p>
          <Card>
            <Card.Body style={{ padding: '.75em 1.25rem 0' }}>
              <Card.Subtitle></Card.Subtitle>
              <Card.Text>
                <ClusterDataTable />
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="PrePostTable">
          <h1
            style={{
              fontSize: '2em',
              fontWeight: 'bolder',
              color: '#2f5597',
            }}
          >
            Mean, High and Low Average Temperatures for {months[inputs.month]}
          </h1>
          <p style={{ fontSize: '1.2em' }}>
            Data source: Selected Stations of NOAA's GHCND
          </p>
          <Card>
            <Card.Body style={{ padding: '.75em 1.25rem 0' }}>
              <Card.Text>
                <PrePostTable />
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="histTempDataPlot" style={{ position: 'relative' }}>
          <h1
            style={{ fontSize: '2em', fontWeight: 'bolder', color: '#2f5597' }}
          >
            {months[inputs.month]} Average Temperatures
          </h1>
          <p style={{ fontSize: '1.2em' }}>
            Data source: Selected Stations of NOAA's GHCND
          </p>
          {trainingPlotData.length > 0 ? (
            getPlot(trainingPlotData, {
              // title: 'Historical Temperature Data',
            })
          ) : (
            <Skeleton variant="rect" width={500} height={500} />
          )}
          <Form style={{ position: 'absolute', top: '100px', left: '70px' }}>
            <Form.Check
              type="switch"
              id="scatLine"
              label="Scatter/Line"
              onClick={toggleClick}
            />
          </Form>
        </div>
        <div className="histRangeTempsPlot" style={{ position: 'relative' }}>
          <h1
            style={{ fontSize: '2em', fontWeight: 'bolder', color: '#2f5597' }}
          >
            Clusters of {months[inputs.month]} Average Temperatures
          </h1>
          <p style={{ fontSize: '1.2em' }}>
            Data source: Selected Stations of NOAA's GHCND
            <br />
            Model: SciKitLearn K-Means{' '}
          </p>

          {clusterPlotData.length > 0 ? (
            getPlot(clusterPlotData, {
              // title: 'Clustered Historical Temperatures',
            })
          ) : (
            <Skeleton variant="rect" width={500} height={500} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
