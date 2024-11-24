import { Component } from '@angular/core';
import { InitialNavbarComponent } from "../../general-components/initial-navbar/initial-navbar.component";
import { FormsModule, NgForm } from '@angular/forms';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';



@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [InitialNavbarComponent, FormsModule , MessagesModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  error!:boolean;
  errMessage !:string;

  successfulRegistration!:boolean;
  successMessage!:string;




  register(form: NgForm) {

  }



}
