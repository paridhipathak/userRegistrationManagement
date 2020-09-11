import { NgModule, CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatTabsModule,
  MatTableModule,
  MatDatepickerModule,
  MatNativeDateModule
} from "@angular/material";

import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from "./layout-routing.module";
import { LayoutComponent } from "./layout.component";
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
  declarations: [LayoutComponent, UserRegistrationComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class LayoutModule {}
