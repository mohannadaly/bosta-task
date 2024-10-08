import './App.scss';

import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { lazy, Suspense } from 'react';

import Loader from './components/loader/loader';
import Layout from './components/layout/layout';
import ErrorComponent from './components/error/error';

import usePageTitle from './hooks/usePageTitle';

const HomePage = lazy(() => import('./pages/home/page'));
const ShipmentDetailsPage = lazy(() => import('./pages/shipment-details/page'));
const TrackPage = lazy(() => import('./pages/track/page'));

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    errorElement: (
      <Layout>
        <ErrorComponent />
      </Layout>
    ),
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/track',
        element: <TrackPage />,
      },
      {
        path: '/shipments/:shipmentId',
        element: <ShipmentDetailsPage />,
      },
    ],
  },
]);

function App() {
  usePageTitle('Bosta');
  return (
    <Suspense fallback={<Loader />}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
