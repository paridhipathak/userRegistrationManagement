import { Router, NavigationExtras } from '@angular/router';
import { RegisteredUsers } from './../../model/user';
import { Component, OnInit } from '@angular/core';

import {MatTableDataSource} from '@angular/material';

import { UserDetailsService } from './../../services/userDataService/user-details.service';
import { SnackbarService } from './../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  displayedColumns: string[] = ['firstname', 'lastname', 'mobileNumber', 'email', 'dob', 'qualification', 'edit', 'delete'];
  dataSource = new MatTableDataSource();
  allRegisteredUsers: Array<RegisteredUsers> = [];
  constructor(private router: Router, private userDetailsService: UserDetailsService, private snackbar: SnackbarService) {
    this.allRegisteredUsers = userDetailsService.getUserDetails();
    this.dataSource = new MatTableDataSource(this.allRegisteredUsers);
  }

  ngOnInit() {
  }

  onUpdate(user: RegisteredUsers) {
    const navigationExtras: NavigationExtras = {
      state: user
    };
    this.router.navigate(['userRegistration'], navigationExtras)
  }

  onDelete(user: RegisteredUsers) {
    let result = this.userDetailsService.deleteUser(user);
    if(result) {
      this.allRegisteredUsers= this.userDetailsService.getUserDetails();
      this.dataSource = new MatTableDataSource(this.allRegisteredUsers);
      this.snackbar.openSnackBar('User details deleted successfully!!!');
    } else {
      this.snackbar.openSnackBar('unable to delete user... Please try again later!!!');
    }
  }

}
