import React, { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import TodoFrom from "./TodoFrom";
import swal from "sweetalert";

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });
  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <TodoFrom edit={edit} onSubmit={submitUpdate} />;
  }
  return todos.map((todo, index) => (
    <div className={todo.status ? "todo-row complete" : "todo-row"} key={index}>
      <div
        key={todo.id}
        onClick={() => completeTodo(todo.id, todo.text, todo.status)}
      >
        {todo.text}
      </div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() =>
            swal({
              title: "Are you sure?",
              text: "Once deleted, you will not be able to recover this todo.",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            }).then((willDelete) => {
              // if (willDelete) {
              //   swal("Your todo has been deleted!", {
              //     icon: "success",
              //   });
                removeTodo(todo.id);
              // } else {
              //   swal("Your todo is safe!", {});
              // }
            })
          }
          className="delete-icon"
        />
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className="edit-icon"
        />
      </div>
    </div>
  ));
}

export default Todo;
