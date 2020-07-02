import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerSubsc = new Subscription();

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.registerSubsc = this.authService.register(this.model).subscribe(() => {
      console.log('registration successful');
    }, error => {
      console.log(error);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  ngOnDestroy() {
    this.registerSubsc.unsubscribe();
  }

}
