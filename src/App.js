import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Home } from './pages/home';
import { Repositories } from './pages/repositories';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { RepositoryDetails } from "./pages/repositories/details/index";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/users/:username/repositories' element={<Repositories />} />
          <Route path='/repository/:username/:repo_name' element={<RepositoryDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
