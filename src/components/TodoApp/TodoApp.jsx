import React, { useState, useEffect } from 'react';
import TodoList from '../TodoList/TodoList';
import Input from '../Input/Input';
import './main.css'

const TodoApp = () => {
    const [todos, setTodos] = useState(
      JSON.parse(localStorage.getItem('todos')) || []
    );
    const [filter, setFilter] = useState('all');
  
    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);
  
    const addTodo = (text) => {
      const newTodo = { id: Date.now(), text, completed: false };
      setTodos([...todos, newTodo]);
    };
  
    const toggleTodo = (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    };
  
    const deleteTodo = (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    };
  
    const deleteAllTodos = () => {
      setTodos([]);
    };
  
    const handleFilterChange = (newFilter) => {
      setFilter(newFilter);
    };
  
    let filteredTodos = todos;
    if (filter === 'active') {
      filteredTodos = todos.filter((todo) => !todo.completed);
    } else if (filter === 'completed') {
      filteredTodos = todos.filter((todo) => todo.completed);
    }
  
    return (
      <div>
        <h1 className='heading'>#todo</h1>
        <div className='view'>
          <button className='status__button 'onClick={() => handleFilterChange('all')}>All</button>
          <button className='status__button 'onClick={() => handleFilterChange('active')}>Active</button>
          <button className='status__button 'onClick={() => handleFilterChange('completed')}>Complete</button>
        </div>
        <Input onAdd={addTodo} />
        <TodoList todos={filteredTodos} onToggle={toggleTodo} />
        {todos.length > 0 && (
          <button className='delete__button 'onClick={deleteAllTodos}>Delete All</button>
        )}
      </div>
    );
  };

export default TodoApp;
