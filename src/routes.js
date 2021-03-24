import React from 'react';
import { Navigate } from 'react-router-dom';
import { OAuthCallback } from '@carto/react-auth';
import Main from 'components/views/Main';
import NotFound from 'components/views/NotFound';
import BerkPois from 'components/views/BerkPois.js';
import SfBikeStationsView from 'components/views/SfBikeStationsView.js';
// [hygen] Import views

const routes = [
  {
    path: '/',
    element: <Main />,
    children: [
      // { path: '/', element: <Navigate to='/<your default view>' /> },
      { path: '/pois', element: <BerkPois /> },

      { path: '/bikestations', element: <SfBikeStationsView /> },

      // [hygen] Add routes
    ],
  },
  { path: '/oauthCallback', element: <OAuthCallback /> },
  { path: '404', element: <NotFound /> },
  { path: '*', element: <Navigate to='/404' /> },
];

export default routes;
