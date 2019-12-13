import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Task } from '../task.model';
import { TasksService } from '../tasks.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from '../create-task-dialog/create-task-dialog.component';

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
  displayedColumns = ['title', 'description', 'status'];

  constructor(
    private tasksService: TasksService,
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
   * a function which apply filter each 
   * time user type in search field.
   * @param filterValue a search term 
   * to search table.
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isEmpty() {
    return this.dataSource.data.length<1;
  }

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
}
