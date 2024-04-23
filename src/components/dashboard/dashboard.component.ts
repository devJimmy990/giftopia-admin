import { Component, OnInit, Output } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { HttpClientModule } from '@angular/common/http';
import { DashhboardCardComponent } from '../dashhboard-card/dashhboard-card.component';
import { Router } from '@angular/router';
import { SalesComponent } from '../sales/sales.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule, DashhboardCardComponent, SalesComponent],
  providers: [DashboardService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  @Output() dashboard: any;
  isLoaded = false;
  sales = "0";
  constructor(private service: DashboardService, private router: Router) { }

  ngOnInit(): void {
    this.service.getDashboard().subscribe({
      next: (data) => {
        let res = 0;
        this.dashboard = data;
        this.dashboard.orders.forEach((order: any) => {
          const orderCost = order.products.reduce((acc: any, product: any) =>
            acc + (product.soldQuantity * product.soldPrice)
            , 0);
          res += orderCost;
        });
        this.sales = res.toLocaleString();
        if (this.dashboard.token) {

          localStorage.setItem("token", this.dashboard.token[0]["token"]);
          this.isLoaded = true;
        }
        else {
          this.isLoaded = false;
          this.router.navigate(['/error']);
        }
      },
      error: (err) => console.log(err)
    });
  }
}
