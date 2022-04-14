import { FaqAddAnswerComponent } from './../faq-add-answer/faq-add-answer.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FaqService } from 'src/app/services/faq.service';
import { FaqItem } from 'src/models/faq.item';
import { UpdateUserComponent } from '../../UserManagement/update-user/update-user.component';

@Component({
  selector: 'app-faq-answer',
  templateUrl: './faq-answer.component.html',
  styleUrls: ['./faq-answer.component.scss']
})
export class FaqAnswerComponent implements OnInit {
  ListFaqs: FaqItem[];
  faqItem:FaqItem;
  constructor(private faqService:FaqService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getFaq();
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
      dialogConfig.width = "60%";
      dialogConfig.data=row;
      this.dialog.open(FaqAddAnswerComponent,dialogConfig);
      this.dialog.afterAllClosed.subscribe(()=>this.ngAfterViewInit());
    }
}
