import React, {useState} from 'react'; 
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './components/Home';
import CaseStudy from './components/CaseStudy';

function App() {
  //STATE HOLDING THE RESULT
  const [result, setResult] = useState({});

  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home setResult={setResult}/>}/>
            <Route path='/study' element={<CaseStudy result={result}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;