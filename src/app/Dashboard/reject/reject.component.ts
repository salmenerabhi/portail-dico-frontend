import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'src/app/services/request.service';
import { Infos, RequestFile, State } from 'src/models/RequestFile';

@Component({
  selector: 'app-reject',
  templateUrl: './reject.component.html',
  styleUrls: ['./reject.component.css']
})
export class RejectComponent implements OnInit, AfterViewInit{
  values : Infos []= [
    { infos :"Manual modification on demand",state:false},{ infos :"Spell check",state:false},{ infos :"Number per star",state:false},{ infos :"Words in min except abbreviations",state:false},{ infos :"Surplus of spaces",state:false},{ infos :"Truncated words",state:false},
    { infos :"Existing sentence",state:false},{ infos :"Period at the end of the line",state:false},{ infos :"Duplicates",state:false},
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
  ngAfterViewInit() {
    this.getrequests();
  }


  getrequests() {
    this.checklist=this.requestfile.checklist
    console.log(this.checklist)
     }
 

     rejectAll() {
        this.requestfile.state = State.rejected
        this.requestFileService.update(this.requestfile).subscribe();
      this.ngAfterViewInit();
    }
     
}
