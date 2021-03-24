import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CartoSQLLayer } from '@deck.gl/carto';
import { selectSourceById, updateLayer } from '@carto/react-redux';
import { useCartoLayerProps, executeSQL } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';

export const BERKELEY_SAFEGRAPH_POIS_LAYER_ID = 'berkeleySafegraphPoisLayer';

function BerkeleySafegraphPoisLayer() {
  const { berkeleySafegraphPoisLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) =>
    selectSourceById(state, berkeleySafegraphPoisLayer?.source)
  );
  const cartoLayerProps = useCartoLayerProps(source);

  const SOURCE_ID = `berkeleySafegraphPoisSource`;
  const LAYER_ID = `berkeleySafegraphPoisLayer`;

  const getData = async ({ credentials, opts, query }) => {
    // const query = `${baseQuery}`;
    // console.log(query);
    return await executeSQL(credentials, query, opts);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (source) {
        console.log('yes');
        const { credentials } = source;
        const abortController = new AbortController();
        //  const queryFromSource = source.data;

        const query = `select * from berkeley_safegraph_pois`;

        getData({ credentials, opts: { abortController }, query })
          .then((res) => {
            console.log(res);

            //  setlistItems(array_with_city_list)
          })
          .catch((error) => {
            console.log(error);
          });
      }

      console.log('This will run every second!');
    }, 5000); // set interval

    return () => clearInterval(interval);
  }, []);

  if (berkeleySafegraphPoisLayer && source) {
    return new CartoSQLLayer({
      id: BERKELEY_SAFEGRAPH_POIS_LAYER_ID,
      data: source.data,
      credentials: source.credentials,
      getFillColor: [241, 109, 122],
      pointRadiusMinPixels: 2,
      pickable: true,
      onHover: (info) => {
        if (info?.object) {
          info.object = {
            html: htmlForFeature({ feature: info.object }),
            style: {},
          };
        }
      },
      ...cartoLayerProps,
    });
  }
}

export default BerkeleySafegraphPoisLayer;
