import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-initial-navbar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './initial-navbar.component.html',
  styleUrl: './initial-navbar.component.css'
})
export class InitialNavbarComponent implements OnInit {
  items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
          {
            label: 'Login',
            icon: 'pi pi-sign-in',
            routerLink: ['/']
        },
        {
            label: 'Sign Up',
            icon: 'pi pi-user-plus',
            routerLink:["/signup"]
        }
        ]
    }
}
