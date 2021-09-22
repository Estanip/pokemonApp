import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routers/AppRouter';
import Navigation from './components/Navigation/Navigation';
import Landing from './pages/Landing/Landing';

export default function App() {

  return (
    <div className="App">
        <Router>
          <AppRouter />
        </Router>
    </div>
  );
};