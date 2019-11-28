import React from 'react';
import './App.css';
import TodoList from './components/TodoList'
import Footer from './components/Footer'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import logo from './assets/images/dontmindit-logo.svg';

function App() {
  return (
    <>
      <header className="has-background-white has-text-centered">
        <img className="has-text-centered" src={logo} alt="Dontmindit Logo" width="512px"/>
      </header>
      <div className="container">
          
          <DndProvider backend={HTML5Backend}>
            <TodoList/>
          </DndProvider>
      </div>
      <Footer/>
    </>
  );
}

export default App;
