import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { HttpClientModule } from '@angular/common/http';
import { GeneralMethods } from '../../functions';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [HttpClientModule],
  providers:[OrderService],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  Orders: OrderModel[] = [];
  constructor(private service: OrderService) { }
  ngOnInit(): void {
    this.service.getOrders().subscribe({
      next: (data) => { this.Orders = GeneralMethods.CastOrders(data); console.log(this.Orders); },
      error: (err) => console.log(err)
    });
  }
}