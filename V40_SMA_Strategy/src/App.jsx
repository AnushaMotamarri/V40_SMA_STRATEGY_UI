
import './App.css'

import routes from './routes.jsx'
// function App() {

//   return (
//     <div>
//       <SmaTable/>
//     </div>
//   )
// }

// export default App

// App.jsx
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';


function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
