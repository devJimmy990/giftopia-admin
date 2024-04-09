import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { GeneralMethods } from '../../functions';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [HttpClientModule],
  providers:[UserService],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  Users: UserModel[] = [];
  constructor(private service: UserService) { }
  ngOnInit(): void {
    this.service.getUsers().subscribe({
      next: (data) => { this.Users = GeneralMethods.CastUsers(data); console.log(this.Users); },
      error: (err) => console.log(err)
    });
  }
}
