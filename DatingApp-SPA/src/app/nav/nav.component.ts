import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  model: any = {};
  subscription: Subscription;

  constructor(private authService: AuthService) { }
  
  ngOnInit() {
  }

  login() {
    this.subscription = this.authService.login(this.model).subscribe(next => {
      console.log('LOGED IN');
    }, error => {
      console.log('LOGED IN FAILED');
    });
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
