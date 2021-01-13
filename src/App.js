import ToDoList from "./components/ToDoList";
import "./App.css";
import React from "react";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ToDoList />
      </div>
    );
  }
}

export default App;
