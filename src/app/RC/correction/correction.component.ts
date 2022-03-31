import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'src/app/services/request.service';
import { Infos, RequestFile } from 'src/models/RequestFile';
import { UserEntity } from 'src/models/userEntity';

@Component({
  selector: 'app-correction',
  templateUrl: './correction.component.html',
  styleUrls: ['./correction.component.css']
})
export class CorrectionComponent implements OnInit {
  file: RequestFile = new RequestFile();
  selected: false;
  selected1: false;

  values : Infos []= [
    { infos :"manual modification on demand",state:false},{ infos :"spell check",state:false},{ infos :"number per star",state:false},{ infos :"words in min except abbreviations",state:false},{ infos :"surplus of spaces",state:false},{ infos :"truncated words",state:false},
    { infos :"existing sentence",state:false},{ infos :"period at the end of the line",state:false},{ infos :"duplicates",state:false},
   ];
  checklist: Infos[]
requestFile: RequestFile
disabled = new FormControl(false);
  ECU = new FormControl('', [Validators.required]);
  brand = new FormControl(null, [Validators.required])
target = new FormControl(null, [Validators.required])
  constructor(private requestFileService: RequestService,
    private toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public requestfile: RequestFile) { }

  ngOnInit(): void {
    this.getrequests()
    console.log(this.checklist)


  }
  getErrorMessage() {
    if (this.ECU.hasError('required')) {
      return 'You must enter an ECU';
    }
  
    return this.ECU.hasError('ECU') ? 'Not a valid ECU' : '';
  }

  updloadFile() {
    const formData = new FormData();
    this.file.user= new UserEntity;
    this.file.checklist=this.values
    this.file.user.id=localStorage.getItem('id')
    this.file.ecu=this.ECU.value
    this.file.marque=this.brand.value
    this.file.cible=this.target.value
  }
  getrequests() {
    this.checklist=this.requestfile.checklist
    console.log(this.checklist)
     }
 
}
