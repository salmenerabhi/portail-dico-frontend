import { ToastrService } from 'ngx-toastr';
import { FaqService } from 'src/app/services/faq.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FaqItem } from 'src/models/faq.item';
import { UserEntity } from 'src/models/userEntity';

@Component({
  selector: 'app-faq-add-answer',
  templateUrl: './faq-add-answer.component.html',
  styleUrls: ['./faq-add-answer.component.css']
})
export class FaqAddAnswerComponent implements OnInit {
  message:string;
  answer = new FormControl('', [Validators.required]);

  constructor(@Inject(MAT_DIALOG_DATA) public faq: FaqItem,
              private faqService:FaqService,
              private toast: ToastrService) { }

  ngOnInit(): void {
    this.getQuestion()
  }

  getQuestion(){
  this.message=this.faq.question;
  }

  
  updloadFile() {

    this.faq.user= new UserEntity;
    this.faq.answer = this.answer.value
    this.faq.user.id = localStorage.getItem('id')
    this.faqService.updateFaq(this.faq)
      .subscribe(res => {
        console.log(res);
      });
    this.toast.warning('correction sent successfully !!', 'ADDED', {
      timeOut: 3000,
      positionClass: 'toast-bottom-left'
    });

  }

  


}