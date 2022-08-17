import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userLogin: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const userSessionStorage = sessionStorage.getItem('userLogin');
    if (userSessionStorage) {
      this.userLogin = true;
    }
  };

  toggleMenu (event: any) {
    const nav = document.querySelector('.nav-container');
    nav?.classList.toggle('active');
  };

  navegateByUrl (url: string) {
    this.router.navigateByUrl(url)
  };

  exit() {
    sessionStorage.clear();
    this.router.navigateByUrl('login');
  };

}
