import { RegisteredUsers } from './../../model/user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor() { }

  public getUserDetails(): Array<RegisteredUsers> {
    return  localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : []
  }

  public addUser(userDetails): boolean {
    let users = this.getUserDetails();
    let index = users.findIndex((o) => { return o.email == userDetails.email });
    if(users.length && index >=0 ) {
      return false;
    } else {
      users.push(userDetails);
      localStorage.setItem('userDetails', JSON.stringify(users));
      return true;
    }
   }

   public updateUserDetails(oldUserDetails, userDetails): boolean {
    let users = this.getUserDetails();
    let index = users.findIndex((o) => { return o.email == oldUserDetails.email });
    if(users.length && index >= 0) {
      users[index] = userDetails;
      localStorage.setItem('userDetails', JSON.stringify(users));
      return true
    }
   }

   public deleteUser(userDetails): boolean {
    let users = this.getUserDetails();
    let index = users.findIndex((o) => { return o.email == userDetails.email });
    if(users.length && index >= 0) {
      users.splice(index, 1);
      localStorage.setItem('userDetails', JSON.stringify(users));
      return true;
    } else {
      return false;
    }
   }
}
