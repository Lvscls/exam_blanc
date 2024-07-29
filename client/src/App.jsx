import HomePage from './components/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import AdminDashboard from './components/Dashboard';
import AddVehicle from './components/AddVehicle';
import UpdateVehicle from './components/UpdateVehicle';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/add-vehicle" element={<AddVehicle />} />
          <Route path="/update-vehicle/:carId" element={<UpdateVehicle />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;