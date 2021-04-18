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

import DataPlot from './Plot';

const Results = ({ getData }) => {
  const { inputs, getModelData, getClusters, getTrainingData } = useContext(
    InputsContext
  );
  const [dataRetrieved, setDataRetrieved] = useState(false);
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
  const [toggleClustered, setToggleClustered] = useState(false);
  const toggleClickClustered = () => {
    setToggleClustered(!toggleClustered);
  };

  const graphLabelStyle = {
    textAlign: 'Left',
    fontWeight: 675,
    minWidth: '100px',
    maxWidth: '200px',
  };

  // useEffect(() => {
  //   setMonth(inputs.month);
  // }, [inputs.month])

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
          mode: !toggleClustered ? 'markers' : 'lines+markers',
          name: 'High Temps',
          marker: { color: 'red' },
        },
        {
          x: cls['Mid Temp Cluster'][0],
          y: cls['Mid Temp Cluster'][1],
          type: 'scatter',
          mode: !toggleClustered ? 'markers' : 'lines+markers',
          name: 'Med Temps',
          marker: { color: 'green' },
        },
        {
          x: cls['Low Temp Cluster'][0],
          y: cls['Low Temp Cluster'][1],
          type: 'scatter',
          mode: !toggleClustered ? 'markers' : 'lines+markers',
          name: 'Low Temps',
          marker: { color: 'blue' },
        },
      ]);
      setDataRetrieved(true);
    }
  }, [inputs.training_data, inputs.cluster, toggle, toggleClustered]);

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
          <td>{data?.prediction[0].toFixed(2)}&#176;C</td>
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

    // console.log(inputs.cluster[1][tempCluster2['Low']][0][inputs.cluster[1][tempCluster2['Low']][1].indexOf(Math.max(...temps['High Temp Cluster']))])
    // console.log(pre['Pre Low Temp Cluster']);
    return tempCluster.map((t, i) => (
      <tr key={i}>
        <td style={graphLabelStyle}>{tempTitle[i]}</td>
        <td>
          {average(temps[t][1]).toFixed(2)}
          &#176;C
          <br />
          <Badge variant="dark">
            {temps[t][0][0]} - {temps[t][0][temps[t][0].length - 1]}
          </Badge>
        </td>
        <td>
          {Math.max(...temps[t][1]).toFixed(2)}
          &#176;C
          <br />
          <Badge variant="dark">
            {temps[t][0][temps[t][1].indexOf(Math.max(...temps[t][1]))]}
          </Badge>
        </td>
        <td>
          {Math.min(...temps[t][1]).toFixed(2)}
          &#176;C
          <br />
          <Badge variant="dark">
            {temps[t][0][temps[t][1].indexOf(Math.min(...temps[t][1]))]}
          </Badge>
        </td>
        <td>
          {average(pre['Pre ' + t][1]).toFixed(2)}
          &#176;C
          <br />
          <Badge variant="dark">
            {pre['Pre ' + t][0][0]} -{' '}
            {pre['Pre ' + t][0][pre['Pre ' + t][0].length - 1]}
          </Badge>
        </td>
        <td>
          {average(post['Post ' + t][1]).toFixed(2)}
          &#176;C
          <br />
          <Badge variant="dark">
            {post['Post ' + t][0][0]} -{' '}
            {post['Post ' + t][0][post['Post ' + t][0].length - 1]}
          </Badge>
        </td>
      </tr>
    ));
  };

  const generatePrePostTable = (temps) => {
    const labels = ['Post-1980', 'Pre-1980', 'All Data'];
    console.log(temps['post'][month]);
    return Object.keys(temps).map((data, i) => (
      <tr>
        <td>{labels[i]}</td>
        {/* average */}
        <td>
          {average(temps[data][month]).toFixed(2)}
          &#176;C
          <br />
          <Badge variant="dark">
            {temps[data]['year'][0]} -{' '}
            {temps[data]['year'][temps[data][month].length - 1]}
          </Badge>
        </td>
        {/* highest */}
        <td>
          {Math.max(...temps[data][month]).toFixed(2)}
          &#176;C
          <br />
          <Badge variant="dark">
            {
              temps[data]['year'][
                temps[data][month].indexOf(Math.max(...temps[data][month]))
              ]
            }
          </Badge>
        </td>
        {/* lowest */}
        <td>
          {Math.min(...temps[data][month]).toFixed(2)}
          &#176;C
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
    ));
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
              <th>Clusters</th>
              <th>Average</th>
              <th>Highest Temperature</th>
              <th>Lowest Temperature</th>
              <th>Average (pre-1980)</th>
              <th>Average (post-1980)</th>
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
              <th>Average temperature</th>
              <th>Highest Temperature</th>
              <th>Lowest Temperature</th>
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
      <h2> {`for ${inputs.month}`} </h2>
      <div className="tables-charts-two">
        <div className="PrePostTable">
          <h1 style={{ fontSize: '1.5em', fontWeight: 'bolder' }}>
            Linear Model Predictions for {inputs.month} , {inputs.year}
          </h1>
          <Card>
            <Card.Body style={{ padding: '.3em 1.25em 0px' }}>
              <ModelDataTable />
            </Card.Body>
          </Card>
        </div>

        <div className="clusterModelTable">
          <h1 style={{ fontSize: '1.5em', fontWeight: 'bolder' }}>
            Cluster Analysis for Selected Stations
          </h1>
          <Card>
            <Card.Body style={{ padding: '.75em 1.25rem 0' }}>
              <Card.Subtitle></Card.Subtitle>
              <Card.Text>
                <ClusterDataTable />
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div className="linearTable">
          <h1 style={{ fontSize: '1.5em', fontWeight: 'bolder' }}>
            Temperatures for Selected Stations (Pre & Post 1980)
          </h1>
          <Card>
            <Card.Body style={{ padding: '.75em 1.25rem 0' }}>
              <Card.Text>
                <PrePostTable />
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="histTempDataPlot" style={{ position: 'relative' }}>
          <h1 style={{ fontSize: '1.5em', fontWeight: 'bolder' }}>
            Historical Temperature Data
          </h1>
          {trainingPlotData.length > 0 ? (
            getPlot(trainingPlotData, {
              // title: 'Historical Temperature Data',
            })
          ) : (
            <Skeleton variant="rect" width={500} height={500} />
          )}
          <Form style={{ position: 'absolute', top: '50px', left: '30px' }}>
            <Form.Check
              type="switch"
              id="scatLine"
              label="Scatter/Line"
              onClick={toggleClick}
            />
          </Form>
        </div>
        <div className="histRangeTempsPlot" style={{ position: 'relative' }}>
          <h1 style={{ fontSize: '1.5em', fontWeight: 'bolder' }}>
            Clustered Historical Temperatures
          </h1>
          {clusterPlotData.length > 0 ? (
            getPlot(clusterPlotData, {
              // title: 'Clustered Historical Temperatures',
            })
          ) : (
            <Skeleton variant="rect" width={500} height={500} />
          )}
          <Form style={{ position: 'absolute', top: '50px', left: '30px' }}>
            <Form.Check
              type="switch"
              id="scatLineCluster"
              label="Scatter/Line"
              onClick={toggleClickClustered}
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Results;
