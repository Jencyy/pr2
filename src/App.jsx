import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Create from './components/Create';

import Edit from './components/Edit';

const App = () => {
  return (
    <>
    
    
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit/>} />
      
      </Routes>
    
    </>
   

  );
};

export default App;
