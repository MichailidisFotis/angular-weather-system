import { Component, inject } from '@angular/core';
import { InitialNavbarComponent } from '../../general-components/initial-navbar/initial-navbar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { RegisterService } from '../../services/register.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [InitialNavbarComponent, FormsModule, MessagesModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  error!: boolean;
  errMessage !:  string ;

  successfulRegistration  =  false;
  successMessage: string|undefined;

  registerService = inject(RegisterService);
  // viewportScroller: any;




  register(form: NgForm) {
    var register_user = form.form.value;

    //  console.log(register_user);
    this.registerService.register(register_user).subscribe({
      next:((response)=>{

        console.log(response['body']);

        if(response.status ==201){
          this.successfulRegistration=true;
          this.error = false;
          this.successMessage = response.body?.message
          window.scrollTo({
            top:0,
            behavior:'smooth'
          }); // Scroll to top after navigation
        }

          console.log(response.status)
          this.error = true;
          this.errMessage= response.body?.message ??'Error Registering user'
          this.successfulRegistration=false;


      }),
      error:(err)=>{
        this.error = true;
        this.errMessage= err.message ??'Error Registering user'
        this.successfulRegistration=false;


        window.scrollTo({
          top:0,
          behavior:'smooth'
        }); // Scroll to top after navigation
      }
    });
  }





}
