import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/entity/User';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  users$: Observable<User[]>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
/*     this.userService.getUsers().subscribe((usersValue: User[]) => {
      this.users = usersValue;
    }); */
    this.users$ = this.userService.getUsers();
  }

}
