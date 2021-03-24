const BERKELEY_SAFEGRAPH_POIS_SOURCE_ID = 'berkeleySafegraphPoisSource';

const source = {
  id: BERKELEY_SAFEGRAPH_POIS_SOURCE_ID,
  data: 'select * from berkeley_safegraph_pois',
  type: 'sql',
};

export default source;
