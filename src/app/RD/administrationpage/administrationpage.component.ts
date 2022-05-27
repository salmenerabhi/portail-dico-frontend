import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrationpage',
  templateUrl: './administrationpage.component.html',
  styleUrls: ['./administrationpage.component.css']
})
export class AdministrationpageComponent implements OnInit {
  panelOpenState = false;
  lang: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('lang') || 'en' ;
  }


  redirectUserManagement() {

    this.router.navigateByUrl('/dashboard/usermanagement');
  }

  redirectAlertManagement() {

    this.router.navigateByUrl('/dashboard/alertmanagement');
  }

  redirectFaqManagement() {

    this.router.navigateByUrl('/dashboard/faqmanagement');
  }

  redirectToolManagement() {

    this.router.navigateByUrl('/dashboard/toolmanagement');
  }

  redirectLogManagement(){

    this.router.navigateByUrl('/dashboard/logsmanagement');
  }

  redirectConfiguration() {

    this.router.navigateByUrl('/dashboard/configuration');
  }
}
