import React from 'react';
import Plot from 'react-plotly.js';

const DataPlot = (props) => {
  return (
    <Plot
      data={props.data}
      layout={{
        // shapes: [
        //   {
        //     type: 'rect',
        //     xref: 'x',
        //     yref: 'paper',
        //     x0: '1979.8',
        //     y0: 0,
        //     x1: '1980.2',
        //     y1: 1,
        //     fillcolor: 'purple',
        //     opacity: 1,
        //     title: 'Year',

        //     line: {
        //       width: 0,
        //     },
        //   },
        // ],
        width: 600,
        height: 500,
        yaxis: {
          title: 'Temperature (&#176;C)',
        },
        xaxis: {
          title: 'Year',
        },
        ...props.layout,
      }}
    />
  );
};

export default DataPlot;
