import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit, OnDestroy {

  @Input() user: User;
  @Output() likeClick = new EventEmitter();
  subs = new Subscription();

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  sendLike(id: number) {
    this.subs = this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.alertify.success('You have liked: ' + this.user.knownAs);
      this.likeClick.emit();
    }, error => {
      this.alertify.error(error);
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
