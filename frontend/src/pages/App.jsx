// Main App component - handles routing
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AddAsset from './pages/AddAsset';
import AddBeneficiary from './pages/AddBeneficiary';

function App() {
  // Check if user is logged in
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes - require login */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/add-asset" 
          element={
            <ProtectedRoute>
              <AddAsset />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/add-beneficiary" 
          element={
            <ProtectedRoute>
              <AddBeneficiary />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;