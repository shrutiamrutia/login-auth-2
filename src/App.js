import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from "./Components/login/login"
import Dashboard from "./Components/Dashboard/index"

const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App
