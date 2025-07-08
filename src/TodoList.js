import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import TodoFilters from "./TodoFilters";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [theme, setTheme] = useState("light");
  const [feedback, setFeedback] = useState("");
  const [lastAddedId, setLastAddedId] = useState(null);

  useEffect(() => {
    document.body.className = theme === "dark" ? "dark" : "";
  }, [theme]);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleAddTodo = (text, priority) => {
    if (text.trim() === "") {
      setFeedback("Le champ ne peut pas être vide.");
      return;
    }
    const newTodo = { text, completed: false, id: Date.now(), priority };
    setTodos([
      ...todos,
      newTodo,
    ]);
    setLastAddedId(newTodo.id);
    setFeedback("Tâche ajoutée !");
  };

  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEdit = (id, newText, newPriority) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText, priority: newPriority } : todo
      )
    );
    setFeedback("Tâche modifiée !");
  };

  const handleDelete = (id) => {
    if (window.confirm("Supprimer cette tâche ?")) {
      setTodos(todos.filter((todo) => todo.id !== id));
      setFeedback("Tâche supprimée !");
    }
  };

  const handleDeleteCompleted = () => {
    if (window.confirm("Supprimer toutes les tâches complétées ?")) {
      setTodos(todos.filter((todo) => !todo.completed));
      setFeedback("Tâches complétées supprimées !");
    }
  };

  const filteredTodos =
    filter === "all"
      ? todos
      : filter === "active"
      ? todos.filter((todo) => !todo.completed)
      : todos.filter((todo) => todo.completed);

  const remaining = todos.filter((todo) => !todo.completed).length;

  // Tri par priorité (haute > normale > basse)
  const priorityOrder = { haute: 0, normale: 1, basse: 2 };
  const sortedTodos = [...filteredTodos].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (index) => {
    if (draggedIndex === null || draggedIndex === index) return;
    const updatedTodos = [...todos];
    const [removed] = updatedTodos.splice(draggedIndex, 1);
    updatedTodos.splice(index, 0, removed);
    setDraggedIndex(index);
    setTodos(updatedTodos);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  return (
    <div className="todo-container">
      <button className="theme-toggle" onClick={toggleTheme} title="Changer de thème">
        {theme === "light" ? "🌙" : "☀️"}
      </button>
      <h1>Ma Todo List</h1>
      {feedback && <div className="feedback">{feedback}</div>}
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoFilters filter={filter} setFilter={setFilter} />
      <div style={{ margin: "10px 0" }}>
        Tâches restantes : {remaining}
      </div>
      <button onClick={handleDeleteCompleted} style={{ marginBottom: 10 }}>
        Supprimer toutes les tâches complétées
      </button>
      <ul>
        {sortedTodos.map((todo, idx) => (
          <div
            key={todo.id}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragOver={(e) => { e.preventDefault(); handleDragOver(idx); }}
            onDragEnd={handleDragEnd}
            className={todo.id === lastAddedId ? "fade-in" : ""}
          >
            <TodoItem
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default TodoList; 