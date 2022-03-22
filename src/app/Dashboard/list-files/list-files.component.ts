import { ScriptServiceService } from './../../services/script-service.service';
import { AccountService } from 'src/app/services/account.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';

import * as XLSX from 'xlsx';
import { RequestFile } from 'src/models/RequestFile';
import { UserEntity } from 'src/models/userEntity';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/Authentification/services/token.service';
import { MatDialog } from '@angular/material/dialog';
import { RequestService } from 'src/app/services/request.service';
/**
 * @title Table with sorting
 */
@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.css']
})
export class ListFilesComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'fileType', 'langue', 'name', 'echeanceRC', 'echeanceRD', 'state'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pipe = new DatePipe('en-US');
  todayWithPipe = null;
  users: UserEntity[];
  files: RequestFile[];
  selection: any;
  selected: any;
  constructor(private accountService: AccountService,
    private script: ScriptServiceService,
    private toast: ToastrService,
    private token: TokenService,
    private dialog: MatDialog,
    private requestService: RequestService,
    private _liveAnnouncer: LiveAnnouncer) {
    this.dataSource = new MatTableDataSource(this.files);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getAllFiles();

  }

  ngOnInit(): void {
    this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
  }

  onChange(newValue) {
    this.selected = newValue;
  }

  loadScript(){
    this.script.load('creation of sentence requests').then(data=>{
      console.log('script loaded is' , data);
    }).catch(error => console.log(error)
    )
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
    this.requestService.getAll().subscribe(data => {
      this.dataSource.data = data;
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



  fileName = 'ExcelSheet.xlsx';

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }





}






