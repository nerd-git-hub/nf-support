import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SupportPage from './components/SupportPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SupportPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>

        <footer className="comic-footer">
          <Link to="/privacy-policy" className="footer-link">PRIVATE POLICY</Link>
        </footer>
      </div>
    </Router>
  );
}

export default App;
