import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLoginForm = new FormGroup ({
    username: new FormControl ('', { nonNullable: true, validators: [Validators.required]}),
    password: new FormControl ('', { nonNullable: true, validators: [Validators.required]})
  });

  constructor(private router: Router, private loginService: LoginService) { }

  hide: boolean = true;

  ngOnInit(): void {
  }

  login() {
    const username = this.userLoginForm.value.username;
    const password = this.userLoginForm.value.password;
    this.loginService.login(username, password);
  };

  navegateRegister (url: string) {
    this.router.navigateByUrl(url)
  };

}; //end
