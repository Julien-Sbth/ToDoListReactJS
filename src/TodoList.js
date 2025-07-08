import React, { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setTodos([
      ...todos,
      { text: input, completed: false, id: Date.now() },
    ]);
    setInput("");
  };

  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <h1>Ma Todo List</h1>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ajouter une tâche..."
        />
        <button type="submit">Ajouter</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            <span onClick={() => handleToggle(todo.id)} style={{ cursor: "pointer" }}>
              {todo.text}
            </span>
            <button onClick={() => handleDelete(todo.id)} style={{ marginLeft: 10 }}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList; 