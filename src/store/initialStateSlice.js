import { VOYAGER } from '@carto/react-basemaps';

export const initialState = {
  viewState: {
    latitude: 37.7926913,
    longitude: -122.2825235,
    zoom: 10,
    pitch: 0,
    bearing: 0,
    dragRotate: false,
  },
  basemap: VOYAGER,
  credentials: {
    username: 'kyle-se',
    apiKey: 'HRoT6e6ZBGGIPV_-NtWElA',
    serverUrlTemplate: 'https://{user}.carto.com',
  },
  googleApiKey: '', // only required when using a Google Basemap
};

export const oauthInitialState = {
  oauthApp: {
    clientId: 'TYPE HERE YOUR OAUTH CLIENT ID',
    scopes: [
      'user:profile', // to load avatar photo
    ],
    authorizeEndPoint: 'https://carto.com/oauth2/authorize', // only valid if keeping https://localhost:3000/oauthCallback
  },
  token: null,
  userInfo: null,
};
