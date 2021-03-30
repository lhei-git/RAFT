import { useContext, useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import './About.css';

function About() {
  const [open, setOpen] = useState(false);
  const [spin, setSpin] = useState(false);

  const toggleHover = () => setSpin(!spin);

  return (
    <div className="App">
      <div className="default-view-container">
        <div className="default-view">
          <div className="title-logo">
            <div className="title">
              <FontAwesomeIcon
                className={spin ? 'fa-spin' : ''}
                onMouseLeave={toggleHover}
                onMouseEnter={toggleHover}
                icon={faGlobeAmericas}
                style={{ fontSize: '2.7rem', verticalAlign: '0rem' }}
              />
              <h1 style={{ paddingLeft: '10px' }}>
                <a href="/" className="logo">
                  RAFT
                </a>
              </h1>
            </div>
          </div>

          <div className="description">
            <h3 style={{ paddingBottom: '.5rem' }}>
              Regional Temperature Profiler
            </h3>
            <p>
              RTP is a web application that will accurately predict future
              temperature values of regions in the United States of America
              based on user input. The user will input the state, county, future
              year, and month for which he would like to see the predicted
              temperature. <br />
              <p> </p>
              The data will be input into the data model which will produce the
              machine learning model predictions, cluster model calculations,
              and average and record temperatures of the chosen county to the
              user. <br /> <p> </p>Graphs showing historical temperature data
              and historical high, middle, and low range temperatures will also
              be displayed. The data being aggregated comes from NOAA (National
              Oceanic and Atmospheric Administration). <br /> <p> </p>
              Data will be collected from data stations in the county that the
              user selects. The most important data being collected are
              location, station name, region, and temperatures.
            </p>
          </div>
          <div>{/* <img src=“rtpLogo.jpg" alt="RTP"> */}</div>
        </div>
      </div>
    </div>
  );
}

export default About;
