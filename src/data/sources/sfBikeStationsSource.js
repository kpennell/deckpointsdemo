const SF_BIKE_STATIONS_SOURCE_ID = 'sfBikeStationsSource';

const source = {
  id: SF_BIKE_STATIONS_SOURCE_ID,
  data: 'select * from sf_bike_stations',
  type: 'sql',
};

export default source;
