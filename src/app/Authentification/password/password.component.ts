import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthentificationService} from '../services/authentification.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {

  email = new FormControl('', [Validators.required, Validators.email]);
  constructor( private authService: AuthentificationService,
               private toast: ToastrService) { }


  getErrorEmailMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  sendEmail(){
    this.authService.forgotPassword(this.email.value).subscribe(() =>
      this.toast.success('mail sent')
    , () => {
      this.toast.success('mail sent');
    });
  }
}




