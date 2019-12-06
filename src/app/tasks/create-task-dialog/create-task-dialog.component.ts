import { Component, Inject } from '@angular/core';
import { Task } from '../task.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../tasks.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'tm-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss']
})
export class CreateTaskDialogComponent {
  
  taskForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });

  constructor(
    private tasksService: TasksService,
    public dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

    onSubmit(): void {
      const { title, description } = this.taskForm.controls;
      this.tasksService.add(title.value, description.value)
        .subscribe(task => this.dialogRef.close(task));
    }

}
