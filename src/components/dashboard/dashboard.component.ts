import { Component, OnInit, Output } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { HttpClientModule } from '@angular/common/http';
import { DashhboardCardComponent } from '../dashhboard-card/dashhboard-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule, DashhboardCardComponent],
  providers: [DashboardService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
 @Output() dashboard: any;
  isLoaded = false;

  constructor(private service: DashboardService) { }

  ngOnInit(): void {
    this.service.getDashboard().subscribe({
      next: (data) => { this.dashboard = data, this.isLoaded = true },
      error: (err) => console.log(err)
    });
  }
}
