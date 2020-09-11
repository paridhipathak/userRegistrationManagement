import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA  } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import {
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatTabsModule
} from "@angular/material";

import { LoginRoutingModule } from './login-routing.module';

import { LoginComponent } from "./login.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { RegistrationFormComponent } from "./registration-form/registration-form.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule
  ],
  declarations: [LoginComponent, LoginFormComponent, RegistrationFormComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class LoginModule {}
