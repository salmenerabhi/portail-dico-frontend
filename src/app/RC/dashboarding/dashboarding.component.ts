import { UserEntity } from './../../../models/userEntity';
import { CorrectionComponent } from './../correction/correction.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RequestService } from 'src/app/services/request.service';
import { RequestFile, State } from 'src/models/RequestFile';

@Component({
  selector: 'app-dashboarding',
  templateUrl: './dashboarding.component.html',
  styleUrls: ['./dashboarding.component.css']
})
export class DashboardingComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['fileType', 'langue', 'name', 'echeanceRC', 'echeanceRD', 'state', 'nombrephrase', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  files: RequestFile[];
  requestFile: RequestFile;
  nombre: number;
  input:any
  lang: any;

  constructor(private requestService: RequestService,
              private dialog: MatDialog,
              private liveAnnouncer: LiveAnnouncer
  ) { this.dataSource = new MatTableDataSource(this.files); }

  ngOnInit(): void {
    this.requestFile = new RequestFile();
    this.getAllFiles(); 
    this.lang= localStorage.getItem('lang') || 'en' ;
   
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getAllFiles();
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
    this.requestService.getFileByUser(this.requestFile.user.id).subscribe(data => {
      this.dataSource.data = data;

    });
  }
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '60%';
    dialogConfig.maxHeight = '90vh';
    dialogConfig.data = row;
    this.dialog.open(CorrectionComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(() => this.ngAfterViewInit());
  }
  }

