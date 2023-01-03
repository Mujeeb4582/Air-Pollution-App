import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/pollution-reducer/pollutionSlice';

const About = () => {
  const pollutionData = useSelector((state) => state.airPollution);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  console.log(pollutionData);
  return (
    <div>
      <h2>list of air pollution</h2>
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
          <ul>
            <span>Air Quality Index:&emsp;</span>
            {pollutionData.pollutionData.list[0].main.aqi}
            <p>
              Date:&emsp;
              {new Date(pollutionData.pollutionData.list[1].dt).toLocaleDateString('en-US')}
            </p>
          </ul>
          <table style={{ width: '100%', border: '1px solid black' }}>
            <thead>
              <tr>
                <th style={{ width: '50%', border: '1px solid black' }}>Gases</th>
                <th style={{ width: '100%', border: '1px solid black' }}>Pollutant concentration in μg/m3</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(pollutionData.pollutionData.list[1].components).map(([key, val]) => (
                <tr key={val}>
                  <td style={{ border: '1px solid black' }}>{key.toUpperCase()}</td>
                  <td style={{ border: '1px solid black' }}>{val}</td>
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
