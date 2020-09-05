import { User } from './../../model/user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';

import { AuthService } from './../../services/authService/auth.service';
import { SnackbarService } from './../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  loginInvalid: boolean;
  user: User;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackbar: SnackbarService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  checkUserExist() {
    this.user = this.authService.getUser();
  }

  onLogin() {
    this.checkUserExist();
    if(this.loginForm.valid && this.user) {
      let name= this.loginForm.get('username').value;
      let password= this.loginForm.get('password').value;

      if(name === this.user.username && password === this.user.password) {
        this.authService.setSession();
        this.router.navigate([''])
       } else this.loginInvalid = true;

    } else {
      this.snackbar.openSnackBar("Please register to continue");
    }
  }

}
