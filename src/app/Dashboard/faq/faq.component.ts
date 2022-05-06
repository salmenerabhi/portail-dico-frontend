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


  constructor(private faqService: FaqService,
              private router: Router,

              ) { }
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
  ngAfterViewInit(): void {
    this.getFaq();
  }

  ngOnInit(): void {
    this.faqItem = new FaqItem();
    this.faqItem.user = new UserEntity();
    this.getFaq();
  }

  reset() {
    this.question = this.answer = undefined;
  }



  getFaq() {
   this.faqService.getListFaqs().subscribe((r) => (this.ListFaqs = r));
    }

    redirectfaqchild(){

      this.router.navigateByUrl('/dashboardRC/ask');

    }

}

