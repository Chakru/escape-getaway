import { useState } from 'react';
import ReactMapGl, { Marker } from 'react-map-gl';
import cities from '../../../src/cities.json';
import image from '../../../src/assets/maps-and-flags.svg';

const MapView = ({ match }) => {
  const userCity = Object.values(cities);
  let cityLocation = '';

  userCity.map(city => {
    if (city.name === match.params.city) {
      cityLocation = city.location;
    }
  });

  const [viewport, setViewport] = useState({
    latitude: cityLocation.lat,
    longitude: cityLocation.lon,
    width: '100vw',
    height: '100vh',
    zoom: 10,
  });

  const mapMarker = userCity.map(city => (
    <Marker
      key={city.id}
      latitude={cityLocation.lat}
      longitude={cityLocation.lon}
    >
      <button>
        <img src={image} alt="Marker" />
      </button>
    </Marker>
  ));

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
