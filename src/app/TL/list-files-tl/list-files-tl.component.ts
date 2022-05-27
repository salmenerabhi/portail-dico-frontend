import { LogsService } from './../../services/logs.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RequestService } from 'src/app/services/request.service';
import { RequestFile, State } from 'src/models/RequestFile';
import { UserEntity } from 'src/models/userEntity';

@Component({
  selector: 'app-list-files-tl',
  templateUrl: './list-files-tl.component.html',
  styleUrls: ['./list-files-tl.component.css']
})
export class ListFilesTLComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['fileType', 'user', 'langue', 'name', 'echeanceRC', 'echeanceRD', 'state', 'nombrephrase', 'action'];
  dataSource: MatTableDataSource<any>;
  datasource1: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('paginator') paginator1: MatPaginator;
  @ViewChild('paginatorLegal') paginator: MatPaginator;

  files: RequestFile[];
  requestFile: RequestFile;
  constructor(private requestService: RequestService,
              private liveAnnouncer: LiveAnnouncer
  ) { this.dataSource = new MatTableDataSource(this.files); 
    this.datasource1 = new MatTableDataSource(this.files);}
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator1;
    this.datasource1.paginator = this.paginator;

    this.getAllFiles();
  }


  ngOnInit(): void {
    this.requestFile = new RequestFile();
    this.getAllFiles();
    this.getAllFilesUsers();

  }

  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllFiles() {
    this.requestFile.user = new UserEntity();
    this.requestFile.user.id = localStorage.getItem('id');
    this.requestService.getFileByTl(this.requestFile.user.id).subscribe(data => {
      this.dataSource.data = data;

    });
  }

  getAllFilesUsers() {
    this.requestService.getAlll().subscribe((r) => {(this.files = r)
      this.datasource1.data = r;
    });
  }
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  verify(row) {
    row.state = State.verified;
    this.requestService.update(row).subscribe(r => this.ngAfterViewInit());
  }

}
