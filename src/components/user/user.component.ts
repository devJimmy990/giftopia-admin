import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { GeneralMethods } from '../../functions';
import { RouterModule } from '@angular/router';
import { UserPopupComponent } from '../user-popup/user-popup.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [HttpClientModule,RouterModule,UserPopupComponent,CommonModule],
  providers:[UserService],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  Users: UserModel[] = [];
  selectedUser: any;
  isUserPopupVisible: boolean = false;
  constructor(private service: UserService) { }
  ngOnInit(): void {
    this.service.getUsers().subscribe({
      next: (data) => { this.Users = GeneralMethods.CastUsers(data); console.log(this.Users); },
      error: (err) => console.log(err)
    });
  }
  openUserPopup(user: any) {
    this.selectedUser = user;
    this.isUserPopupVisible = true;
  }

  closeUserPopup() {
    this.isUserPopupVisible = false;
  }
}
