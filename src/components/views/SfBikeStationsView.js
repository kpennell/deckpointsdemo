import { useEffect } from 'react';
import sfBikeStationsSource from 'data/sources/sfBikeStationsSource';
import { SF_BIKE_STATIONS_LAYER_ID } from 'components/layers/SfBikeStationsLayer';
import { useDispatch } from 'react-redux';
import { addLayer, removeLayer, addSource, removeSource } from '@carto/react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function SfBikeStationsView() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(addSource(sfBikeStationsSource));

    dispatch(
      addLayer({
        id: SF_BIKE_STATIONS_LAYER_ID,
        source: sfBikeStationsSource.id,
      })
    );

    return () => {
      dispatch(removeLayer(SF_BIKE_STATIONS_LAYER_ID));
      dispatch(removeSource(sfBikeStationsSource.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.root}>
      <Grid item>Hello World</Grid>
    </Grid>
  );
}
