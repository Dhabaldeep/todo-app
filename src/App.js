import "./App.css";
import Login from "./components/Login";
import TodoList from "./components/TodoList";
import Signup from "./components/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import Navbar from "./components/Navbar";
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setTimeout(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    }, 2000);

    return () => {
      // unSubscribe();
    };
  }, []);

  return (
    <div className="todo-app container">
      <BrowserRouter>
        <Navbar user={user} />
        <Routes>
          <Route exact path="/" element={<TodoList user={user} />}></Route>
          <Route path="/login" element={<Login user={user} />}></Route>
          <Route path="/signup" element={<Signup user={user} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
