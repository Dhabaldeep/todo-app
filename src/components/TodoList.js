import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import TodoFrom from "./TodoFrom";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
let unsubcribe = () => {};

function TodoList({ user }) {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (user) {
      const docRef = db.collection("todos").doc(user.uid);
      unsubcribe = docRef.onSnapshot((docSnap) => {
        if (docSnap.exists) {
          // console.log(docRef);
          // console.log(docSnap.data().todos);
          setTodos(docSnap.data().todos);
        } else {
          console.log("No Docs...");
        }
      });
    } else {
      navigate("/login");
    }

    return () => {
      unsubcribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    // setTodos(newTodos);
    db.collection("todos").doc(user.uid).set({
      todos: newTodos,
    });
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    const docRef = db.collection("todos").doc(user.uid);
    docRef.get().then((docSnap) => {
      const result = docSnap
        .data()
        .todos.map((item) => (item.id === todoId ? newValue : item));
      docRef.update({
        todos: result,
      });
    });
  };
  const removeTodo = (id) => {
    const docRef = db.collection("todos").doc(user.uid);
    docRef.get().then((docSnap) => {
      const result = docSnap.data().todos.filter((todo) => todo.id !== id);
      docRef.update({
        todos: result,
      });
    });
  };

  const completeTodo = (id, text, status) => {
    let newStatus = false;
    if (status) newStatus = false;
    else newStatus = true;
    const newValue = {
      id: id,
      text: text,
      status: newStatus,
    };
    console.log(newValue);
    const docRef = db.collection("todos").doc(user.uid);
    docRef.get().then((docSnap) => {
      const result = docSnap
        .data()
        .todos.map((item) => (item.id === id ? newValue : item));
      docRef.update({
        todos: result,
      });
    });
  };
  return (
    <div>
      {user ? (
        <>
          <TodoFrom onSubmit={addTodo} />
          <div className="contain">
            <Todo
              todos={todos}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
              updateTodo={updateTodo}
            />
          </div>
        </>
      ) : (
        <>
          <form className="todo-form container">
            <input
              type="text"
              className="todo-input"
              placeholder="Add Todo..."
              // disabled
              name="text"
              autocomplete="off"
            />
            <button className="todo-button" disabled>
              Add Todo
            </button>
          </form>
          <h4 className="">Please Login to add Todo</h4>
        </>
      )}
    </div>
  );
}

export default TodoList;
