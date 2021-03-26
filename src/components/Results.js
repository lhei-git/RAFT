import { Suspense, useCallback, useContext, useEffect, useState } from "react";
import "./../App.css";
import { InputsContext, InputsProvider } from "../context/InputsContext";
import { Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Data } from "@react-google-maps/api";
import React from "react";
import Plot from "react-plotly.js";
import Skeleton from "@material-ui/lab/Skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import DataPlot from "./Plot";

const Results = ({ getData }) => {
  const { inputs, getModelData, getClusters, getTrainingData } = useContext(
    InputsContext
  );
  const [dataRetrieved, setDataRetrieved] = useState(false);
  // const [dataRetrieved2, setDataRetrieved2] = useState(false);

  const [trainingPlotData, setTrainingPlotData] = useState([]);
  const [clusterPlotData, setClusterPlotData] = useState([]);

  const graphLabelStyle = { 
    textAlign: "Left", 
    fontWeight: 675,
    minWidth: '100px',
    maxWidth: '200px' 
  };

  useEffect(() => {
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
    if (
      inputs.cluster.length > 0 &&
      Object.keys(inputs.training_data).length > 0
    ) {
      setTrainingPlotData([
        {
          x: inputs.training_data["year"],
          y: inputs.training_data[Object.keys(inputs.training_data)[0]],
          type: "scatter",
          text: ["1980"],
          mode: "markers",
          name: "historical data",
          marker: { color: "black" },
        },
      ]);
      setClusterPlotData([
        {
          x: inputs.cluster[1]["High Temp Plot Cluster"][0],
          y: inputs.cluster[1]["High Temp Plot Cluster"][1],
          type: "scatter",
          mode: "markers",
          text: ["1980"],
          name: "High Temps",
          marker: { color: "red" },
        },
        {
          x: inputs.cluster[1]["Mid Temp Plot Cluster"][0],
          y: inputs.cluster[1]["Mid Temp Plot Cluster"][1],
          type: "scatter",
          mode: "markers",
          name: "Med Temps",
          marker: { color: "green" },
        },
        {
          x: inputs.cluster[1]["Low Temp Plot Cluster"][0],
          y: inputs.cluster[1]["Low Temp Plot Cluster"][1],
          type: "scatter",
          mode: "markers",
          name: "Low Temps",
          marker: { color: "blue" },
        },
      ]);
      setDataRetrieved(true);
    }
  }, [inputs.training_data, inputs.cluster]);

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
    return temps.map((data, i) => (
      <tr key={i}>
        <td style={graphLabelStyle}>{data?.name}</td>
        <td>{data?.prediction[0].toFixed(2)}&#176;C</td>
        <td>{data?.metrics.mse.toFixed(2)}</td>
        <td>{data?.metrics.r2.toFixed(2)}</td>
      </tr>
    ));
  };

  const generateClusterTable = (temps, pre, post) => {
    let tempTitle = ["Low", "Middle", "High"];
    let tempCluster = [
      "Low Temp Cluster",
      "Mid Temp Cluster",
      "High Temp Cluster",
    ];
    // let tempCluster2 = ['Pre Low Temp Cluster', 'Pre Mid Temp Cluster', 'Pre High Temp Cluster']
    // let tempCluster3 = ['Post Low Temp Cluster', 'Post Mid Temp Cluster', 'Post High Temp Cluster']

    return tempCluster.map((t, i) => (
      <tr key={i}>
        <td style={graphLabelStyle}>{tempTitle[i]}</td>
        <td>
          {average(temps[t]).toFixed(2)}
          &#176;C
        </td>
        <td>
          {Math.max(...temps[t]).toFixed(2)}
          &#176;C
        </td>
        <td>
          {Math.min(...temps[t]).toFixed(2)}
          &#176;C
        </td>
        <td>
          {average(pre["Pre " + t]).toFixed(2)}
          &#176;C
        </td>
        <td>
          {average(post["Post " + t]).toFixed(2)}
          &#176;C
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
        <Table responsive="sm">
          <thead>
            <tr>
              <th> </th>
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
                      marginLeft: "2px",
                      fontSize: "0.7rem",
                      verticalAlign: "5px",
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
                      marginLeft: "2px",
                      fontSize: "0.7rem",
                      verticalAlign: "5px",
                    }}
                  />
                </OverlayTrigger>
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(inputs.model).length > 0
              ? generateModelDataTable(inputs.model)
              : generateSkeleton(3, 4)}
          </tbody>
        </Table>
      </>
    );
  };

  const ClusterDataTable = useCallback(() => {
    console.log("ran2");

    return (
      <>
        <Table responsive="sm">
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
                  inputs.cluster[2],
                  inputs.cluster[3]
                )
              : generateSkeleton(3, 6)}
          </tbody>
        </Table>
      </>
    );
  }, [inputs.cluster, getClusters]);

  const getPlot = useCallback(
    (data, layout) => {
      return dataRetrieved ? <DataPlot data={data} layout={layout} /> : "";
    },
    [inputs.training_data, inputs.cluster, dataRetrieved]
  );

  return (
    <div className="tables">
      <h2> {`${inputs.county}, ${inputs.state} Results`} </h2>
      <>
        <div className="linearTable">
          <h4>Linear Model Predictions</h4>
          <ModelDataTable />
        </div>
        <div>
          <p> </p>
        </div>
        <div className="clusterModelTable">
          <h4>Cluster Model Calculations</h4>
          <p>
            This chart shows the median, highest, and lowest temperatures of the
            year
          </p>
          <ClusterDataTable />
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
    </div>  */}
        <div className="plots">
          <div className="histTempDataPlot">
            {trainingPlotData.length > 0 ? (
              getPlot(trainingPlotData, {
                title: "Historical Temperature Data",
              })
            ) : (
              <Skeleton variant="rect" width={500} height={500} />
            )}
          </div>
          <div className="histRangeTempsPlot">
            {clusterPlotData.length > 0 ? (
              getPlot(clusterPlotData, {
                title: "Clustered Historical Temperatures",
              })
            ) : (
              <Skeleton variant="rect" width={500} height={500} />
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default Results;
