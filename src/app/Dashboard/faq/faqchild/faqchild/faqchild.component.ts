import { RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
export class FaqchildComponent implements OnInit, AfterViewInit {

  constructor(private token: TokenService,
              private faqService: FaqService,
              private router: Router,
              private toastr: ToastrService,


  ) { }
  quest = new FormControl(null, [Validators.required, Validators.minLength(1)]);
  rep = new FormControl(null, [Validators.required, Validators.minLength(1)]);
  desc = new FormControl(null, [Validators.required, Validators.minLength(1)]);

  faqItem: FaqItem;

  // tslint:disable-next-line: member-ordering
  @ViewChild('exampleRTE')
  public componentObject!: RichTextEditorComponent;

  @Output()
  onFAQItemAdded: EventEmitter<FaqItem> = new EventEmitter<FaqItem>();

  // tslint:disable-next-line: member-ordering
  question: string;
  // tslint:disable-next-line: member-ordering
  answer: string;
  // tslint:disable-next-line: member-ordering
  description: string;
  // tslint:disable-next-line: member-ordering
  private buttonElement!: HTMLElement | null;
  private htmlContent!: string;
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {

    this.faqItem = new FaqItem();
    this.faqItem.user = new UserEntity();
  }

  reset() {
    this.question = this.answer = this.description = undefined;
  }

  add(): void {
    this.buttonElement = document.getElementById('button');
    this.htmlContent = this.componentObject.getHtml();

    this.faqItem.title = this.htmlContent;
    this.faqItem.question = this.quest.value;
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

  redirectfaq() {

    this.router.navigateByUrl('/dashboardRC/faq');

  }
}
