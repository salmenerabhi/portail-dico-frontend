import { CorrectionComponent } from './../correction/correction.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RequestService } from 'src/app/services/request.service';
import { RequestFile } from 'src/models/RequestFile';
import { RejectComponent } from '../../Dashboard/reject/reject.component';

@Component({
  selector: 'app-dashboarding',
  templateUrl: './dashboarding.component.html',
  styleUrls: ['./dashboarding.component.css']
})
export class DashboardingComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id','fileType','langue', 'name', 'echeanceRC', 'echeanceRD', 'state', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  files: RequestFile[];
  requestFile: RequestFile

  constructor( private requestService: RequestService,
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
    ) { this.dataSource = new MatTableDataSource(this.files);}

  ngOnInit(): void {
    this.requestFile = new RequestFile();
    this.getAllFiles();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getAllFiles();
  }

  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
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
    this.requestService.getAlll().subscribe(data => {
      this.dataSource.data = data;
      this.files=data;
    }
    )
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
    dialogConfig.width = "60%";
    dialogConfig.data = row;
    this.dialog.open(CorrectionComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(() => this.ngAfterViewInit());
  }

}
