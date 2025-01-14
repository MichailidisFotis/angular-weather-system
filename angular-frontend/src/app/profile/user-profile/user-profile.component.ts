import { Component } from '@angular/core';
import { UserNavbarComponent } from "../../general-components/user-navbar/user-navbar.component";
import { ProfileInfoComponent } from "../profile-info/profile-info.component";
import { UserPreferencesListComponent } from "../user-preferences-list/user-preferences-list.component";


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [UserNavbarComponent, ProfileInfoComponent, UserPreferencesListComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

}
