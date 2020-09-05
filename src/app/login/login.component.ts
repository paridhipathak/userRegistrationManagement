import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild(LoginFormComponent, { static: true}) private loginFormComponent: LoginFormComponent;
  @ViewChild(RegistrationFormComponent, { static: true}) private registrationFormComponent: RegistrationFormComponent;
  selectedTab: string;
  registerMessage: string = null;
  constructor() {
    this.selectedTab = 'Login';
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.registerMessage = null;
  }

  changeSelectedTab() {
    this.selectedTab="Login";
    this.registerMessage="Registered successfully!!! Please login to continue."
  }

}
