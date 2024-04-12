import { Component } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { HttpClientModule } from '@angular/common/http';
import { GeneralMethods } from '../../functions';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  providers:[TicketService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  ticketCount = 0;
  constructor(private service: TicketService) { }

  ngOnInit(): void {
    this.service.getTickets().subscribe({
      next: (data) => this.ticketCount = GeneralMethods.CastTickets(data).length,
      error: (err) => console.log(err)
    });
  }
}
