import React, { Component } from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";
class Todos extends Component {
  render() {
    return this.props.todos.map((todo) => {
      return <TodoItem key={todo.id} todo={todo} markComplete={this.props.markComplete} delete={this.props.delete} />;
    });
  }
}
//PropTypes
Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  markComplete: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
};
export default Todos;
