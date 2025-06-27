import {Component, Input, OnInit} from '@angular/core';
import {OverlayRef} from '@angular/cdk/overlay';
import {UserService} from '../../../services/user.service';
import {User} from '../../../interfaces/users.interface';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-alluser',
  imports: [
    FormsModule
  ],
  templateUrl: './alluser.component.html',
  styleUrl: './alluser.component.scss'
})
export class AlluserComponent implements OnInit {
  users: User[] = [];
  selectedUser?: User;
  isFullscreen = false;

  searchValue = '';
  searchTerm = '';

  @Input() overlayRef!: OverlayRef;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  close() {
    this.overlayRef?.dispose();
  }

  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
  }

  selectUser1(user: User) {
    this.selectedUser = user;
  }

  showProperties() {
    if (this.selectedUser) {
      console.log(this.selectedUser);
    }
  }

  SearchInput() {
    this.searchTerm = this.searchValue;
  }

  filteredUsers(): User[] {
    if (!this.searchTerm) return this.users;
    return this.users.filter(user =>
      (user.firstname + ' ' + user.lastname).toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
