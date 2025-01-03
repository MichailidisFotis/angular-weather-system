import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-user-navbar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css',
})
export class UserNavbarComponent implements  OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/user/my-cities'],


      },
      {
        label: this.username,
        icon: 'pi pi-user',
        routerLink: ['/user/profile'],

      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        routerLink: ['/user/signup'],

      },
    ];
  }
  items: MenuItem[] | undefined;

  @Input({required:true}) username!:string;

  isNavbarOpen: boolean = false;

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  // username!:string;
  // ngOnInit() {

  //   console.log('username: '+this.username);

  //   this.items = [
  //     {
  //       label: 'Home',
  //       icon: 'pi pi-home',
  //       routerLink: ['/user/my-cities'],

  //     },
  //     {
  //       label: this.username,
  //       icon: 'pi pi-sign-in',
  //       routerLink: ['/user/profile'],
  //     },
  //     {
  //       label: 'Logout',
  //       icon: 'pi pi-user-plus',
  //       routerLink: ['/user/signup'],
  //     },
  //   ];
  // }
}
