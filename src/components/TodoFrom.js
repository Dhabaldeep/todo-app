import React, { useState,useEffect,useRef } from "react";

function TodoFrom(props) {
  const [input, setInput] = useState('');



  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  })

  const handleChange = (e) => {
    setInput(e.target.value); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
      status:false,
    });
    setInput("");
  };

  return (
    <form className="todo-form container" onSubmit={handleSubmit}>

      {props.edit ? (
      <>
      <input
        type="text"
        className="todo-input"
        placeholder = {props.edit.value}
        value={input}
        name="text"
        onChange={handleChange}
        ref={inputRef}
        autocomplete="off"
      />
      <button className="todo-button edit">Update</button>
      </>):
      (
      
      <><input
        type="text"
        className="todo-input"
        placeholder="Add a todo"
        value={input}
        name="text"
        onChange={handleChange}
        ref={inputRef}
        autocomplete="off"
      />
      <button className="todo-button"> Add todo</button>
      </>)
    }
      
    </form>
  );
}

export default TodoFrom;
