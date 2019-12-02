import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Task, TaskStatus } from './task.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasksUrl = 'localhost:3000/tasks';  

  tasks = [
    {id: 1, title: 'Study English', description:'Practice writing essays', status: TaskStatus.OPEN},
    {id: 2, title: 'Study English', description:'Practice Reading articles', status: TaskStatus.OPEN},
    {id: 3, title: 'Study English', description:'Practice Listening to news brief', status: TaskStatus.OPEN},
    {id: 4, title: 'Study English', description:'Practice speaking by recording', status: TaskStatus.OPEN},
  ];
  constructor(private http: HttpClient) { }

  getTasks (): Observable<Task[]> {
    return of(this.tasks);
  }
}
