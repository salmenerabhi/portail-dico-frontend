import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'src/app/services/request.service';
import { Brand } from 'src/models/RequestFile';

@Component({
  selector: 'app-addbrand',
  templateUrl: './addbrand.component.html',
  styleUrls: ['./addbrand.component.css']
})
export class AddbrandComponent implements OnInit, AfterViewInit {
  brand: Brand;
  marque = new FormControl(null);
  lang: any;

  constructor(private RequestfileService: RequestService,
              private toastr: ToastrService,
  ) { }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.brand = new Brand();
    this.lang= localStorage.getItem('lang') || 'en' ;

  }


  add(): void {
    this.RequestfileService.addBrand(this.brand).subscribe();

    this.toastr.success(``, 'Brand added successfully!', {
      timeOut: 3000,
      positionClass: 'toast-bottom-left'
    });
    this.ngAfterViewInit();
    this.marque.reset();
  }
}
