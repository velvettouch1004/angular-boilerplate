import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})

export class TodoComponent {
  @Input({ required: true })
  todos: any[] = [];
  @Output()
  onsubmit: EventEmitter<string> = new EventEmitter<string>();
  value = signal('');
  submitTodo() {
    this.onsubmit.emit(this.value());
    this.value.set('');
  }
}
