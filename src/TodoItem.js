import React, { useState } from "react";
import PropTypes from "prop-types";

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState(todo.priority || "normale");

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setEditPriority(e.target.value);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editText.trim() === "") return;
    onEdit(todo.id, editText, editPriority);
    setIsEditing(false);
  };

  return (
    <li className={todo.completed ? "completed" : ""} aria-label={todo.text}>
      {isEditing ? (
        <form onSubmit={handleEditSubmit} style={{ display: "inline" }}>
          <label htmlFor={`edit-input-${todo.id}`} style={{ display: "none" }}>Modifier la tâche</label>
          <input
            id={`edit-input-${todo.id}`}
            type="text"
            value={editText}
            onChange={handleEditChange}
            autoFocus
            aria-label="Modifier la tâche"
          />
          <label htmlFor={`edit-priority-${todo.id}`} style={{ display: "none" }}>Priorité</label>
          <select id={`edit-priority-${todo.id}`} value={editPriority} onChange={handlePriorityChange} aria-label="Priorité">
            <option value="basse">Basse</option>
            <option value="normale">Normale</option>
            <option value="haute">Haute</option>
          </select>
          <button type="submit">Valider</button>
        </form>
      ) : (
        <>
          <span
            onClick={() => onToggle(todo.id)}
            style={{ cursor: "pointer" }}
            tabIndex={0}
            role="checkbox"
            aria-checked={todo.completed}
            onKeyDown={e => { if (e.key === "Enter" || e.key === " ") onToggle(todo.id); }}
          >
            {todo.text} <span style={{ fontSize: "0.8em", color: "#888" }}>({todo.priority || "normale"})</span>
          </span>
          <button onClick={handleEdit} style={{ marginLeft: 10 }} aria-label="Éditer la tâche">
            Éditer
          </button>
          <button onClick={() => onDelete(todo.id)} style={{ marginLeft: 10 }} aria-label="Supprimer la tâche">
            Supprimer
          </button>
        </>
      )}
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    priority: PropTypes.string,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default TodoItem; 