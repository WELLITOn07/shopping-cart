import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLoginForm = new FormGroup ({
    username: new FormControl ('', { nonNullable: true,}),
    password: new FormControl ('', { nonNullable: true,})
  });

  constructor(private router: Router, private loginService: LoginService) { }

  hide: boolean = true;

  ngOnInit(): void {
  }

  login() {
    const obs = new Observable (subscriber => {
      const username = this.userLoginForm.value.username;
      const password = this.userLoginForm.value.password;
      if (username && password) {
        subscriber.next(this.loginService.login(username, password))
        subscriber.complete();
      } else {
        subscriber.error(window.alert('Preencha os dados!'))
      }
    })
    obs.subscribe();
  };

  navegateRegister (url: string) {
    this.router.navigateByUrl(url)
  };

}; //end
