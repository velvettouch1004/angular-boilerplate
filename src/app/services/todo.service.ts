import { Injectable, SimpleChange } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Observable, of } from 'rxjs';
import axios from 'axios';

export interface Todo {
  id: string;
  value: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root',
})

export class TodoService {
  private todos: Todo[] = [];

  constructor() {
    this.todos = [
      {
        id: uuidv4(),
        value: 'Learn Angular',
        done: false,
      },
      {
        id: uuidv4(),
        value: 'Learn TypeScript',
        done: true,
      },
      {
        id: uuidv4(),
        value: 'Learn Node.js',
        done: false,
      },
    ];
  }

  ngOnChanges(changes: SimpleChange) {
    console.log('Input property changed:', changes);
  }

  getTodos(): Observable<{ value: string; id: string; done: boolean }[]> {
    return of(this.todos);
  }

  addTodo(value: string): void {
    const newTodo: Todo = {
      id: uuidv4(),
      value: value,
      done: false,
    };
    axios.post('http://localhost:5000/todos', newTodo).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.error(error);
    });
  }

  toggleTodoCompletion(id: string): void {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.done = !todo.done;
    }
  }

  deleteTodo(id: string): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    console.log(this.todos);
  }

  filterTodos = (searchTerm: string) => {
    this.todos = this.todos.filter((todo) =>
      todo.value.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
}
