import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-firstpage',
  templateUrl: './firstpage.component.html',
  styleUrls: ['./firstpage.component.css']
})
export class FirstpageComponent implements OnInit {
  panelOpenState = false;
  lang: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('lang') || 'en' ;

  }

  redirectDashboard() {
    this.router.navigateByUrl('/dashboard/listFiles');
  }

  redirectTools() {
    this.router.navigateByUrl('/dashboard/toolsmanager');
  }

  redirectFaq() {
    this.router.navigateByUrl('/dashboard/faqmanagement');
  }

  redirectStats() {
    this.router.navigateByUrl('/dashboard/stats');
  }
  redirectAdministration() {
    this.router.navigateByUrl('/dashboard/administration');
  }
}
