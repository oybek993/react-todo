import React, { Component } from "react";
import "./App.css";
import Todos from "./components/Todos";
import Header from "./components/layout/Header";
import AddTodo from "./components/AddTodo";
import About from "./components/pages/About";
//import { v4 as uuid } from "uuid";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

class App extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((res) => this.setState({ todos: res.data }));
  }

  // Toggle complete
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };
  // Delete item
  delete = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) =>
        this.setState({
          todos: [...this.state.todos.filter((todo) => todo.id !== id)],
        })
      );
  };
  // Add todo
  addTodo = (title) => {
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title,
        completed: false,
      })
      .then((res) => this.setState({ todos: [...this.state.todos, res.data] }));
  };
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              exact
              path="/"
              render={(props) => (
                <React.Fragment>
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delete={this.delete}
                  />
                  <AddTodo addTodo={this.addTodo} />
                </React.Fragment>
              )}
            />
            <Route exact path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
