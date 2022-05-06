import { LogsService } from './../../services/logs.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Logs } from 'src/models/log';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['numero', 'description', 'filename'];
content: Logs [];

  dataSource: MatTableDataSource<any>;
  files: Logs[];
  logs: Logs;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private logsService: LogsService) { this.dataSource = new MatTableDataSource(this.content); }
  ngAfterViewInit(): void {    this.dataSource.paginator = this.paginator;

  }

  ngOnInit(): void {
    // tslint:disable-next-line: new-parens
    this.logs = new Logs;
    this.getLogContent();
  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllFiles() {
    this.logsService.getAll().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  getLogContent() {
    this.logsService.getContent().subscribe(r => this.dataSource.data = r.slice(1, r.length));
}
}
