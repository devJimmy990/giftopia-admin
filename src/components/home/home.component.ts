import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SideBarComponent } from '../side-bar/side-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SideBarComponent, DashboardComponent, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
