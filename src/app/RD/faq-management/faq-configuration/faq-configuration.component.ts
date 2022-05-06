import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/Authentification/services/token.service';
import { AccountService } from 'src/app/services/account.service';
import { FaqService } from 'src/app/services/faq.service';
import { FaqItem } from 'src/models/faq.item';
import { UserEntity } from 'src/models/userEntity';
import { UpdateUserComponent } from '../../UserManagement/update-user/update-user.component';

@Component({
  selector: 'app-faq-configuration',
  templateUrl: './faq-configuration.component.html',
  styleUrls: ['./faq-configuration.component.css']
})
export class FaqConfigurationComponent implements OnInit ,AfterViewInit{
 

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  users: UserEntity[];
  images:string[];
  base64Data: Int8Array;
  retrievedImage: string;
  ListFaqs: FaqItem[];
  ListFaq: any;
  faqItem:FaqItem;


  constructor(private faqService:FaqService,
              private token:TokenService,
              private router: Router,
              private toast:ToastrService,
              private dialog: MatDialog,
              private accountService:AccountService
              ) {     this.dataSource = new MatTableDataSource(this.ListFaqs);
              }
  ngAfterViewInit(): void {
    this.getFaq();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.faqItem=new FaqItem();
    this.faqItem.user =new UserEntity();
    this.getFaq();
  }



  getFaq() {
    this.faqService.getListFaqs().subscribe((r)=>(this.ListFaqs=r));

    }


    redirectfaqchild(){

      this.router.navigateByUrl('/dashboard/ask');

    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

  deletefaq(id:number){
    let confirm= window.confirm('do you want to delete this user')
    if(confirm) {
      this.faqService.deletefaq(id).subscribe(res => {
          this.toast.success("Question deleted ",'', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'})
          this.ngAfterViewInit();
        },
        error => this.toast.error('something wrong '))
    }}

}

