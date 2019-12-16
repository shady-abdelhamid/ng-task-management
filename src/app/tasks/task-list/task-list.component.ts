import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Task, TaskStatus } from '../task.model';
import { TasksService } from '../tasks.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from '../create-task-dialog/create-task-dialog.component';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tm-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<Task>;
  
  dataSource = new MatTableDataSource<Task>();
  displayedColumns = ['title', 'description', 'status', 'delete'];

  /**
   * a radonly array of allowedstatuses
   */
  public readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];
  
  constructor(
    private tasksService: TasksService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) {}
  
    ngOnInit() {
  this.tasksService.getAll().subscribe(tasks => {
    this.dataSource.data = tasks;
  });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  /**
   * a function which apply filter each time user type in search field.
   * @param filterValue a search term to search table.
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isEmpty() {
    return this.dataSource.data.length<1;
  }

  /**
   * a function that invokes opening dialog ad refresh datasource afterward.
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      width: '270px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      
      // refresh datasource
      this.tasksService.getAll().subscribe(tasks => {
        this.dataSource.data = tasks;
      });
    });
  }

  /**
   * a function that invokes changing status for a task
   * @param id a task id which is used to identify the task that should be deleted
   * @param event a MatSelectCange event that holds the seleced value
   */
  changeStatus(id: string, event: MatSelectChange): void {
      this.tasksService.updateTaskStatus(id, event.value)
        .subscribe(task => console.log(task));  
  }

  /**
   * a function that invokes both delete mchanism and refresh table datasource
   * @param id a task id which is used to identify the task that should be deleted
   */
  delete(id: string): void {
    this.tasksService.delete(id).subscribe(task => {
      this._snackBar.open(`${task.title} has been removed`,null,{
        duration: 3000,
      });
    });
    this.tasksService.getAll().subscribe(tasks => {
        this.dataSource.data = tasks;
      });  
  }

  openSnackBar() {
    
  }
}
