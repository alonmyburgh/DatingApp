import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { User } from '../../_models/user';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit, OnDestroy {

  users: User[];
  subs = new Subscription();

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subs = this.route.data.subscribe(data => {
      this.users = data['users'];
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
