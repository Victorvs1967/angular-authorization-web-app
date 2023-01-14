import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.sass']
})
export class HelloComponent {

  users: User[] = [];

  constructor(private api: UserService) {
    this.getUsers();
  }

  getUsers() {
    this.api.getUsers().subscribe(users => this.users = users);
  }

}
