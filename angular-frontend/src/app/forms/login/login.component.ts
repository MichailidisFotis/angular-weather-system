import { Component, inject, OnInit } from '@angular/core';
import { InitialNavbarComponent } from "../../general-components/initial-navbar/initial-navbar.component";
import { FormsModule, NgForm } from '@angular/forms';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';



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
  loginService  = inject(LoginService);

  router!:Router;


login(form: NgForm) {

  // if(form.form.value.email.trim() ==''){
  //   this.errMessage = 'email is missing'
  //   this.error = true;
  // }

  var user = {
    username:form.form.value.username,
    password:form.form.value.password
  }

  this.loginService.login(user).subscribe(
    {
      next:((response)=>{

        //!ADD JWT handling!!!!!!!!!!!!!!!!!!!!!!!

        // console.log(this.router)

        //this.router.navigate(["/user/my-cities"]);

        window.location.href = '/user/my-cities'; // Redirects to a new route

      }),
      error:((err)=>{

        this.error = true;
        this.errMessage= err.message ??'Login interapted'

        window.scrollTo({
          top:0,
          behavior:'smooth'
        }); // Scroll to top after navigation

      })
    }
  )



}

}
