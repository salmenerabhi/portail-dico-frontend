import { Router } from '@angular/router';
import { ScriptServiceService } from './../../services/script-service.service';
import { AccountService } from 'src/app/services/account.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';

import * as XLSX from 'xlsx';
import { RequestFile, State } from 'src/models/RequestFile';
import { UserEntity } from 'src/models/userEntity';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RequestService } from 'src/app/services/request.service';
import { RejectComponent } from 'src/app/Dashboard/reject/reject.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
/**
 * @title Table with sorting
 */
@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.css']
})
export class ListFilesComponent implements OnInit, AfterViewInit {
  constructor(
    private script: ScriptServiceService,
    private toast: ToastrService,
    private dialog: MatDialog,
    private router: Router,
    private requestService: RequestService,
    private liveAnnouncer: LiveAnnouncer) {
    this.dataSource = new MatTableDataSource(this.files);
    this.dataSourceUS = new MatTableDataSource(this.files);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSourceUS.sort = this.sort1;
    this.dataSourceUS.paginator = this.paginator1;
  }
  displayedColumns: string[] = ['select', 'user', 'fileType', 'langue', 'name', 'echeanceRC', 'echeanceRD', 'state', 'download'];
  displayedColumns2: string[] = ['user', 'fileType', 'langue', 'name', 'echeanceRC', 'echeanceRD', 'state'];

  dataSource: MatTableDataSource<any>;
  dataSourceUS: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort1: MatSort;
  @ViewChild(MatPaginator) paginator1: MatPaginator;
  pipe = new DatePipe('en-US');
  todayWithPipe = null;
  users: UserEntity[];
  files: RequestFile[];
  requestFile: RequestFile;
  file: RequestFile = new RequestFile();

  selection = new SelectionModel<RequestFile>(true, []);
  selected: any;
  user: UserEntity;

  fileName = 'ExcelSheet.xlsx';

  ngAfterViewInit() {


    this.getAllFiles();
    this.getAllUS();
    this.getAllFilesUsers();
  }

  ngOnInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
    this.requestFile = new RequestFile();
    this.requestFile.user = new UserEntity();
    this.getAllFiles();
    this.getAllFilesUsers();
    this.getAllUS();



  }
  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
  startAll() {
    for (const file of this.selection.selected) {
      file.state = State.in_progress;
      this.requestService.update(file).subscribe(r => this.ngAfterViewInit()
      );

    }
    this.ngAfterViewInit();

  }
  rejectAll() {
    for (const file of this.selection.selected) {
      file.state = State.rejected;
      this.requestService.update(file).subscribe(r => this.ngAfterViewInit());
    }
    this.ngAfterViewInit();
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: RequestFile): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  onChange(newValue) {
    this.selected = newValue;
  }

  loadScript() {
    this.script.load('creation of sentence requests').then(data => {
    }).catch();
    this.requestService.launchScript().subscribe();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUS.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceUS.paginator) {
      this.dataSourceUS.paginator.firstPage();
    }
  }

  getAllFiles() {
    this.requestService.getAll().subscribe(data => {
      this.dataSource.data = data;
    }
    );
  }

  getAllFilesUsers() {
    this.requestService.getAlll().subscribe((r) => (this.files = r));
  }

  getAllUS() {
    this.requestService.getAllUS().subscribe(data => {
      this.dataSourceUS.data = data;
    }
    );
  }
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit() {

    const dialogConfig = new MatDialogConfig();
    for (const file of this.selection.selected) {
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      dialogConfig.data = file;
      this.dialog.open(RejectComponent, dialogConfig);
      this.selection.clear();
      this.dialog.afterAllClosed.subscribe(() => this.ngAfterViewInit());
    }
  }

  exportexcel(): void {
    /* table id is passed over here */
    const element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }

  redirectPlanning() {
    this.router.navigateByUrl('/dashboard/planning');
  }


  addEvent(row: any, event: MatDatepickerInputEvent<Date>) {
    row.echeanceRD = event.value;
    this.requestService.update(row).subscribe(res => {
      this.toast.success('a proposed date is fixed successfully', '', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      this.ngAfterViewInit();
    },
      error => this.toast.error('something wrong '));
  }
}






