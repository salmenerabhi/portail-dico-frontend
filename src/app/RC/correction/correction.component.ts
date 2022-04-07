import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'src/app/services/request.service';
import { Infos, RequestFile, State } from 'src/models/RequestFile';
import { UserEntity } from 'src/models/userEntity';

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
  requiredFileType:string;

  selected1: false;
  selection = new SelectionModel<RequestFile>(true, []);
  values: Infos[] = [
    { infos: "manual modification on demand", state: false }, { infos: "spell check", state: false }, { infos: "number per star", state: false }, { infos: "words in min except abbreviations", state: false }, { infos: "surplus of spaces", state: false }, { infos: "truncated words", state: false },
    { infos: "existing sentence", state: false }, { infos: "period at the end of the line", state: false }, { infos: "duplicates", state: false },
  ];
  checklist: Infos[]
  requestFile: RequestFile
  disabled = new FormControl(false);
  ECU = new FormControl('', [Validators.required]);
  brand = new FormControl(null, [Validators.required])
  target = new FormControl(null, [Validators.required])
  commentaire = new FormControl(null, [Validators.required])

  constructor(private requestFileService: RequestService,
    private toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public requestfile: RequestFile) { }

  ngOnInit(): void {
    this.getrequests()
    console.log(this.checklist)


  }

  ngAfterViewInit() {
    this.getrequests()
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
    const file:File = event.target.files[0];

    if (event.target.files.length > 0) {
      this.files = event.target.files[0];
      this.message = this.files;
      // this.updloadFile();
      this.requestfile.name=this.files.name
      console.log(this.message);
      this.fileName = file.name;
  

    }
  }

  updloadFile() {
    const formData = new FormData();
    this.file.user= new UserEntity;
    this.file.checklist = this.values
    this.file.user.id = localStorage.getItem('id')
    this.file.ecu = this.ECU.value
    this.file.marque = this.brand.value
    this.file.cible = this.target.value
    this.file.commentaire= this.commentaire.value
    formData.append('file', this.files);
    formData.append('requestfile', JSON.stringify(this.file));
    this.requestFileService.updateRequest(formData)
      .subscribe(res => {
        console.log(res);
      });
    this.toast.warning('correction sent successfully !!', 'ADDED', {
      timeOut: 3000,
      positionClass: 'toast-bottom-left'
    });
    console.log(this.file)

  }

getrequests() {
  this.checklist = this.requestfile.checklist
  console.log(this.checklist)
}

// rejectAll() {
//   for (let file of this.selection.selected) {
//     file.state = State.rejected
//     this.requestFileService.update(file).subscribe();
//   }
//   this.ngAfterViewInit();
// }

}
