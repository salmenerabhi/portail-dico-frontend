import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'src/app/services/request.service';
import { Infos, RequestFile } from 'src/models/RequestFile';

@Component({
  selector: 'app-reject',
  templateUrl: './reject.component.html',
  styleUrls: ['./reject.component.css']
})
export class RejectComponent implements OnInit {
  values : Infos []= [
    { infos :"manual modification on demand",state:false},{ infos :"spell check",state:false},{ infos :"number per star",state:false},{ infos :"words in min except abbreviations",state:false},{ infos :"surplus of spaces",state:false},{ infos :"truncated words",state:false},
    { infos :"existing sentence",state:false},{ infos :"period at the end of the line",state:false},{ infos :"duplicates",state:false},
   ];
  checklist: Infos[]
requestFile: RequestFile
  constructor(private requestFileService: RequestService,
    private toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public requestfile: RequestFile) { }

  ngOnInit(): void {
    this.getrequests()
    console.log(this.checklist)


  }

  getrequests() {
    this.checklist=this.requestfile.checklist
    console.log(this.checklist)
     }
 
}
