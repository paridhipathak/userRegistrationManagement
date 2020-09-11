import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

import { User } from './../../model/user';

import { AuthService } from './../../services/authService/auth.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  @Output() registerEvent = new EventEmitter<boolean>();
  userRegisterForm: FormGroup;
  passwordMatchError: boolean;
  user: User = new User();
  submitted = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.userRegisterForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
      cPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  get f() {
    return this.userRegisterForm.controls;
  }

  onRegister() {
    this.submitted = true;
    this.passwordMatchError = this.userRegisterForm.get('password').value === this.userRegisterForm.get('cPassword').value ? false : true;
    if(this.userRegisterForm.valid && !this.passwordMatchError) {
      this.user = this.userRegisterForm.value;
      delete this.user['cPassword'];
      this.authService.registerUser(this.user);
      this.router.navigate(['/']);
    }
  }

}
