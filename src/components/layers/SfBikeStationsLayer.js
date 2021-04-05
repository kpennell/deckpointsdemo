import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CartoSQLLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';
import { EmojiObjectsOutlined } from '@material-ui/icons';

export const SF_BIKE_STATIONS_LAYER_ID = 'sfBikeStationsLayer';

function SfBikeStationsLayer() {
  const { sfBikeStationsLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) =>
    selectSourceById(state, sfBikeStationsLayer?.source)
  );
  const cartoLayerProps = useCartoLayerProps(source);
  const [items, setItems] = useState([]);

  const [original, setOriginal] = useState([]);

  const SOURCE_ID = `sfBikeStationsSource`;
  const LAYER_ID = `sfBikeStationsLayer`;

  const getStationActivityValue = (object) => {
    if (items.length === 0) {
      return 100;
    } else {
      // console.log(parseInt(items[0].station_id));
      // console.log(parseInt(object.properties.station_id));

      const stationId = items.filter(
        (i) => parseInt(i.station_id) === parseInt(object.properties.station_id)
      );
      // console.log(stationId[0].num_bikes_available);
      return stationId[0].num_bikes_available * 10;
    }
  };

  const getFillColorBasedOnDiff = (object) => {
    //  console.log(object)

    //return[ 0,0,255]

    if (
      object.properties.station_id === undefined ||
      object.properties.station_id === null ||
      items.length === 0 ||
      original.length === 0
    ) {
      return [0, 0, 255];
    } else {
      console.log(object);
      console.log(items);
      const newData = items.filter(
        (item) => parseInt(item.station_id) === parseInt(object.properties.station_id)
      );
      const oldData = original.filter(
        (original) =>
          parseInt(original.station_id) === parseInt(object.properties.station_id)
      );
      console.log(newData);
      console.log(oldData);

      if (
        Math.sign(oldData[0].num_bikes_available - newData[0].num_bikes_available) === 1
      ) {
        return [0, 128, 0];
      } else if (
        Math.sign(oldData[0].num_bikes_available - newData[0].num_bikes_available) === -1
      ) {
        return [255, 0, 0];
      } else if (
        Math.sign(oldData[0].num_bikes_available - newData[0].num_bikes_available) === 0
      ) {
        return [0, 0, 255];
      } else {
        return [0, 0, 255];
      }
    }
  };

  const getData = async () => {
    const response = await fetch(
      'https://gbfs.baywheels.com/gbfs/en/station_status.json'
    );
    return response.json();
  };

  useEffect(() => {
    // const getData = async () => {
    //   const response = await fetch(
    //     'https://gbfs.baywheels.com/gbfs/en/station_status.json'
    //   );
    //   return response.json();
    // };

    getData()
      .then((res) => {
        console.log(res.data.stations);

        setOriginal(res.data.stations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log(items);
      // console.log(original)

      // const query = `select * from sf_bike_stations`;

      getData()
        .then((res) => {
          console.log(res.data.stations);

          setItems(res.data.stations);

          //  setlistItems(array_with_city_list)
        })
        .catch((error) => {
          console.log(error);
        });

      console.log('interval');
    }, 5000); // set interval

    return () => clearInterval(interval);
  }, [items]);

  // useEffect(() => {
  //   console.log(items)

  // }, );

  if (sfBikeStationsLayer && source) {
    return new CartoSQLLayer({
      id: SF_BIKE_STATIONS_LAYER_ID,
      data: source.data,
      credentials: source.credentials,
      getFillColor: (object) => getFillColorBasedOnDiff(object),
      // pointRadiusMinPixels: 2,
      pickable: true,
      getRadius: (object) => getStationActivityValue(object),
      //getRadius:1000,

      onHover: (info) => {
        if (info?.object) {
          info.object = {
            html: htmlForFeature({ feature: info.object }),
            style: {},
          };
        }
      },
      ...cartoLayerProps,
      updateTriggers: {
        getRadius: [items],
        getFillColor: [items],
      },
    });
  }
}

export default SfBikeStationsLayer;
