import {LiveAnnouncer} from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {formatDate} from '@angular/common';
import { DatePipe } from '@angular/common';

import * as XLSX from 'xlsx'; 


const pipe = new DatePipe('en-US');

export interface PeriodicElement {
  
  id: number;
  type: string;
  language: string;
  request_name:string;
  due_date:string;
  proposed_date:string;
  state:string;
  action:string;

  
}


const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, type: 'request', language: 'EN', request_name: 'HEZ_08',due_date:pipe.transform(Date.now(), 'dd/MM/yyyy'),proposed_date:pipe.transform(Date.now(), 'dd/MM/yyyy'),state:'in progress', action:'correct'},
  {id: 2, type: 'approximation', language: 'FR', request_name: 'HeTF_01',due_date:pipe.transform(Date.now(), 'dd/MM/yyyy'),proposed_date:pipe.transform(Date.now(), 'dd/MM/yyyy'),state:'in progress', action:'correct'},
  {id: 3, type: 'request', language: 'EN', request_name: 'LiVS_71',due_date:pipe.transform(Date.now(), 'dd/MM/yyyy'),proposed_date:pipe.transform(Date.now(), 'dd/MM/yyyy'),state:'in progress', action:''},
  {id: 4, type: 'request', language: 'FR', request_name: 'BeG_60',due_date:pipe.transform(Date.now(), 'dd/MM/yyyy'),proposed_date:pipe.transform(Date.now(), 'dd/MM/yyyy'),state:'in progress', action:'correct'},
  {id: 5, type: 'request', language: 'FR', request_name: 'BAd_200',due_date:pipe.transform(Date.now(), 'dd/MM/yyyy'),proposed_date:pipe.transform(Date.now(), 'dd/MM/yyyy'),state:'in progress', action:''},
  {id: 6, type: 'approximation', language: 'DE', request_name: 'CDSFE',due_date:pipe.transform(Date.now(), 'dd/MM/yyyy'),proposed_date:pipe.transform(Date.now(), 'dd/MM/yyyy'),state:'in progress', action:''},
  {id: 7, type: 'approximation', language: 'EN', request_name: 'N_08_AS',due_date:pipe.transform(Date.now(), 'dd/MM/yyyy'),proposed_date:pipe.transform(Date.now(), 'dd/MM/yyyy'),state:'in progress', action:'correct'},
  {id: 8, type: 'request', language: 'DE', request_name: 'ODDVF',due_date:pipe.transform(Date.now(), 'dd/MM/yyyy'),proposed_date:pipe.transform(Date.now(), 'dd/MM/yyyy'),state:'in progress', action:''},
  {id: 9, type: 'approximation', language: 'EN', request_name: 'FZAE_78',due_date:pipe.transform(Date.now(), 'dd/MM/yyyy'),proposed_date:pipe.transform(Date.now(), 'dd/MM/yyyy'),state:'in progress', action:'correct'},
  {id: 10, type: 'request', language: 'DE', request_name: 'NeAAS_88',due_date:pipe.transform(Date.now(), 'dd/MM/yyyy'),proposed_date:pipe.transform(Date.now(), 'dd/MM/yyyy'),state:'in progress', action:''},
];

/**
 * @title Table with sorting
 */
 @Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.css']
})
export class ListFilesComponent implements AfterViewInit {
  displayedColumns: string[] = ['select','id', 'type', 'language', 'request_name','due_date','proposed_date','state','action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  pipe = new DatePipe('en-US');
  todayWithPipe = null;
  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

ngOnInit(): void {
    this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
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

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }


  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  fileName= 'ExcelSheet.xlsx';  

exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
		 
      }



    }





