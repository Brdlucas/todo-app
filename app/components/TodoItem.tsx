'use client';

import { useTransition } from 'react';
import { toggleTodo, deleteTodo } from '@/app/actions';
import type { Todo } from '@/app/lib/todos';

export default function TodoItem({ todo }: { todo: Todo }) {
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(() => toggleTodo(todo.id));
  }

  function handleDelete() {
    startTransition(() => deleteTodo(todo.id));
  }

  return (
    <li className={`todo-item${todo.completed ? ' completed' : ''}`} style={{ opacity: isPending ? 0.5 : 1 }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        disabled={isPending}
        className="todo-checkbox"
        aria-label={`Marquer "${todo.title}" comme ${todo.completed ? 'non terminée' : 'terminée'}`}
      />
      <span className="todo-title">{todo.title}</span>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="delete-btn"
        aria-label={`Supprimer "${todo.title}"`}
      >
        Supprimer
      </button>
    </li>
  );
}
