import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq-management',
  templateUrl: './faq-management.component.html',
  styleUrls: ['./faq-management.component.css']
})
export class FaqManagementComponent implements OnInit {
  lang: any;

  constructor() { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('lang') || 'en' ;

  }

}
