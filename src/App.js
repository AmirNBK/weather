import './App.css';
import React from 'react';
import Main from './Components/MainContainer.tsx';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
