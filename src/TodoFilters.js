import React from "react";
import PropTypes from "prop-types";

function TodoFilters({ filter, setFilter }) {
  return (
    <div style={{ margin: "10px 0" }}>
      <button
        onClick={() => setFilter("all")}
        style={{ fontWeight: filter === "all" ? "bold" : "normal" }}
      >
        Toutes
      </button>
      <button
        onClick={() => setFilter("active")}
        style={{ fontWeight: filter === "active" ? "bold" : "normal", marginLeft: 5 }}
      >
        Actives
      </button>
      <button
        onClick={() => setFilter("completed")}
        style={{ fontWeight: filter === "completed" ? "bold" : "normal", marginLeft: 5 }}
      >
        Complétées
      </button>
    </div>
  );
}

TodoFilters.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default TodoFilters; 