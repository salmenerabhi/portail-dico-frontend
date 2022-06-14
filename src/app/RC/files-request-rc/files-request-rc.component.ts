import { LoadingapproximationComponent } from './../loadingapproximation/loadingapproximation.component';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Brand, Infos, Langue, RequestFile, Target } from 'src/models/RequestFile';
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
 info = new Infos();
  disabled = new FormControl(false);
  ECU = new FormControl('', [Validators.required]);
  Famille = new FormControl('', [Validators.required]);

  targets: Target[];
  brands: Brand[];

  retrievedImage = 'assets/img/logo.png';
  @Input()
  requiredFileType: string;
selected: false;
selected1: false;
brand = new FormControl(null, [Validators.required]);
target = new FormControl(null, [Validators.required]);
file: RequestFile = new RequestFile();
files: File;
checked = false;
  fileName = '';
  uploadProgress: number;
  uploadSub: Subscription;


  types: any[] = []; // for storing types values as array..
infoForm: FormGroup;
fileIsUploading = false;
fileUrl: string;
fileUploaded = false;
toppings: FormGroup;
requestfile: RequestFile;
lang: any;


values: Infos [] = [
  { infos : 'Manual modification on demand', state: false}, { infos : 'Spell check', state: false},
  { infos : 'Number per star', state: false}, { infos : 'Words in min except abbreviations', state: false},
   { infos : 'Surplus of spaces', state: false}, { infos : 'Truncated words', state: false},
  { infos : 'Existing sentence', state: false}, { infos : 'Period at the end of the line', state: false},
  { infos : 'Duplicates', state: false},
 ];

  constructor(private http: HttpClient,
              private requestFileService: RequestService,
              private toast: ToastrService,
              private dialog: MatDialog,
    ) {}

    tok: string;
    id: string;
  ngOnInit(): void {
    this.file.langue = Langue.FR;
    this.requestfile = new RequestFile();
    this.getTargets();
    this.getBrands();
    this.lang= localStorage.getItem('lang') || 'en' ;

  }


  onFileSelected(event) {
      const file: File = event.target.files[0];
      if (file) {
          this.fileName = file.name;
          const formData = new FormData();
          formData.append('thumbnail', file);

          const upload$ = this.http.post('/api/thumbnail-upload', formData, {
              reportProgress: true,
              observe: 'events'
          })
          .pipe(
              finalize(() => this.reset())
          );
          // tslint:disable-next-line: no-shadowed-variable
          this.uploadSub = upload$.subscribe(event => {
            if (event.type == HttpEventType.UploadProgress) {
              this.uploadProgress = Math.round(100 * (event.loaded / event.total));
            }
          });
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
  const dialogRef = this.dialog.open(LoadingrequestComponent, {
    height: '90%',
    width: '70%',
  });

  dialogRef.afterClosed().subscribe(res => {
    // received data from dialog-component
    this.file = res[0];
    this.files = res[1];


  });
}

openApproximationDialog() {
  const dialogRef = this.dialog.open(LoadingapproximationComponent, {
    height: '90%',
    width: '70%',
  });

  dialogRef.afterClosed().subscribe(res => {
    // received data from dialog-component
    this.file = res[0];
    this.files = res[1];
  });
}

getErrorMessage() {
  if (this.ECU.hasError('required')) {
    return 'You must enter an ECU';
  }

  return this.ECU.hasError('ECU') ? 'Not a valid ECU' : '';
}

getfamilleErrorMessage() {
  if (this.Famille.hasError('required')) {
    return 'You must enter a family';
  }

  return this.Famille.hasError('Famille') ? 'Not a valid Family' : '';
}



updloadFile() {
  const formData = new FormData();
  this.file.user = new UserEntity();
  this.file.checklist = this.values;
  this.file.user.id = localStorage.getItem('id');
  this.file.ecu = this.ECU.value;
  this.file.famille = this.Famille.value;

  this.file.marque = this.brand.value;
  this.file.cible = this.target.value;


  formData.append('file', this.files);
  formData.append('requestfile', JSON.stringify(this.file));
  this.requestFileService.Save(formData)
    .subscribe(res => {
    });
  this.toast.success('File added successfully !!', 'ADDED', {
    timeOut: 3000,
    positionClass: 'toast-bottom-left'
  });
}

getBrands() {
  this.requestFileService.getBrands().subscribe((r) => (this.brands = r));
}

getTargets() {
  this.requestFileService.getTargets().subscribe((r) => (this.targets = r));
}
}

