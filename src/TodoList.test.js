import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

describe('TodoList', () => {
  it('affiche le titre', () => {
    render(<TodoList />);
    expect(screen.getByText(/Ma Todo List/i)).toBeInTheDocument();
  });

  it('ajoute une tâche', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/Ajouter une tâche/i);
    const button = screen.getByText(/Ajouter/i);
    fireEvent.change(input, { target: { value: 'Nouvelle tâche' } });
    fireEvent.click(button);
    expect(screen.getByText(/Nouvelle tâche/i)).toBeInTheDocument();
  });
}); 