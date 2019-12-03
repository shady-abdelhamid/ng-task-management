import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task, TaskStatus } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks = [
    {id: 1, title: 'Study English', description:'Practice writing essays', status: TaskStatus.OPEN},
    {id: 2, title: 'Study English', description:'Practice Reading articles', status: TaskStatus.OPEN},
    {id: 3, title: 'Study English', description:'Practice Listening to news brief', status: TaskStatus.OPEN},
    {id: 4, title: 'Study English', description:'Practice speaking by recording', status: TaskStatus.OPEN},
  ];

  getTasks (): Observable<Task[]> {
    return of(this.tasks);
  }
}
