
import Home from './view/home';
import Layout from './view/layout';
import SmaTable from './view/sma_table';

const routes = [
  {
    path: '/',
    element: <Layout />, 
    children: [
      { path: '', element: <Home /> },
      { path: 'v40sma', element: <SmaTable /> },
    ],
  }
];

export default routes;
