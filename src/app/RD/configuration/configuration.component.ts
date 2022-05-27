import { RequestService } from 'src/app/services/request.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  lang: any;

  constructor() { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('lang') || 'en' ;

  }

}
