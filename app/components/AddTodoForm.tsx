'use client';

import { useRef, useTransition } from 'react';
import { addTodo } from '@/app/actions';

export default function AddTodoForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  function handleAction(formData: FormData) {
    startTransition(async () => {
      await addTodo(formData);
      ref.current?.reset();
    });
  }

  return (
    <form ref={ref} action={handleAction} className="add-form">
      <input
        type="text"
        name="title"
        placeholder="Nouvelle tâche..."
        required
        disabled={isPending}
        className="add-input"
      />
      <button type="submit" disabled={isPending} className="add-btn">
        {isPending ? 'Ajout…' : 'Ajouter'}
      </button>
    </form>
  );
}
