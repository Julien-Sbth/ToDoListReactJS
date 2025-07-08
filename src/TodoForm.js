import React, { useState } from "react";
import PropTypes from "prop-types";

function TodoForm({ onAddTodo }) {
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("normale");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    onAddTodo(input, priority);
    setInput("");
    setPriority("normale");
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Ajouter une tâche">
      <label htmlFor="todo-input" style={{ display: "none" }}>Ajouter une tâche</label>
      <input
        id="todo-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ajouter une tâche..."
        autoComplete="off"
      />
      <label htmlFor="priority-select" style={{ display: "none" }}>Priorité</label>
      <select id="priority-select" value={priority} onChange={e => setPriority(e.target.value)}>
        <option value="basse">Basse</option>
        <option value="normale">Normale</option>
        <option value="haute">Haute</option>
      </select>
      <button type="submit">Ajouter</button>
    </form>
  );
}

TodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default TodoForm; 