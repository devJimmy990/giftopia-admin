import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { HttpClientModule } from '@angular/common/http';
import { GeneralMethods } from '../../functions';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [HttpClientModule],
  providers:[OrderService,UserService],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  Orders: OrderModel[] = [];
  userNames: { [key: string]: string } = {};
  User: User = {
    _id: '',
    name: '',
    image: '',
    email: '',
    type: '',
  };
  constructor(private service: OrderService, private userService: UserService) { }
  ngOnInit(): void {
    this.service.getOrders().subscribe({
      next: (data) => { 
        this.Orders = GeneralMethods.CastOrders(data); 
        this.fetchUserNames(); 
      },
      
      error: (err) => console.log(err)
    });
  }

  calculateTotalPrice(order: any): number {
    return order.products.reduce((total: number, product: { price: number; quantity: number; }) => {
      return total + (product.price * product.quantity);
    }, 0);
  }

  fetchUserNames(): void {
    this.Orders.forEach(order => {
      this.userService.getUserByID(order.userId).subscribe({
        next: (user: any) => {
          user = GeneralMethods.CastUser(user);
          this.userNames[order.userId] = user.name;
        },
        error: (err) => console.log(err)
      });
    });
  }

  get pendingOrders() {
    return this.Orders.filter(order => order.status === 'pending');
  }

  get successOrders() {
    return this.Orders.filter(order => order.status === 'success');
  }

  get cancelledOrders() {
    return this.Orders.filter(order => order.status === 'cancelled');
  }

  get shippingOrders() {
    return this.Orders.filter(order => order.status === 'shipping');
  }
}