import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashhboard-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashhboard-card.component.html',
  styleUrl: './dashhboard-card.component.css'
})
export class DashhboardCardComponent {
@Input() dashboard:any;

  constructor() { console.log(this.dashboard) }
ngOnChanges(changes: SimpleChanges) {
  console.log(this.dashboard) 
}
}
