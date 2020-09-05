import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';

import { UserDetailsService } from './../../services/userDataService/user-details.service';
import { SnackbarService } from './../../services/snackbar/snackbar.service';

import { RegisteredUsers } from './../../model/user';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  existingUser: any;
  constructor(private fb: FormBuilder,
    private router: Router,
    private userDetailsService: UserDetailsService,
    private snackbar: SnackbarService) {
    const navigation = this.router.getCurrentNavigation();
    this.existingUser = navigation.extras.state as RegisteredUsers;
    this.setFormValues();
  }

  ngOnInit() {
    this.existingUser ? this.registrationForm.patchValue(this.existingUser) : this.registrationForm;
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

  onSubmit(formDirective: FormGroupDirective) {
    if(this.registrationForm.valid && !this.existingUser) {
      let result = this.userDetailsService.addUser(this.registrationForm.value);
      if(result){
        this.snackbar.openSnackBar('user added successfully!!!');
        this.registrationForm.reset();
        formDirective.resetForm();
      } else this.snackbar.openSnackBar('User already exist');
    } else {
      let result = this.userDetailsService.updateUserDetails(this.existingUser, this.registrationForm.value);
      if(result){
        this.snackbar.openSnackBar('User Details Updated Succcessfully!!!');
        this.registrationForm.reset();
        formDirective.resetForm();
      } else this.snackbar.openSnackBar('unable to update the details... Please try again later');
    }
  }

}
