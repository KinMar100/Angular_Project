import { Component, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

// for "ngModel"
import { FormsModule } from '@angular/forms';

// for "ngIf" and "ngFor"
import { CommonModule } from '@angular/common';

// for decor. "Injectable"
import {Injectable} from "@angular/core"


// service example
@Injectable({providedIn: "root"})
export class DataService
{
  getGuests(list: string[]=[]){
    return list; // example of data - list
  }
  
}

@Component({
  selector: 'app-root',

  standalone: true,

  imports: [FormsModule, CommonModule],

  template: `

    <h1>-----------Template----------------</h1>

    <h2>Hello from {{ name }}!</h2>
    <a target="_blank" href="https://angular.dev/overview">
      Learn more about Angular
    </a>
    <p></p>
    <button (click)="counter.set(counter() - 1)">--</button>
    <span> Counter: {{ counter() }} </span>
    <button (click)="counter.set(counter() + 1)">++</button>

    <h1>----------My project----------------</h1>

    <h2>Input your name: </h2>
    <input type="text" [(ngModel)]="name">

    <p>Hello on Angular, {{name}}!</p>

    <button (click)="import()">Import Guests: </button>

    <p *ngIf="ifSuccess" style="color: green";>
      Import status: Success
    </p>

    <p *ngIf="ifFail" style="color: red";>
      Import status: Fail
    </p>

    <ul>
      <li *ngFor="let guest of listOfGuests">
        {{guest}}
      </li>
    </ul>

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

  listOfGuests: string[] = [];
  ifFail: boolean = false;
  ifSuccess: boolean = false;

  workers = [
    {name: "Kate", result: 85, confirm: true},
    {name: "Tom", result: 40, confirm: false},
    {name: "Mark", result: 92, confirm: true},
    {name: "Sofie", result: 55, confirm: false}
  ];

  projects = [
    {name: "Online Shop", status: "Success", budget: 10000},
    {name: "Corporate Blog", status: "In Progress", budget: 2000},
    {name: "Client Portal", status: "Success", budget: 15000},
    {name: "Mobile App", status: "Fail", budget: 8000},
  ];

  confirmed: any[] = [];
  nameConfirmed: string[] = [];

  addTask() {
    if (this.newTask.trim() !== '') 
    {
      this.listOfTasks.push(this.newTask);

      this.newTask = '';
      this.error = false;
    }
    else
    {
      this.error = true;
    }
  }

  constructor(private dataService: DataService){}

  listExample = ["Anne", "Bart", "Chester", "David"];

  sum: number = 0;

  sumProfit: number = 0;

  import()
  {
    this.listOfGuests = this.dataService.getGuests(this.listExample);

    if(this.listOfGuests.length > 0)
    {
      this.ifFail = false;
      this.ifSuccess = true;
    }
    else
    {
      this.ifFail = true;
      this.ifSuccess = false;
    }
  }

  processedWorkers()
  {
    this.confirmed = this.workers.filter(worker => worker.confirm === true);

    this.nameConfirmed = this.workers.map(worker => worker.name);
  }

  calculateSumOfPoints()
  {
    this.sum = this.workers.reduce((sum, worker) =>
    {return sum + worker.result}, 0);
  }

  calculateBudgetSuccess()
  {
    this.sumProfit = this.projects
    .filter(project => project.status === "Success")
    .map(project => project.budget)
    .reduce((sum, element) => sum + element, 0);

    return this.sumProfit;
    
  }

}

bootstrapApplication(App);
