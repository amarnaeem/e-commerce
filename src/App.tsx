import { useState, useContext } from 'react';
import './App.css';
import { AppContext } from '../src/AppContext/Context';
import Router from './Routes';
import { Spin } from "antd";

function App() {
  const { isLoading } = useContext(AppContext);

  return (
    <>
      <div>
        {isLoading && (
          <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-70 flex justify-center items-center z-50">
            <Spin tip="Loading..." size="large" />
          </div>
        )}
        <Router/>
      </div>
    </>
  );
}

export default App;
