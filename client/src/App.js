import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routers/AppRouter';
import Navigation from './components/Navigation';

export default function App() {

  return (
    <div className="App">
        <Router>
          <Navigation />
          <AppRouter />
        </Router>
    </div>
  );
};