import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";

export default observer(function TodoList({ store }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    store.fetchTodos();
  }, []);

  const addTodo = () => {
    store.addTodo(input);
    setInput("");
  };

  if (store.state === "pending") return <p>Pending...</p>;
  if (store.state === "error") return <p>Error</p>;

  return (
    <div>
      <h1>TODO list</h1>

      <input
        type="text"
        onChange={(e) => {
          setInput(e.target.value);
        }}
        value={input}
        placeholder="add todos"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {store.todos.map((todo, index) => {
          return <li key={index}>{todo.text}</li>;
        })}
      </ul>
    </div>
  );
});
