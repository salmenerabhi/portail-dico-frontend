import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-tl',
  templateUrl: './home-tl.component.html',
  styleUrls: ['./home-tl.component.css']
})
export class HomeTLComponent implements OnInit {
  panelOpenState = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  redirectDashboard() {

    this.router.navigateByUrl('/dashboardTL/listfilesTL');
  }
  redirectTools() {
    this.router.navigateByUrl('/dashboardTL/toolsmanager');
  }

  redirectFaq() {
    this.router.navigateByUrl('/dashboardTL/faq');
  }

  redirectStats() {
    this.router.navigateByUrl('/dashboardTL/statstl');
  }
  redirectRequestFile() {
    this.router.navigateByUrl('/dashboardTL/filesRequest');
  }
}
