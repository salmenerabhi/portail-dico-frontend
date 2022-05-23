import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-at',
  templateUrl: './home-at.component.html',
  styleUrls: ['./home-at.component.css']
})
export class HomeATComponent implements OnInit {
  panelOpenState = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  redirectDashboard() {

    this.router.navigateByUrl('/dashboardAT/listfilesAT');
  }
  redirectStats() {
    this.router.navigateByUrl('/dashboardAT/stats');
  }
  redirectRequestFile() {
    this.router.navigateByUrl('/dashboardAT/filesRequest');
  }
}
