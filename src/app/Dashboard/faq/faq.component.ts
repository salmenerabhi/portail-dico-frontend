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
export class FaqComponent implements OnInit , AfterViewInit{
  lang: any;
  ListFaqs: FaqItem[];
  ListFaq: any;
  faqItem: FaqItem;
  // tslint:disable-next-line: member-ordering
  @Input()
  title = 'FAQ';
  // tslint:disable-next-line: member-ordering
  @Input()
  multi = false;
  // tslint:disable-next-line: member-ordering
  @Input()
  displayMode = 'default';
  // tslint:disable-next-line: member-ordering
  @Input()
  faqList: FaqItem[] = [];
  // tslint:disable-next-line: member-ordering
  @Input()
  title1 = 'Admin';
  @Output()
  onFAQItemAdded: EventEmitter<FaqItem> = new EventEmitter<FaqItem>();
  // tslint:disable-next-line: member-ordering
  question: string;
  answer: string;
  constructor(private faqService: FaqService,
              private router: Router,
              private token: TokenService,
              ) { }

  ngAfterViewInit(): void {
    this.getFaq();
  }

  ngOnInit(): void {
    this.faqItem = new FaqItem();
    this.faqItem.user = new UserEntity();
    this.getFaq();
    this.lang= localStorage.getItem('lang') || 'en' ;

  }

  reset() {
    this.question = this.answer = undefined;
  }



  getFaq() {
   this.faqService.getListFaqs().subscribe((r) => (this.ListFaqs = r));
    }

    redirectfaqchild(){

      if (this.token.getUserRole() == 'RD') {
        this.router.navigateByUrl('/dashboard/ask');
      }
      else if (this.token.getUserRole() === 'RC') {
  
        this.router.navigateByUrl('/dashboardRC/ask');
  
      }
      else if (this.token.getUserRole() === 'TL') {
  
        this.router.navigateByUrl('/dashboardTL/ask');
  
      }

    }

}

