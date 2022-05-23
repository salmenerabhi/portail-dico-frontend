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
 myMap = new Map([
    ["1§", "On trouve THESAU, CITACT ou CITTV,POLUXDATA au lieu de trouver DICMD."],["2§", ": On utilise plus de @P que de DICMD. "],["3§", "a pas de séparation entre le code phrase et le dictionnaire par un ‘-‘"],["4§", "Le numéro du dictionnaire est erroné."],["5§", "Le code est erroné"],["6§", "Le code n’appartient pas au dictionnaire"],["7§", "sans @ "],["8§", "sans P"],["9§", "espace après et avant DICMDxx"],["10", "T après DICMDxx sans @"],["11", "Concaténation sans @\+ ou bien @T"]
]); 
  displayedColumns: string[] = ['numero', 'description', 'filename'];
content: Logs [];
content1: Logs [];
  dataSource: MatTableDataSource<any>;
  dataSource1: MatTableDataSource<any>;
  files: Logs[];
  logs: Logs;
  @ViewChild('paginator') paginator1: MatPaginator;
  @ViewChild('paginatorLegal') paginator: MatPaginator;
  constructor(private logsService: LogsService)
   { this.dataSource = new MatTableDataSource(this.content);
     this.dataSource1 = new MatTableDataSource(this.content1); }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator1;
    this.dataSource1.paginator = this.paginator;
  }

  ngOnInit(): void {
    // tslint:disable-next-line: new-parens
    this.logs = new Logs;
    this.getLogErrorContent();
    this.getLogTTBTContent();
    console.log(this.logs.date);
     
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }

  getAllFiles() {
    this.logsService.getAll().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  getLogErrorContent() {
    this.logsService.getContentError().subscribe(r => this.dataSource.data = r.slice(1, r.length));
}

getLogTTBTContent() {
  this.logsService.getContentTTBT().subscribe(r => this.dataSource1.data = r.slice(1, r.length)
);
}
getValue(key:string){
return this.myMap.get(key);
}
}
 