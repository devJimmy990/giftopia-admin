import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { HttpClientModule } from '@angular/common/http';
import { GeneralMethods } from '../../functions';
import { UserService } from '../../services/user.service';
import { OrderPopupComponent } from '../order-popup/order-popup.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-order',
    standalone: true,
    providers: [OrderService, UserService, OrderPopupComponent],
    templateUrl: './order.component.html',
    styleUrl: './order.component.css',
    imports: [HttpClientModule, OrderPopupComponent, FormsModule]
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
  popupOrder: any;
  @Input() isViewPopup = false;
  @Input() isEditingStatus = false;
  constructor(private service: OrderService, private userService: UserService) { }
  ngOnInit(): void {
    this.service.getOrders().subscribe({
      next: (data) => { 
        this.Orders = GeneralMethods.CastOrders(data); 
        console.log(this.Orders);
        this.fetchUserNames(); 
      },
      
      error: (err) => console.log(err)
    });
  }

  calculateTotalPrice(order: any): number {
    return order.products.reduce((total: number, product: { price: number; soldQuantity: number; discount:number}) => {
      const discountPercentage = product.discount / 100;
      const discountedPrice = product.price * (1 - discountPercentage);
      total += discountedPrice * product.soldQuantity;
      return Number(total.toFixed(2));
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

  viewOrder(order:  OrderModel){
    this.popupOrder = order;
    this.isViewPopup = true;
  }

  closePopup(e: any) {
    this.isViewPopup = false;
  }
  
  editOrderStatus(order:  OrderModel){
    order.isEditing = true;
    order.tempStatus = order.status;
  }

  updateOrderStatus(order: OrderModel) {
    if (order.tempStatus && order.tempStatus !== order.status) {
      this.service.changeOrderStatus(order._id, order.tempStatus).subscribe({
        next: (data) => {
          order.status = order.tempStatus;
          order.isEditing = false;
          console.log('Order status updated successfully');
        },
        error: (err) => {
          console.log('Failed to update order status');
        }
      });
    } else {
      order.isEditing = false;
    }
  }
  

  cancelEditOrderStatus(order: OrderModel) {
    order.isEditing = false;
  }

  get pendingOrders() {
    return this.Orders.filter(order => order.status === 'pending');
  }

  get successOrders() {
    return this.Orders.filter(order => !order.isEditing && order.status === 'success');
  }

  get cancelledOrders() {
    return this.Orders.filter(order => !order.isEditing && order.status === 'cancelled');
  }

  get shippingOrders() {
    return this.Orders.filter(order => order.status === 'shipping');
  }
}