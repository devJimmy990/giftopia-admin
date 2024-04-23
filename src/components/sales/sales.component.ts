import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { OrderService } from '../../services/order.service';
import { HttpClientModule } from '@angular/common/http';
import { GeneralMethods } from '../../functions';
Chart.register(...registerables);

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [HttpClientModule],
  providers: [OrderService],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit {
  chartdata: any;
  timeData: any[] = [];
  salesData: any[] = [];
  cashData: any[] = [];
  creditData: any[] = [];
  colordata: any[] = [];

  constructor(private service: OrderService) { }

  ngOnInit(): void {
    this.service.getOrders().subscribe({
      next: (data) => {
        this.chartdata = GeneralMethods.CastOrders(data);
        console.log(this.chartdata);
        this.chartdata.sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        console.log(this.chartdata);

        if (this.chartdata != null) {
          this.chartdata.forEach((item: any) => {
            item.method == "cash" ? this.cashData.push(item.total) : this.creditData.push(item.total);
            this.timeData.push(item.createdAt);
            this.salesData.push(item.total);
            this.colordata.push(this.getRandomColor());
            this.colordata.push(item.colorcode ? item.colorcode : "green"); 
          });
          const cash = this.cashData.reduce((a: any, b: any) => a + b, 0);
          const credit = this.creditData.reduce((a: any, b: any) => a + b, 0);

          this.RenderChart(this.timeData, this.salesData, this.colordata, 'bar', 'barchart');
          this.RenderChart([`cash ${cash}`, `credit ${credit}`], [cash, credit], [this.getRandomColor(), this.getRandomColor()], 'pie', 'piechart');
        }
      },
      error: (err) => console.log(err)
    });
  }
  getRandomColor() {
    const r = Math.floor(Math.random() * 256); // Random red value between 0 and 255
    const g = Math.floor(Math.random() * 256); // Random green value between 0 and 255
    const b = Math.floor(Math.random() * 256); // Random blue value between 0 and 255
    return `rgb(${r}, ${g}, ${b})`; // Return the color in RGB format
  }
  
  formatDateToMonth(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  formatTotal(total: number): string {
    if (total < 1000) {
      return total.toString();
    } else if (total < 1000000) {
      return (total / 1000).toFixed(1) + 'k';
    } else {
      return (total / 1000000).toFixed(1) + 'm';
    }
  }

  RenderChart(timeData: any[], salesData: any[], colordata: any[], type: any, id: string) {
    const ctx = document.getElementById(id) as HTMLCanvasElement;
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: timeData,
        datasets: [{
          label: 'Total Sales',
          data: salesData,
          backgroundColor: colordata,
          borderColor: colordata.map(color => color),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
            y: {
              beginAtZero: true
            }
        }
      }
    });
  }

}