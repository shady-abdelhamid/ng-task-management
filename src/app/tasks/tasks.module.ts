import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { TasksRoutingModule } from './tasks-routing.module';

import { TasksService } from './tasks.service';
import { TasksComponent } from './tasks.component';
import { TaskListComponent } from './task-list/task-list.component';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TasksComponent, 
    TaskListComponent, CreateTaskDialogComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    TasksRoutingModule,
  ],
  providers: [
    TasksService
  ],
  entryComponents:[CreateTaskDialogComponent]
})
export class TasksModule { }
