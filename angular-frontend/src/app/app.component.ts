import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InitialNavbarComponent } from './general-components/initial-navbar/initial-navbar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , InitialNavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-frontend';


}
