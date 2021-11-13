import React from "react";
import TodoList from "./components/TodoList";
import TodoStore from "./models/Todos";

const store = TodoStore.create({
  todos: [],
  state: "",
});

export default function App() {
  const onClickHandler = () => {
    store.deleteTodos();
  };
  return (
    <div className="App">
      <button onClick={onClickHandler}>Reset</button>
      <TodoList store={store} />
    </div>
  );
}
