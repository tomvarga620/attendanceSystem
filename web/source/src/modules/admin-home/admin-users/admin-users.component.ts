import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/entity/User';
import { UserService } from 'src/services/user.service';
import { UserAuth } from 'src/store/auth/auth.actions';
import { AuthState } from 'src/store/auth/auth.state';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  users$: Observable<User[]>;

  constructor(private userService: UserService, private store: Store) { }

  ngOnInit(): void {
/*     this.userService.getUsers().subscribe((usersValue: User[]) => {
      this.users = usersValue;
    }); */
    const userId = this.store.selectSnapshot<number>(state => state.userAuth.id);
    this.users$ = this.userService.getUsers(userId);
  }

}
