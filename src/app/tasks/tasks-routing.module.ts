import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksComponent } from './tasks.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [
  { 
    path: '', 
    component: TasksComponent ,
    children : [{path: '', component: TaskListComponent}]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
