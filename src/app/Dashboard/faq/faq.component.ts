import { TokenService } from './../../Authentification/services/token.service';
import { FormControl, Validators } from '@angular/forms';
import { FaqService } from './../../services/faq.service';
import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit } from '@angular/core';
import {FaqItem} from '../../../models/faq.item';
import { UserEntity } from 'src/models/userEntity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit ,AfterViewInit{
  ListFaqs: FaqItem[];
  ListFaq: any;
  faqItem:FaqItem;


  constructor(private faqService:FaqService,
              private token:TokenService,
              private router: Router,

              ) { }
  ngAfterViewInit(): void {
    this.getFaq();
  }

  ngOnInit(): void {
    this.faqItem=new FaqItem();
    this.faqItem.user =new UserEntity();
    this.getFaq();
    
  }

  @Input()
  title = 'FAQ';

  @Input()
  multi = false;

  @Input()
  displayMode = 'default'; // or flat

  @Input()
  faqList: FaqItem[] = [];


  @Input()
  title1 = 'Admin';

  @Output()
  onFAQItemAdded: EventEmitter<FaqItem> = new EventEmitter<FaqItem>();

  question: string;
  answer: string;

  reset() {
    this.question = this.answer = undefined;
  }



  getFaq() {
   this.faqService.getListFaqs().subscribe((r)=>(this.ListFaqs=r));
    }

    redirectfaqchild(){

      this.router.navigateByUrl('/dashboard/ask');

    }

}
