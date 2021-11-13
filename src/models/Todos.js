import { types } from "mobx-state-tree";

const Todo = types.model({
  id: types.maybe(types.integer),
  text: types.string
});

const TodoStore = types
  .model({
    todos: types.array(Todo),
    state: types.string
  })
  .actions((self) => ({
    // actions
    addTodo(text) {
      fetch("https://todo-backend-rest.herokuapp.com/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      });
      self.todos.push({
        text
      });
    },
    fetchTodos() {
      self.todos = [];
      self.state = "pending";
      fetch("https://todo-backend-rest.herokuapp.com/todos")
        .then((r) => r.json())
        // MST doesn't allow changing state outside actions
        // (except when the tree is unprotected).
        // This means that each step in an asynchronous flow that needs to actually change the model
        // needs to become a separate action.
        .then(self.fetchTodosSuccess)
        .catch((error) => self.fetchTodosError(error));
    },
    deleteTodos(){
      self.todos = []
      self.state = ''
      fetch("https://todo-backend-rest.herokuapp.com/todos")
    },
    fetchTodosSuccess(todos) {
      self.todos = todos;
      self.state = "done";
    },
    fetchTodosError(error) {
      console.error("Failed to fetch todos", error);
      self.state = "error";
    }
  }));

export default TodoStore;
