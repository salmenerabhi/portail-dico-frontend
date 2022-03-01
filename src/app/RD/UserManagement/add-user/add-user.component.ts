import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/Authentification/services/token.service';
import { AccountService } from 'src/app/services/account.service';
import { FileDB } from 'src/models/FileDB';
import { UserEntity } from 'src/models/userEntity';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  user: UserEntity = new UserEntity();
  hide = true;
  RD = true;
  confirmPassword = new FormControl(null, [Validators.required, Validators.minLength(8)])
  show = true;
  message: File;
  photo: File;
  password = new FormControl(null, [Validators.required, Validators.minLength(8)])
  base64Data: Int8Array;
  retrievedImage: string = 'assets/img/avatar.jpg';

  constructor(private accountService: AccountService,
              private tokenService: TokenService,
              private toast: ToastrService,
              private route: Router
  ) {
  }

  ngOnInit(): void {
     this.user.image = new FileDB();

  }

  getErrorConfirmPasswordMessage() {
    if (this.confirmPassword.hasError('required')) {
      return 'You must enter a value';
    }
    return this.confirmPassword.hasError('password') ? 'Not password valid' : '';
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

  addUser() {
    this.user.password = this.password.value;
    if (this.photo != null) {
      const formData = new FormData();
      if (this.photo) {
        this.user.image.name = this.photo.name;
      }
      console.log(this.user)
      formData.append('image', this.photo);
      formData.append('userDto', JSON.stringify(this.user));
      this.accountService.addUser(formData)
        .subscribe(res => {
            this.toast.success('Data added successfully !!', 'add', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right'
            });
            this.route.navigateByUrl("/dashboard")
          },
          error => this.toast.error('Data not added !!', 'add', {
            timeOut: 3000,
            positionClass: 'toast-bottom-left'
          }));
    } else {
      this.accountService.addUserWithoutImage(this.user)
        .subscribe(res => {
            this.toast.success('Data added successfully !!', 'add', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right'
            });
            this.route.navigateByUrl("/dashboard")
          },
          error => {
            this.toast.error(error.error.message, 'add', {
              timeOut: 3000,
              positionClass: 'toast-bottom-left'
            })
            console.log(error)
          });

    }

  }

  

  
}
