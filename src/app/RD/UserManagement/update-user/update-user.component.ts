import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';
import { UserEntity } from 'src/models/userEntity';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  close=false;
  message: File;
  photo: File;
  password=new FormControl(null, [Validators.required, Validators.minLength(8)])
  base64Data: Int8Array;
  retrievedImage: string;
  constructor(private accountService:AccountService,
              private toast:ToastrService,
              @Inject(MAT_DIALOG_DATA) public user: UserEntity) {}


  ngOnInit(): void {
   this.getImage()
  }

  getErrorPasswordMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('password') ? 'Not password valid' : '';
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      this.photo = event.target.files[0];
      this.message = this.photo;
      const reader = new FileReader();
      reader.onload = () => {
        this.retrievedImage = reader.result as string;
      }
      reader.readAsDataURL(this.photo)

    }
  }
  updateUser() {
    if(this.photo!=null) {
      const formData = new FormData();
      if (this.photo) {
        this.user.image.name = this.photo.name;
      }
      formData.append('image', this.photo);
      formData.append('userDto', JSON.stringify(this.user));
      this.accountService.updateUser(formData)
        .subscribe(res => {
          this.toast.success('Data update successfully !!', 'UPDATE', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'
          });
          this.close=true;
        });
    }
    else {
      this.accountService.updateUserWithoutImage(this.user).subscribe(res => {
          this.toast.success('Data update successfully ', 'UPDATE', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'
          });
          this.close=true;
        }

      )

    }

  }
  getImage() {
    this.base64Data = this.user.image.data;
    this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
  }

}
