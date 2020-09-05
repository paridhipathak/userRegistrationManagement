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
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.userRegisterForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
      cPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onRegister() {
    this.passwordMatchError = this.userRegisterForm.get('password').value === this.userRegisterForm.get('cPassword').value ? false : true;
    if(this.userRegisterForm.valid && !this.passwordMatchError) {
      this.user = this.userRegisterForm.value;
      delete this.user['cPassword'];
      this.authService.registerUser(this.user);
      this.registerEvent.emit(true);
    }
  }

}
