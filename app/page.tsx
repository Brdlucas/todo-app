import { getTodos } from '@/app/lib/todos';
import AddTodoForm from '@/app/components/AddTodoForm';
import TodoItem from '@/app/components/TodoItem';

export default async function Page() {
  const todos = getTodos();
  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <main className="container">
      <h1 className="title">Ma Todo List</h1>
      <p className="subtitle">
        {todos.length === 0
          ? 'Aucune tâche pour le moment.'
          : `${remaining} tâche${remaining !== 1 ? 's' : ''} restante${remaining !== 1 ? 's' : ''} sur ${todos.length}`}
      </p>

      <AddTodoForm />

      {todos.length > 0 && (
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </main>
  );
}
