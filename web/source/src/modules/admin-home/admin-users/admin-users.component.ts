import { AfterViewInit, Component, OnInit } from '@angular/core';
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
export class AdminUsersComponent implements OnInit, AfterViewInit {

  // users$: Observable<User[]>;
  dataSource: User[];
  displayedColumns: string[] = ['username', 'role'];
  userId: number;

  constructor(private userService: UserService, private store: Store) {
    this.userId = this.store.selectSnapshot<number>(state => state.userAuth.id);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {

    this.userService.getUsers(this.userId).subscribe(
      users => this.dataSource = users
    );
  }

}
