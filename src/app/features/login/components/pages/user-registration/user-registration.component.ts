import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  userRegisterForm = new FormGroup ({
    email: new FormControl ('', { nonNullable: true, validators: [Validators.required]}),
    username: new FormControl ('', { nonNullable: true, validators: [Validators.required]}),
    password: new FormControl ('', { nonNullable: true, validators: [Validators.required]})
  });

  constructor(private router: Router, private loginService: LoginService) { }

  hide: boolean = true;

  ngOnInit(): void {
  }


  register() {
    const email = this.userRegisterForm.value.email;
    const username = this.userRegisterForm.value.username;
    const password = this.userRegisterForm.value.password;
    const newUser: User = {
        email: email,
        username: username,
        passsword: password
    };
    this.loginService.register(newUser);
  };

  navegateLogin (url: string) {
    this.router.navigateByUrl(url);
  };

}; //end
