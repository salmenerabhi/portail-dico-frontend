import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrationpage',
  templateUrl: './administrationpage.component.html',
  styleUrls: ['./administrationpage.component.css']
})
export class AdministrationpageComponent implements OnInit {
  panelOpenState = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
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
}
