import { useState } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchBox from './Components/SearchBox/SearchBox';
import MapView from './Components/MapView/MapView';

let dark = '#161625';
let light = '#EEE';
const CheckBoxWrapper = styled.div`
  position: relative;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #4fbe79;
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

const MajorStyle = createGlobalStyle`
html {
    height: 100%;
}
body {
    background-color: ${props => (props.theme.mode === 'dark' ? dark : light)};
    color:  ${props => (props.theme.mode === 'dark' ? light : dark)};
    font-family: 'Montserrat', sans-serif;
    height: 100%;
    margin: 0;
}
`;

export default function StyledToggle() {
  const [theme, setTheme] = useState({ mode: 'light' });

  function handleTheme() {
    setTheme(theme.mode === 'dark' ? { mode: 'light' } : { mode: 'dark' });
  }

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <>
          <MajorStyle />
          <CheckBoxWrapper>
            <CheckBox id="checkbox" type="checkbox" onClick={handleTheme} />
            <CheckBoxLabel htmlFor="checkbox" />
            <Switch>
              <Route path="/:city" component={MapView} />
              <Route exact path="/" component={SearchBox} />
            </Switch>
          </CheckBoxWrapper>
        </>
      </ThemeProvider>
    </Router>
  );
}
