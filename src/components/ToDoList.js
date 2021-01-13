import React from "react";
import ToDoForm from "./ToDoForm";
import ToDo from "./ToDo";

export default class ToDoList extends React.Component {
  state = {
    todos: [],
    todoToShow: "all",
    toggleAllComplete: true,
  };

  addToDo = (toDo) => {
    this.setState((state) => ({
      todos: [toDo, ...state.todos],
    }));
  };

  toggleComplete = (id) => {
    this.setState((state) => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            complete: !todo.complete,
          };
        } else {
          return todo;
        }
      }),
    }));
  };

  updateToDoToShow = (value) => this.setState({ todoToShow: value });

  deleteTodo = (id) => {
    this.setState((state) => ({
      todos: state.todos.filter((todo) => todo.id != id),
    }));
  };

  removeCompleteToDos = () => {
    this.setState((state) => ({
      todos: state.todos.filter((todo) => !todo.complete),
    }));
  };

  render() {
    let todos = [];
    if (this.state.todoToShow === "all") {
      todos = this.state.todos;
    } else if (this.state.todoToShow === "active") {
      todos = this.state.todos.filter((todo) => !todo.complete);
    } else if (this.state.todoToShow === "complete") {
      todos = this.state.todos.filter((todo) => todo.complete);
    }
    return (
      <div>
        <ToDoForm onSubmit={this.addToDo} />
        {todos.map((todo) => (
          <ToDo
            key={todo.id}
            todo={todo}
            toggleComplete={() => this.toggleComplete(todo.id)}
            deleteTodo={() => this.deleteTodo(todo.id)}
          />
        ))}
        <div>
          todos left: {this.state.todos.filter((todo) => !todo.complete).length}
        </div>
        <button onClick={() => this.updateToDoToShow("all")}>all</button>
        <button onClick={() => this.updateToDoToShow("active")}>active</button>
        <button onClick={() => this.updateToDoToShow("complete")}>
          complete
        </button>
        {this.state.todos.some((todo) => todo.complete) ? (
          <div>
            <button onClick={() => this.removeCompleteToDos()}>
              Delete Complete ToDos
            </button>
          </div>
        ) : null}
        <div>
          <button
            onClick={() => {
              this.setState((state) => ({
                todos: state.todos.map((todo) => ({
                  ...todo,
                  complete: state.toggleAllComplete,
                })),
                toggleAllComplete: !state.toggleAllComplete,
              }));
            }}
          >
            Toggle all complete: {`${this.state.toggleAllComplete}`}
          </button>
        </div>
      </div>
    );
  }
}
