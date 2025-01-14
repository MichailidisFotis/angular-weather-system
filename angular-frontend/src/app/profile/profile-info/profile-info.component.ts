import { Component, inject, OnInit, signal } from '@angular/core';
import { UserPreferencesListComponent } from "../user-preferences-list/user-preferences-list.component";
import { MessagesModule } from 'primeng/messages';

import { GetUserInfoService } from '../../services/getUserInfo.service';
import { EditProfileService } from '../../services/editProfile.service';
import { EditProfile } from '../../models/EditProfile.model';


@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [UserPreferencesListComponent, MessagesModule],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.css',
})
export class ProfileInfoComponent implements OnInit {
  getUserInfoService = inject(GetUserInfoService);
  editProfileService = inject(EditProfileService);

  error!: boolean;
  errMessage!: string;

  successfulEdit = false;
  successMessage: string | undefined;

  //username ?:string ;
  // firstname ?:string;
  //surname ?:string;
  //email?:string

  username = signal<string | undefined>(undefined);
  firstname = signal<string | undefined>(undefined);
  surname = signal<string | undefined>(undefined);
  email = signal<string | undefined>(undefined);

  ngOnInit(): void {

    this.getUserInfoService.getInfo().subscribe({
      next: (response) => {
        console.log('surname:'+response.body?.surname);

        // this.username =  response.body?.username;
        // this.email = response.body?.email;
        // this.firstname =  response.body?.firstname;
        // this.surname =  response.body?.surname;

        this.username.set(response.body?.username);
        this.email.set(response.body?.email);
        this.firstname.set(response.body?.firstname);
        this.surname.set(response.body?.surname);
      },
    });
  }

  updateProfile(body: EditProfile) {


    console.log('new:'+body.new_surname);

    this.editProfileService.editProfile(body).subscribe({
      next: (response) => {
        this.successfulEdit = true;
        this.error = false;
        this.successMessage = response.body?.message;

        this.username.set(body.new_username);
        this.email.set(body.new_email);
        this.surname.set(body.new_surname);
        this.firstname.set(body.new_firstname);

        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      },
      error: (err) => {
        this.error = true;
        this.errMessage = err.message ?? 'Error Registering user';
        this.successfulEdit = false;

        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      },
    });
  }
}
