import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'src/app/services/request.service';
import { Target } from 'src/models/RequestFile';

@Component({
  selector: 'app-addtarget',
  templateUrl: './addtarget.component.html',
  styleUrls: ['./addtarget.component.css']
})
export class AddtargetComponent implements OnInit {
  target: Target;
  cible = new FormControl(null);
  lang: any;
  constructor(private RequestfileService: RequestService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.target = new Target();
    this.lang= localStorage.getItem('lang') || 'en' ;

  }
  add(): void {
    this.RequestfileService.addTarget(this.target).subscribe();

    this.toastr.success(``, 'Target added successfully!', {
        timeOut: 3000,
        positionClass: 'toast-bottom-left'});
    this.cible.reset();
  }
}

