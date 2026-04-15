import { Component, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

// for 'ngModel'
import { FormsModule } from '@angular/forms';

// for "ngIf" and "ngFor"
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',

  standalone: true,

  imports: [FormsModule, CommonModule],

  template: `

    <h1>-----------Template--------------------</h1>

    <h2>Hello from {{ name }}!</h2>
    <a target="_blank" href="https://angular.dev/overview">
      Learn more about Angular
    </a>
    <button (click)="counter.set(counter() - 1)">--</button>
    <span> Counter: {{ counter() }} </span>
    <button (click)="counter.set(counter() + 1)">++</button>

    <h1>----------My project----------------</h1>

    <h2>Input your name: </h2>
    <input type="text" [(ngModel)]="name">

    <p>Hello on Angular, {{name}}!</p>

    <h2> TO DO LIST: </h2>

    <input type="text" [(ngModel)]="newTask" placeholder="What's next?">

    <button (click)="addTask()">Add Task</button>

    <p *ngIf="error" style="color: red; font-weight: bold;"> Field is empty </p>

    <ul>
    <li *ngFor="let task of listOfTasks">
      {{task}}
    </li>
    </ul>

  `,
})
export class App {
  name: string = 'Angular';
  counter = signal(0);

  newTask: string = '';
  listOfTasks: string[] = ['Task 1', 'Task 2'];
  error: boolean = false;

  addTask() {
    if (this.newTask.trim() !== '') {
      this.listOfTasks.push(this.newTask);

      this.newTask = '';
      this.error = false;
    } else {
      this.error = true;
    }
  }
}

bootstrapApplication(App);
