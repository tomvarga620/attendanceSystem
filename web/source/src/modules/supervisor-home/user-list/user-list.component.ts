import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { User } from 'src/app/entity/User';
import { DialogServiceService } from 'src/services/dialog-service.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  dataSource: User[];
  displayedColumns: string[] = ['username', 'role'];
  userId: number;
  sampleHeading = "dadadada";

  TABLE_HEADERS_DATA = [
    { key: "id", displayName: "User Id" },
    { key: "username", displayName: "Username" },
    { key: "creationTime", displayName: "Created at"},
    { key: "role", displayName: "Role"}
  ];

  constructor(
    private userService: UserService, 
    private store: Store,
    private dialogService: DialogServiceService) {
    this.userId = this.store.selectSnapshot<number>(state => state.userAuth.id);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.userService.getUsers(this.userId).subscribe(users => {
        users = users.map(user => {
          const newUser = {
            id: user.id,
            username: user.username,
            creationTime: user.creationTime,
            role: user.role.roleName
          };
          return newUser;
        })
        this.dataSource = users;
      }
    )
  }

  openDialog(){
    console.log("test");
    const options = {
      cancelButtonText: 'CANCEL',
      confirmButtonText: 'YES, LEAVE PAGE',
      messageText: 'By leaving this page you will permanently lose your form changes.',
      titleText:'Leave page?'
    };
    
    this.dialogService.open(options);
        
    this.dialogService.confirmed().subscribe(confirmed => {
       if (confirmed) {
            console.log("confirmed");
          }
    });
  }

}
