/* eslint-disable no-return-assign */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../redux/pollution-reducer/pollutionSlice';
import address from '../redux/CountryAddress/address';
import MapChart from '../Components/map';

function Home() {
  const [filter, setFilter] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = address;
  const handleClick = (element) => {
    navigate(`/${element[3]}`);
    dispatch(
      fetchData({
        lat: element[1],
        long: element[2],
        countrySymbol: element[0],
        countryName: element[3],
      }),
    );
  };
  const updateResult = (result) => (result % 2 === 1 ? result + 1 : result + 3);
  const filteredCountry = (country) => country.filter((name) => name[3]
    .toLowerCase().includes(filter.toLowerCase()));
  let color = 0;
  return (
    <div className="text-center">
      <MapChart />
      <div className="mx-4">
        <InputGroup className="my-3">
          <Form.Control
            placeholder="Search by country name....!"
            aria-label="Search by country name....!"
            aria-describedby="basic-addon2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </InputGroup>
      </div>
      <h5 className="text-start ps-4 py-1 backgroundColorOdd">STATS BY COUNTRY</h5>
      <div className="m-0 d-flex flex-wrap justify-content-center" style={{ cursor: 'pointer' }}>
        {filteredCountry(data).map((element, index) => (
          <section
            key={element[2]}
            onClick={() => handleClick(element)}
            aria-hidden="true"
            style={{ flex: '40%', height: '155px' }}
            className={`countryDetails d-flex text-center justify-content-center align-items-center text-white link-light ${
              color === index ? (color = updateResult(color)) : 'backgroundColorOdd'
            }`}
          >
            <div>
              <h5>{element[0]}</h5>
              <h6>{element[3]}</h6>
              <p>
                latitude:&nbsp;
                {Math.round(element[1] * 100) / 100}
                <br />
                longitude:&nbsp;
                {Math.round(element[2] * 100) / 100}
              </p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default Home;
