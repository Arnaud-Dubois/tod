import React from 'react';
import './App.css';
import Day from './components/Day'
import TodoList from './components/TodoList'
import Footer from './components/Footer'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

function App() {
  return (
    <>
      <div className="container">
        <h1 className="title is-1 has-text-centered">Yet Another ToDo List</h1>
        <Day/>
        <DndProvider backend={HTML5Backend}>
          <TodoList/>
        </DndProvider>
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
