import { Component, OnInit } from '@angular/core';
import { InitialNavbarComponent } from "../../general-components/initial-navbar/initial-navbar.component";
import { FormsModule, NgForm } from '@angular/forms';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InitialNavbarComponent,FormsModule,MessagesModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{

  error!:boolean;
  errMessage!:string;
  messages :Message[] |undefined;



login(form: NgForm) {

  if(form.form.value.email.trim() ==''){
    this.errMessage = 'email is missing'
    this.error = true;
  }

  if(form.form.value.password.trim() ==''){
    this.errMessage = 'password is missing '
    this.error = true;
  }

  if (form.form.value.password.trim()=='' && form.form.value.email.trim() =='') {
        this.errMessage = 'You have to add both credentials to login ';
        this.error = true;
  }

  if (form.form.value.password.trim()!='' && form.form.value.email.trim() !='') {
    this.errMessage = 'both';
    this.error = false;
  }


}

}
