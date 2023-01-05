import React from 'react';
import { useSelector } from 'react-redux';
import MapChart from '../Components/map';

const About = () => {
  const pollutionData = useSelector((state) => state.airPollution);
  return (
    <div className="text-center">
      <MapChart />
      {pollutionData.loading && <h2>Loading...</h2>}
      {!pollutionData.loading && pollutionData.error ? (
        <h2>
          Error:
          {' '}
          {pollutionData.error}
        </h2>
      ) : null}
      {!pollutionData.loading && pollutionData.pollutionData.list ? (
        <>
          <div style={{ textAlign: 'center', margin: '16px 0' }}>
            <h4>
              {pollutionData.pollutionData.countryName}
              ,&nbsp;
              {pollutionData.pollutionData.countrySymbol}
            </h4>
            <h6>
              Date:&nbsp;
              {new Date(
                pollutionData.pollutionData.list[1].dt,
              ).toLocaleDateString('en-US')}
              &emsp;&emsp;
              <span>Air Quality Index:&nbsp;</span>
              {pollutionData.pollutionData.list[0].main.aqi}
            </h6>
          </div>
          <table
            style={{
              textAlign: 'center',
              width: '100%',
              backgroundColor: '#da4c7a',
            }}
          >
            <thead>
              <tr className="fs-4">
                <th
                  style={{ width: '50%' }}
                  className="py-2"
                >
                  Gases
                </th>
                <th
                  style={{ width: '100%' }}
                  className="py-2"
                >
                  Pollutant concentration in μg/m3
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(
                pollutionData.pollutionData.list[1].components,
              ).map(([key, val]) => (
                <tr
                  key={val}
                  className="table-row"
                >
                  <td className="py-3 fs-5">{key.toUpperCase()}</td>
                  <td className="py-3 fs-5">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}
    </div>
  );
};

export default About;
