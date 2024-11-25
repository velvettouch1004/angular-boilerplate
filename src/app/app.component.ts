import { Component } from '@angular/core';
import { TodoComponent } from './todo/todo.component';
import { NgClass, NgFor } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { Todo, TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoComponent, NgFor, NgClass, SearchComponent],
  providers: [TodoService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-boilerplate';
  todos = [
    { value: 'first', id: 'qwer234', done: true },
    { value: 'second', id: 'jlk235', done: false },
  ];
  filteredTodos: any[] = [];

  constructor(private todoService: TodoService) {
    this.todoService.getTodos().subscribe((data: Todo[]) => {
      this.filteredTodos = data;
    });
  }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe((data: Todo[]) => {
      this.todos = data;
    });
  }

  filterTodos = (searchTerm: string) => {
    this.filteredTodos = this.todos.filter((todo) =>
      todo.value.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
}
