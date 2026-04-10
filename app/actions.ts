'use server';

import { revalidatePath } from 'next/cache';
import { randomUUID } from 'crypto';
import { getTodos, saveTodos } from '@/app/lib/todos';

export async function addTodo(formData: FormData) {
  const title = formData.get('title');
  if (typeof title !== 'string' || !title.trim()) return;

  const todos = getTodos();
  todos.push({
    id: randomUUID(),
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  });
  saveTodos(todos);
  revalidatePath('/');
}

export async function toggleTodo(id: string) {
  const todos = getTodos();
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos(todos);
  }
  revalidatePath('/');
}

export async function deleteTodo(id: string) {
  const todos = getTodos();
  saveTodos(todos.filter((t) => t.id !== id));
  revalidatePath('/');
}
