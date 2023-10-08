import React, { useState } from 'react';
import './main.css'

const TodoForm = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleADD = (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form className='add__todo' onSubmit={handleADD}>
      <input
        className='input__todo'
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add details"
      />
      <button className='button__add' type="submit">ADD</button>
    </form>
  );
};

export default TodoForm;
