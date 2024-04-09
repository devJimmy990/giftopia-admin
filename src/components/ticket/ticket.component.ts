import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { HttpClientModule } from '@angular/common/http';
import { GeneralMethods } from '../../functions';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [HttpClientModule],
  providers:[TicketService],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent implements OnInit {
  Tickets: TicketModel[] = [];
  constructor(private service: TicketService) { }
  ngOnInit(): void {
    this.service.getTickets().subscribe({
      next: (data) => { this.Tickets = GeneralMethods.CastTickets(data); console.log(this.Tickets); },
      error: (err) => console.log(err)
    });
  }
}