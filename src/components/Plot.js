import React from 'react';
import Plot from "react-plotly.js";

const DataPlot = (props) => {
    return (
        <Plot
            data={props.data}
            layout={{
                autotick: false,
                width: 600,
                height: 500,
                // xref: 'x',
                // yref: 'paper',
                yaxis: {
                    title: 'Temperature (&#176;C)'
                },
                xaxis: {
                    title: 'Year'
                },
                ...props.layout    
            }}
        />
    )
}

export default DataPlot;