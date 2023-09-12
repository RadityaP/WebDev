

import { React, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import TodoItem from "../components/TodoItem";
import {Task} from "../model/model"

 function Todo() {
  const [newtodo, setnewtodo] = useState("");
  const handleinput = (e) => {
    setnewtodo(e.target.value);
  };
  const HandleSubmit =  (e) => {
     AddItem(newtodo);
  };

  return (
    <div className={styles.maincont}>
      <h1>Todo App</h1>
      <div className={styles.newtodo}>
        <h3>Add new todo</h3>
        <div className={`${styles.semi} text-black`}>
          <input
            type="text"
            value={newtodo}
            onChange={(e) => handleinput(e)}
          ></input>
          <button onClick={() => HandleSubmit()}>
            Add Todo
          </button>
        </div>
      </div>
      <div>
        <TodoItem />
      </div>
    </div>
  );
}

 function AddItem(item){

  const newTask =  new Task({
    title : item
  })

newTask.save();

  console.log(item);
}


export default Todo;
