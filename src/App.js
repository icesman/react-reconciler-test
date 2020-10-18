import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [isVisible, setVisible] = useState(true);

  return (
    <div
      className="App"
      onClick={
        () => {
          setVisible(!isVisible)
        }
      }
    >
      <header className="App-header">
        {
          isVisible
          && (<img src={logo} className="App-logo" alt="logo" />)
        }
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
