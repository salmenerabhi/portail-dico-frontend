import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'src/app/services/request.service';
import { Infos, RequestFile, State } from 'src/models/RequestFile';

@Component({
  selector: 'app-correction',
  templateUrl: './correction.component.html',
  styleUrls: ['./correction.component.css']
})
export class CorrectionComponent implements OnInit, AfterViewInit {
  files: File;
  message: File;
  fileName = '';

  file: RequestFile = new RequestFile();
  selected: false;
  requiredFileType: string;

  selected1: false;
  selection = new SelectionModel<RequestFile>(true, []);
  values: Infos [] = [
    { infos : 'Manual modification on demand', state: false}, { infos : 'Spell check', state: false},
    { infos : 'Number per star', state: false}, { infos : 'Words in min except abbreviations', state: false},
     { infos : 'Surplus of spaces', state: false}, { infos : 'Truncated words', state: false},
    { infos : 'Existing sentence', state: false}, { infos : 'Period at the end of the line', state: false},
    { infos : 'Duplicates', state: false},
   ];
  checklist: Infos[];
  requestFile: RequestFile;
  disabled = new FormControl(false);
  ECU = new FormControl('', [Validators.required]);
  brand = new FormControl(null, [Validators.required]);
  target = new FormControl(null, [Validators.required]);
  commentaire = new FormControl(null, [Validators.required]);

  constructor(private requestFileService: RequestService,
              private toast: ToastrService,
              @Inject(MAT_DIALOG_DATA) public requestfile: RequestFile) { }

  ngOnInit(): void {
    this.getrequests();
  }

  ngAfterViewInit() {
    this.getrequests();
  }
  getErrorMessage() {
    if (this.ECU.hasError('required')) {
      return 'You must enter an ECU';
    }

    return this.ECU.hasError('ECU') ? 'Not a valid ECU' : '';
  }

  getErrorMessagecomment() {
    if (this.commentaire.hasError('required')) {
      return 'You must enter a comment';
    }

    return this.commentaire.hasError('comment') ? 'Not a valid ECU' : '';
  }

  onSelectFile(event: any) {
    const file: File = event.target.files[0];

    if (event.target.files.length > 0) {
      this.files = event.target.files[0];
      this.message = this.files;
      this.requestfile.name = this.files.name;
      this.fileName = file.name;
    }
  }

  updloadFile() {
    const formData = new FormData();
    this.requestfile.checklist = this.values;
    this.requestfile.ecu = this.ECU.value;
    this.requestfile.marque = this.brand.value;
    this.requestfile.cible = this.target.value;
    formData.append('file', this.files);
    formData.append('requestfile', JSON.stringify(this.requestfile));

    this.requestFileService.updateRequest(formData)
      .subscribe(res => {
      });
    this.toast.warning('correction sent successfully !!', 'ADDED', {
      timeOut: 3000,
      positionClass: 'toast-bottom-left'
    });

  }

getrequests() {
  this.checklist = this.requestfile.checklist;
}

}
