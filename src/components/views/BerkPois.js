import { useEffect } from 'react';
import berkeleySafegraphPoisSource from 'data/sources/berkeleySafegraphPoisSource';
import { BERKELEY_SAFEGRAPH_POIS_LAYER_ID } from 'components/layers/BerkeleySafegraphPoisLayer';
import { useDispatch } from 'react-redux';
import { addLayer, removeLayer, addSource, removeSource } from '@carto/react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function BerkPois() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(addSource(berkeleySafegraphPoisSource));

    dispatch(
      addLayer({
        id: BERKELEY_SAFEGRAPH_POIS_LAYER_ID,
        source: berkeleySafegraphPoisSource.id,
      })
    );

    return () => {
      dispatch(removeLayer(BERKELEY_SAFEGRAPH_POIS_LAYER_ID));
      dispatch(removeSource(berkeleySafegraphPoisSource.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.root}>
      <Grid item>Hello World</Grid>
    </Grid>
  );
}
