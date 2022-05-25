import { Component } from '@angular/core';
import { routerCancelAction } from '@ngrx/router-store';
import { Router } from '@angular/router';

@Component({
  selector: 'smart-dropdown-user',
  templateUrl: './dropdown-user.component.html',
})
export class DropdownUserComponent {
constructor(private router :Router){

}
  user = {
    app: 'Chef.Console',
    name: 'Dr. Codex Lantern',
    email: 'drlantern@gotbootstrap.com',
    avatar: 'avatar-admin.png',
  };


  logout(){
    localStorage.removeItem('isLoggedIn')
    this.router.navigateByUrl('auth')
  }
}
