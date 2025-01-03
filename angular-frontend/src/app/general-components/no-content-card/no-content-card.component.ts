import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-no-content-card',
  standalone: true,
  imports: [CardModule],
  templateUrl: './no-content-card.component.html',
  styleUrl: './no-content-card.component.css'
})
export class NoContentCardComponent {

}
