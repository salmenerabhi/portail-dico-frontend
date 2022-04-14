import { Component, OnInit, ViewChild } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-firstpage',
  templateUrl: './firstpage.component.html',
  styleUrls: ['./firstpage.component.css']
})
export class FirstpageComponent implements OnInit {
  panelOpenState = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
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
