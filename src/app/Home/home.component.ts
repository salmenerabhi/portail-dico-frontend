import { InscriptionComponent } from '../inscription/inscription.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthentificationService } from '../Authentification/services/authentification.service';
import { TokenService } from '../Authentification/services/token.service';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { UserEntity } from 'src/models/userEntity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: UserEntity | undefined;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(4)]);
  hide = true;

  loginForm = new FormGroup({
    email: this.email,
    password: this.password

  });
  constructor(private authService: AuthentificationService,
    private token: TokenService,
    private account: AccountService,
    private toastr: ToastrService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog() {
    this.dialog.open(HomeComponent, {
      height: '40%',
      width: '40%'
    });
  }

  openDialog2() {
    this.dialog.open(InscriptionComponent, {
      height: '90%',
      width: '70%'
    });
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorEmailMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getErrorPasswordMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('password') ? 'Not password valid' : '';
  }

  signIn() {

    this.authService.login(this.loginForm.value).subscribe(
      res => this.handleResponse(res),
      err => this.toastr.error(
        `error`,
        'email or password incorrect !',
        {
          timeOut: 3000,
          positionClass: 'toast-bottom-left'
        }
      ));
  }


  handleResponse(data: any) {
    this.token.handle(data);

    this.account.changeAuthStatus(true);
    this.toastr.success(
      `Welcome ` + this.token.getUserName(),
      'you are connected !',
      {
        timeOut: 3000,
        positionClass: 'toast-bottom-left',

      },

    );

    if (this.token.getUserRole() == "RD") {
      this.router.navigateByUrl('/firstpageRD');
    }
    else if (this.token.getUserRole() === "RC") {

      this.router.navigateByUrl('/firstpageRC');
    } else this.router.navigateByUrl('/dashAgent');
  }

}
