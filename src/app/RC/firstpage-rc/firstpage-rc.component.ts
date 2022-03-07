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

    this.router.navigateByUrl('/dashboardRC');
  }

}
