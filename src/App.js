import {BrowserRouter as Router, Routes , Route } from 'react-router-dom';

import './App.scss';

import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';

import Signup from './Components/User/Signup';
import Login from './Components/User/Login';
import Dashboard from './Components/User/Dashboard';

function App() {
  return (
    <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard/:userId" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
