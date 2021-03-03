import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import cities from '../../../src/cities.json';
const sharedStyles = css`
  background-color: #eee;
  height: 40px;
  border-radius: 5px;
  border: 1px, solid, #ddd;
  margin: 10px 0 20px 0;
  padding: 20px;
  box-sizing: border-box;
`;

const StyleFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 20px;
`;
const StyleHeader = styled.div`
  text-align: center;
`;
const StyleForm = styled.form`
  width: 100%;
  max-width: 700px;
  padding: 40px;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px;
`;

const StyledLabel = styled.label`
  margin: 10px;
  padding-bottom: 10px;
`;

const StyledButton = styled.button`
  display: block;
  font-size: 0.9rem;
  border: 0;
  border-radius: 5px;
  height: 40px;
  padding: 0 20px;
  margin-top: 20px;
  cursor: pointer;
  box-sizing: border-box;
  background-color: #f7797d;
  color: #fff;
`;

const StyledError = styled.div`
  color: red;
  font-weight: 800;
  margin: 0 0 40px 0;
`;

const initialState = {
  cityName: '',
};

const SearchBox = ({ history }) => {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Submitted');
    console.log(state);
    history.push(`/${state.name}`);
    history.push(`/${state.name}`);
  };

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnSelect = item => {
    // the item selected
    console.log(item);
    setState(item);
  };

  const handleOnFocus = () => {
    console.log('Focused');
  };

  const city = cities;
  const nameCity = Object.values(city);

  return (
    <>
      <StyleFormWrapper>
        <StyleForm onSubmit={handleSubmit}>
          <StyleHeader>
            <h1>Escape Getaway</h1>
          </StyleHeader>
          <StyledLabel>
            <label htmlFor="cityName">Enter the city name</label>
          </StyledLabel>
          <ReactSearchAutocomplete
            items={nameCity}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            value={state.cityName}
            autoFocus
          />
          {error && (
            <StyledError>
              <p>{error}</p>
            </StyledError>
          )}
          <StyledButton type="submit" disabled={state.cityName < 1}>
            Submit
          </StyledButton>
        </StyleForm>
      </StyleFormWrapper>
    </>
  );
};

export default SearchBox;
