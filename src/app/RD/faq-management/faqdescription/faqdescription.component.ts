import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FaqService } from 'src/app/services/faq.service';
import { FaqItem } from 'src/models/faq.item';

@Component({
  selector: 'app-faqdescription',
  templateUrl: './faqdescription.component.html',
  styleUrls: ['./faqdescription.component.css']
})
export class FaqdescriptionComponent implements OnInit {
  ListFaqs: FaqItem[];
  faqItem:FaqItem;
  description: string;
  constructor(private faqService:FaqService,@Inject(MAT_DIALOG_DATA) public faq: FaqItem,
    ) { }

  ngOnInit(): void {
    this.getdescription();
  }
  ngAfterViewInit() {
    this.getdescription();

  }
  getdescription(){
    this.description=this.faq.title;
    }

}
