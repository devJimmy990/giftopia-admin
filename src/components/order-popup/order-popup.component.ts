import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { GeneralMethods } from '../../functions';

@Component({
  selector: 'app-order-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-popup.component.html',
  styleUrl: './order-popup.component.css'
})
export class OrderPopupComponent implements OnInit{
  constructor(private userService: UserService) {}
  user: User = {
    _id: "",
    name: "",
    email: "",
    image: "",
    type: "",
  }
  @Input() popupOrder: any;
  @Output() close = new EventEmitter();

  ngOnInit(): void {
    this.userService.getUserByID(this.popupOrder.userId).subscribe({
      next: (data) => {
        this.user = GeneralMethods.CastUser1(data);
      },
      error: (err) => {
        console.error('Failed to fetch user:', err);
      }
    })
  }

  closePopup() {
    this.close.emit(false);
  }
}
