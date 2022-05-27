import { FaqAddAnswerComponent } from './../faq-add-answer/faq-add-answer.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FaqService } from 'src/app/services/faq.service';
import { FaqItem } from 'src/models/faq.item';
import { UpdateUserComponent } from '../../UserManagement/update-user/update-user.component';
import { FaqdescriptionComponent } from '../faqdescription/faqdescription.component';

@Component({
  selector: 'app-faq-answer',
  templateUrl: './faq-answer.component.html',
  styleUrls: ['./faq-answer.component.scss']
})
export class FaqAnswerComponent implements OnInit {
  ListFaqs: FaqItem[];
  faqItem:FaqItem;
  lang: any;
  constructor(private faqService:FaqService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getFaq();
    this.lang= localStorage.getItem('lang') || 'en' ;

  }
  ngAfterViewInit() {
    this.getFaq();

  }
  getFaq() {
    this.faqService.getListFaqs().subscribe((r)=>(this.ListFaqs=r));

    }
    onEdit(row){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.height= "60%";
      dialogConfig.width = "40%";
      dialogConfig.position= {
        top: '200px',
        right: '100px'
      }
      dialogConfig.data=row;
      this.dialog.open(FaqAddAnswerComponent,dialogConfig);
      this.dialog.afterAllClosed.subscribe(()=>this.ngAfterViewInit());
    }

    openDescription(row){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.height= "60%";
      dialogConfig.width = "40%";
      dialogConfig.position= {
        top: '200px',
        right: '100px'
      }
      dialogConfig.data=row;
      this.dialog.open(FaqdescriptionComponent,dialogConfig);
      this.dialog.afterAllClosed.subscribe(()=>this.ngAfterViewInit());
    }
}
