import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'todos.json');

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
};

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

export function getTodos(): Todo[] {
  ensureDataFile();
  const content = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(content) as Todo[];
}

export function saveTodos(todos: Todo[]): void {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2), 'utf-8');
}
