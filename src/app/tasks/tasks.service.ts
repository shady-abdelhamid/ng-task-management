import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';
import { TASKS } from '../api.defines';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  
  private tasks: Task[] = [
    {id: '3e41aba0-2789-4b38-844e-67edfe7d4cde', title: 'Study English', description:'Practice writing essays', status: TaskStatus.OPEN},
    {id: 'c029d609-69a4-4095-b907-76072143e176', title: 'Study English', description:'Practice Reading articles', status: TaskStatus.OPEN},
    {id: '17e3756b-58d9-4de7-859a-e333b64bee42', title: 'Study English', description:'Practice Listening to news brief', status: TaskStatus.OPEN},
    {id: '0edbe6cb-7a9c-4dc8-be22-b6fed14e2f46', title: 'Study English', description:'Practice speaking by recording', status: TaskStatus.OPEN},
  ];

  constructor() {
    
  }

  public getAll (): Observable<Task[]> {
    const url = TASKS.GET_TASKS;
    
    return of(this.tasks);
  }

  public add (title: string, description: string): Observable<Task> {
    const url = TASKS.POST_TASK;
    
    const task: Task = {
      id: uuid.v4(),
      title,
      description,
      status: TaskStatus.OPEN
    }; 
    this.tasks.push(task);
    
    return of(task);
  }

  public updateTaskStatus(id: string, status: TaskStatus) {
    const url = TASKS.PATCH_TASK_STATUS.replace(/{id}/, id);
    
    const found = this.tasks.find(task => task.id === id);
    const index = this.tasks.indexOf(found);

    if (!found) {
      return of(null);
    }
    found.status = status;
    this.tasks.splice(index,1,found);
    
    return of(found);
  }

  public delete(id: string) {
    const url = TASKS.DELETE_TASK.replace(/{id}/, id);
    
    const found = this.tasks.find(task => task.id === id);
    const index = this.tasks.indexOf(found);

    if (!found) {
      return of(null);
    }

    this.tasks.splice(this.tasks.indexOf(found),1);
    
    return of(found);
  }
}
