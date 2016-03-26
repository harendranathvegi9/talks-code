import React from 'react';

import Input from './Input';

export default class TodoItem extends React.Component {
  static propTypes = {
    updateTodo: React.PropTypes.func.isRequired,
    removeTodo: React.PropTypes.func.isRequired,
    todo: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      editing: false,
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditCancel = this.handleEditCancel.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleEditCancel() {
    this.setState({editing: false});
  }

  handleUpdate(value) {
    this.setState({editing: false});
    this.props.updateTodo(this.props.todo, { text: value });
  }

  handleRemove() {
    this.props.removeTodo(this.props.todo);
  }

  handleEdit() {
    this.setState({
      editing: true,
      editText: this.props.todo.text,
    });
  }

  handleToggle() {
    this.props.updateTodo(this.props.todo, { completed: !this.props.todo.completed});
  }

  render() {
    const todo = this.props.todo;

    const content = this.state.editing ? (
      <Input
        initialValue={todo.text}
        onSave={this.handleUpdate}
        onCancel={this.handleEditCancel} />
    ) : (
      <span>
        <label onDoubleClick={this.handleEdit}>{todo.text}</label>
        <button className="destroy" onClick={this.handleRemove}>x</button>
      </span>
    );

    return (
      <li className={todo.completed ? 'completed' : ''}>
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={this.handleToggle} />
        {content}
      </li>
    )
  }
}
