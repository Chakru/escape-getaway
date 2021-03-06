import { useState } from 'react';
import mapboxgl from 'mapbox-gl';
import cities from '../../cities.json';
import ReactMapGl, { Marker } from 'react-map-gl';
import { ReactComponent as Image } from '../../assets/maps-and-flags.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const MapView = ({ match }) => {
  const userCity = Object.values(cities);
  let cityLocation = '';

  userCity.map(city => {
    if (city.name === match.params.city) {
      cityLocation = city.location;
    } else {
      return;
    }
  });

  const [viewport, setViewport] = useState({
    latitude: cityLocation.lat,
    longitude: cityLocation.lon,
    width: '100vw',
    height: '100vh',
    zoom: 10,
  });

  const mapMarker = (
    <Marker latitude={cityLocation.lat} longitude={cityLocation.lon}>
      <button style={{ background: 'transparent', border: '0' }}>
        <Image style={{ height: '50px', width: '50px' }} />
      </button>
    </Marker>
  );

  return (
    <div>
      <ReactMapGl
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/chakru/cklt84jrb139817pnj5pfzsqa"
        onViewportChange={viewport => setViewport(viewport)}
      >
        {mapMarker}
      </ReactMapGl>
    </div>
  );
};

export default MapView;
