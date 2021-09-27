import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routers/AppRouter';

export default function App() {

  return (
    <div className="App">
        <Router>
          <AppRouter />
        </Router>
    </div>
  );
};