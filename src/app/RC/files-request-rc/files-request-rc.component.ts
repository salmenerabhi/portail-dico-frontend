import { AccountService } from './../../services/account.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Infos, Langue, RequestFile } from 'src/models/RequestFile';
import { LoadingrequestComponent } from '../loadingrequest/loadingrequest.component';
import { RequestService } from 'src/app/services/request.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/Authentification/services/token.service';
import { UserEntity } from 'src/models/userEntity';

@Component({
  selector: 'app-files-request-rc',
  templateUrl: './files-request-rc.component.html',
  styleUrls: ['./files-request-rc.component.css'],

  encapsulation: ViewEncapsulation.None,

})

export class FilesRequestRCComponent implements OnInit {
 info =new Infos()
  disabled = new FormControl(false);
  ECU = new FormControl('', [Validators.required]);
  
  retrievedImage: string = 'assets/img/logo.png';
  @Input()
  requiredFileType:string;
selected: false;
selected1: false;
brand = new FormControl(null, [Validators.required])
target = new FormControl(null, [Validators.required])
file: RequestFile = new RequestFile();
files: File;
checked = false;
  fileName = '';
  uploadProgress:number;
  uploadSub: Subscription;


  types:any[]=[]; // for storing types values as array..
infoForm: FormGroup;
fileIsUploading = false;
fileUrl: string;
fileUploaded = false;
toppings: FormGroup;
requestfile: RequestFile;


values : Infos []= [
  { infos :"Manual modification on demand",state:false},{ infos :"Spell check",state:false},{ infos :"Number per star",state:false},{ infos :"Words in min except abbreviations",state:false},{ infos :"Surplus of spaces",state:false},{ infos :"Truncated words",state:false},
  { infos :"Existing sentence",state:false},{ infos :"Period at the end of the line",state:false},{ infos :"Duplicates",state:false},
 ];

  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    private requestFileService: RequestService,
    private toast: ToastrService,
    private dialog: MatDialog,
    private Token: TokenService,
    ) {}

    
    tok: string;
    id: string;
  ngOnInit(): void {
    this.file.langue=Langue.FR
    this.requestfile=new RequestFile();

  }


  onFileSelected(event) {
      const file:File = event.target.files[0];
    
      if (file) {
          this.fileName = file.name;
          const formData = new FormData();
          formData.append("thumbnail", file);

          const upload$ = this.http.post("/api/thumbnail-upload", formData, {
              reportProgress: true,
              observe: 'events'
          })
          .pipe(
              finalize(() => this.reset())
          );
        
          this.uploadSub = upload$.subscribe(event => {
            if (event.type == HttpEventType.UploadProgress) {
              this.uploadProgress = Math.round(100 * (event.loaded / event.total));
            }
          })
      }
  }

cancelUpload() {
  this.uploadSub.unsubscribe();
  this.reset();
}

reset() {
  this.uploadProgress = null;
  this.uploadSub = null;
}

openDialog() {
  let dialogRef =this.dialog.open(LoadingrequestComponent, {
    height: '90%',
    width: '70%',
  
  });

  dialogRef.afterClosed().subscribe(res => {
    // received data from dialog-component
    this.file=res[0]
    console.log(this.file)
    this.files=res[1]

  })
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


  console.log(this.values)
  formData.append('file', this.files);
  formData.append('requestfile', JSON.stringify(this.file));
  this.requestFileService.Save(formData)
    .subscribe(res => {
      console.log(res);
    });
  this.toast.warning('tool added successfully !!', 'ADDED', {
    timeOut: 3000,
    positionClass: 'toast-bottom-left'
  });
  console.log(this.file)

}

}

