import { useContext, useEffect, useState } from 'react';
import aboutImage from '../assets/temperature-figure1-2016.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import './About.css';

function About() {
  const [open, setOpen] = useState(false);
  const [spin, setSpin] = useState(false);

  const toggleHover = () => setSpin(!spin);

  return (
    <div className="App">
      <div className="default-view-container-about">
        <div className="default-view">
          <div className="title-logo-about">
            <div className="title">
              <FontAwesomeIcon
                className={spin ? 'fa-spin' : ''}
                onMouseLeave={toggleHover}
                onMouseEnter={toggleHover}
                icon={faGlobeAmericas}
                style={{ fontSize: '2.7rem', verticalAlign: '0rem' }}
              />
              <h1 style={{ paddingLeft: '10px' }}>
                <a href="/" className="logo" style={{ color: '#000' }}>
                  RAFT
                </a>
              </h1>
            </div>
          </div>

          <div className="title">
            <h3 style={{ paddingBottom: '.5rem' }}>
              Regional Temperature Profiler
            </h3>
          </div>
          <div className="description">
            <p>
              Temperatures are on average increasing across the world. This
              recent growth in average temperature is referred to as global
              warming. Global warming has been associated with various types of
              climatic and environmental change, hence the associated term
              climate change. According to analyses from NOAA’s temperature
              records since 1901,{' '}
              <a href="https://www.epa.gov/climate-indicators/climate-change-indicators-us-and-global-temperature">
                the EPA reports
              </a>{' '}
              that average surface temperature has risen at an average rate of
              0.14°F per decade across the contiguous 48 US states. From{' '}
              <a href="https://climate.nasa.gov/vital-signs/global-temperature/">
                1880 to 2020 global average temperature
              </a>{' '}
              has risen by 1.84° F (1.02° C). <br /> <p> </p>
              Since the late 1970s average temperatures have risen more quickly,
              beginning a trend of the warmest years on record in the US, as the
              graph shows below.{' '}
              <img
                src={aboutImage}
                alt="temperature graph"
                width="800"
                height="500"
              />
              <br /> <p> </p>
              <a href="https://climate.nasa.gov/news/3061/2020-tied-for-warmest-year-on-record-nasa-analysis-shows/">
                According to NASA
              </a>
              , 2020 tied with 2016 as the warmest years on record for global
              average surface temperature. In a novel and likely impactful
              study, as of March 2021{' '}
              <a href="https://climate.nasa.gov/news/3072/direct-observations-confirm-that-humans-are-throwing-earths-energy-budget-off-balance/">
                NASA confirmed{' '}
              </a>{' '}
              climate model predictions that human greenhouse gases emissions,
              and not other natural factors, that account for most of the
              increase in temperatures from 2003 through 2018. <br /> <p> </p>
              There is a{' '}
              <a href="https://climate.nasa.gov/evidence/">
                {' '}
                long list of independent research{' '}
              </a>
              on this topic including from the Intergovernmental Panel on
              Climate Change (<a href="https://www.ipcc.ch/">IPCC</a>). Although
              the change in degrees may seem small, this research and knowledge
              about climate suggests they may have strong impacts on human and
              other life, including with substantial changes to sea level,
              droughts, floods, heat waves, agriculture, diseases and
              hurricanes. Globally, it may be a factor for the{' '}
              <a href="https://www.brookings.edu/research/the-climate-crisis-migration-and-refugees/">
                migration of millions
              </a>
              . Although these changes are acknowledged, it is unclear how
              temperature changes will impact specific towns and regions across
              the US and the world. <br /> <p> </p>
              To provide information about existing temperature changes and
              potential future temperatures for specific counties and
              communities across the US, I conceptualized a project on regional
              assessments of future temperatures (RAFT). The first project of
              this program is the Regional Temperature Profiler (RTP). <br />{' '}
              <p> </p>
              RTP is an open-access and open-source web-based application that
              facilitates research and understanding of historical temperature
              changes for particular regions of the US, namely by analysis of
              county temperatures. The application retrieves data from NOAA’s
              API to create a county profile of temperatures from selected
              county data stations, retrieved as "GHCND: [Data Station ID]."{' '}
              <br />
              <p> </p>
              RTP presents record and average temperatures for the specific
              county and specific month of interest selected by the user. It
              provides analyses of pre- and post-1980 temperatures – given the
              higher rise in temperatures observed since then. RTP also performs
              a cluster analysis to identify the low, middle and high clusters
              of temperatures across the temperature record. Lastly, RTP
              performs a simple regression analysis to attempt to predict future
              average temperatures for the particular month of interest and a
              future year of interest selected by the user. Although model
              accuracy, as reported by MSE and R2 scores are not often strong we
              intend to improve these analyses in future implementations. <br />{' '}
              <p> </p>
              RAFT and RTP were conceptualized by Nic DePaula, assistant
              professor of information science at Wayne State University, and
              Dir. of the{' '}
              <a href="https://lhei.org/">
                Lab for Health and Environmental Information
              </a>{' '}
              (LHEI).
            </p>
          </div>
          <div>{/* <img src=“rtpLogo.jpg" alt="RTP"> */}</div>
        </div>
      </div>
    </div>
  );
}

export default About;
