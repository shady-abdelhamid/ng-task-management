import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MaterialModule } from '../material.module';
import { TaskListComponent } from './task-list/task-list.component';
import { TasksService } from './tasks.service';


@NgModule({
  declarations: [TasksComponent, TaskListComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MaterialModule
  ],
  providers: [
    TasksService
  ]
})
export class TasksModule { }
