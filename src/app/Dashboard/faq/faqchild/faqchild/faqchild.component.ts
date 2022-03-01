import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/Authentification/services/token.service';
import { FaqService } from 'src/app/services/faq.service';
import { FaqItem } from 'src/models/faq.item';
import { UserEntity } from 'src/models/userEntity';

@Component({
  selector: 'app-faqchild',
  templateUrl: './faqchild.component.html',
  styleUrls: ['./faqchild.component.css']
})
export class FaqchildComponent implements OnInit ,AfterViewInit{
  quest = new FormControl(null, [Validators.required, Validators.minLength(1)])
  rep = new FormControl(null, [Validators.required, Validators.minLength(1)])

  faqItem: FaqItem;

  constructor(private token: TokenService,
    private faqService: FaqService,
    private router: Router,
    private toastr: ToastrService,


  ) { }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {

    this.faqItem = new FaqItem();
    this.faqItem.user = new UserEntity();
  }



  @Input()
  title1 = 'Admin';

  @Output()
  onFAQItemAdded: EventEmitter<FaqItem> = new EventEmitter<FaqItem>();

  question: string;
  answer: string;

  reset() {
    this.question = this.answer = undefined;
  }

  add(): void {
    this.faqItem.question = this.quest.value;
    this.faqItem.answer = this.rep.value;
    this.faqItem.user.id = this.token.getId();

    this.faqService.addFaq(this.faqItem).subscribe();

    this.quest.reset();
    this.rep.reset();

    this.toastr.success(
      ``,
      'your question will be answered soon!',
      {
        timeOut: 3000,
        positionClass: 'toast-bottom-left',

      },
      );

  }

  redirectfaq(){

    this.router.navigateByUrl('/dashboard/faq');

  }
}
