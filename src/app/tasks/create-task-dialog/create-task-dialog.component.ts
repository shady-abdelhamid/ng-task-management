import { Component, Inject } from '@angular/core';
import { Task } from '../task.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'tm-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss']
})
export class CreateTaskDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

    onOkClick(): void {
      // TODO:  add to tasks service
      this.dialogRef.close();
    }

}
