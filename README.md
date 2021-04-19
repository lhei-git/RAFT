
[![Sunayana](https://img.shields.io/badge/Sunayana-Team%20Lead%2C%20Documentation%20Lead-ff69b4)](https://img.shields.io/badge/Sunayana-Team%20Lead%2C%20Documentation%20Lead-ff69b4)
[![Thaddious](https://img.shields.io/badge/Thaddious-Front--End%20Lead-green)](https://img.shields.io/badge/Thaddious-Front--End%20Lead-green)
[![Shubham](https://img.shields.io/badge/Shubham-DevOps%20Lead-orange)](https://img.shields.io/badge/Shubham-DevOps%20Lead-orange)
[![Maximillian](https://img.shields.io/badge/Maximillian-Back--End%20Lead-blue)](https://img.shields.io/badge/Maximillian-Back--End%20Lead-blue)
[![James](https://img.shields.io/badge/James-Machine%20Learning%20Lead%2C%20Presentation%20Lead-yellowgreen)](https://img.shields.io/badge/James-Machine%20Learning%20Lead%2C%20Presentation%20Lead-yellowgreen)
# RAFT
Regional Assessments of Future Temperatures

## Overview
This appication pulls data from the NOAA Api and then uses that data to predict the temperatures of a specified year and specified county. Currently, this application only supports locations in the United States. 

This is the frontend repository.
The backend can be found [HERE](https://github.com/Killaskt/raft-backend)

## Contributions:
* Sunayana Sharma (yanassss)
* Thaddious Gorges (ThaddG)
* Shubham Tiwari (Killaskt)
* Maximillian Hendricks (maxh24)
* James Bradbury (codemonkeman)

## Setup

1. Open the command prompt or terminal
2. Clone the repository `git clone https://github.com/lhei-git/RAFT.git`
3. Navigate to the new directory: `cd RAFT`
4. In your terminal (while open to the project directory), `yarn Install`
5. Get a Google Maps API environment key; [follow these steps if you dont know how](https://studiosimpati.co/setup-configure-google-maps-api-key/)
6. Create a file named `.env` and place your key inside it

## Development

You can run this service locally using the `yarn start` command.
While running locally be sure to pay attention to the console output. The service should run on http://localhost:3000 in your browser.

## Deployments

This project is deployed to AWS Amplify via github. The main branch is set to directly push changes to Amplify.

## Environments

| Name | URL                                               |
| ---- | ------------------------------------------------- |
| Prod | https://main.d2abngs37ihyem.amplifyapp.com/       |

## Dependencies

* [react](https://reactjs.org/)
* [react-bootstrap](https://react-bootstrap.github.io/)
* [material-ui](https://material-ui.com/)
* [react-google-maps](https://www.npmjs.com/package/@react-google-maps/api)
* [axios](https://www.npmjs.com/package/axios)
* [react-plotly](https://plotly.com/javascript/react/)
* [react-scroll](https://www.npmjs.com/package/react-scroll)


