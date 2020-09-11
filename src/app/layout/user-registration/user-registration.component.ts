import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { UserDetailsService } from './../../services/userDataService/user-details.service';
import { SnackbarService } from './../../services/snackbar/snackbar.service';

import { RegisteredUsers } from './../../model/user';
import * as moment from 'moment';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  @ViewChild('formDirective', {static:true}) myForm;
  registrationForm: FormGroup;
  existingUser: any;
  submitted = false;
  DT_FORMAT = 'MM-DD-YYYY';
  constructor(private fb: FormBuilder,
    private router: Router,
    private userDetailsService: UserDetailsService,
    private snackbar: SnackbarService) {
    const navigation = this.router.getCurrentNavigation();
    this.existingUser = navigation.extras.state as RegisteredUsers;
    this.setFormValues();
  }

  ngOnInit() {
    console.log(this.existingUser);
    let user = {...this.existingUser}
    if(this.existingUser) {
      user['dob'] = this.formDate(this.existingUser['dob']);
      console.log(user);
    }
    user ? this.registrationForm.patchValue(user) : this.registrationForm;
  }

  setFormValues() {
    this.registrationForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      mobileNumber: [null, Validators.required],
      email: ['', Validators.email],
      dob: ['', Validators.required],
      qualification: ['', Validators.required]
    });
  }

  get f() {
    return this.registrationForm.controls;
  }

  formDate(value: string): NgbDateStruct {
    if (value) {
      value = value.trim();
      let mdt = moment(value, this.DT_FORMAT);
      return { day: mdt.day(), month: mdt.months() + 1, year: mdt.year() };
    }
    return null;
  }

  formatDate(date: NgbDateStruct): string {
    if (!date) return '';
    const mdt = moment([date.year, date.month - 1, date.day]);
    return mdt.isValid() ? mdt.format(this.DT_FORMAT) : '';
  }
  
  onSubmit() {
    this.submitted=true;
    console.log(this.registrationForm.value.dob);
    if(this.registrationForm.valid && !this.existingUser) {
      let date = this.formatDate(this.registrationForm.value.dob);
      let formValue = {...this.registrationForm.value};
      formValue['dob'] = date;
      console.log(formValue);
      let result = this.userDetailsService.addUser(formValue);
      if(result){
        this.snackbar.openSnackBar('user added successfully!!!');
        this.router.navigate(['/dashboard/userDetails']);
      } else this.snackbar.openSnackBar('User already exist');
    } else {
      let date = this.formatDate(this.registrationForm.value.dob);
      let formValue = {...this.registrationForm.value};
      formValue['dob'] = date;
      let result = this.userDetailsService.updateUserDetails(this.existingUser, formValue);
      if(result){
        this.snackbar.openSnackBar('User Details Updated Succcessfully!!!');
        this.router.navigate(['/dashboard/userDetails']);
      } else this.snackbar.openSnackBar('unable to update the details... Please try again later');
    }
  }

}
