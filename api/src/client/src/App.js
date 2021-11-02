import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routers/AppRouter';
import Navbar from './components/Navbar/Navbar';
import {ToastContainer} from 'react-toastify';

export default function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <ToastContainer />
        <AppRouter />
      </Router>
    </div>
  );
};