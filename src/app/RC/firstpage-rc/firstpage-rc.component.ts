import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-firstpage-rc',
  templateUrl: './firstpage-rc.component.html',
  styleUrls: ['./firstpage-rc.component.css']
})
export class FirstpageRCComponent implements OnInit {
  panelOpenState = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  redirectDashboard() {

    this.router.navigateByUrl('/dashboardRC/mainRC');
  }
  redirectTools() {
    this.router.navigateByUrl('/dashboardRC/toolsmanager');
  }

  redirectFaq() {
    this.router.navigateByUrl('/dashboardRC/faq');
  }

  redirectStats() {
    this.router.navigateByUrl('/dashboardRC/stats');
  }
  redirectRequestFile() {
    this.router.navigateByUrl('/dashboardRC/filesRequest');
  }
}
