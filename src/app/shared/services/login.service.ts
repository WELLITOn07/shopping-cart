import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  users: Array<User> = [];

  login(username: string, password: string) {
    const usersLocalStorage = localStorage.getItem('users');
    const users = JSON.parse(usersLocalStorage);
    if (users) {
      for (let search of users) {
        if (search.username === username && search.passsword === password) {
          const userLogin = sessionStorage.setItem('userLogin', username);
          this.router.navigateByUrl('home');
        } else {
          return window.alert('Usuário não encontrado!')
        }
      }
    } else {
      window.alert('Usuário não encontrado!');
    }
  };

  register(newUser: User) {
    let userRegistered: boolean = false;
    const usersLocalStorage = localStorage.getItem('users');
    if (usersLocalStorage) {
      const usersEmail = JSON.parse(usersLocalStorage);
      this.users = [];
      for (let email of usersEmail) {
        this.users.push(email);
      }
      for (let user of this.users) {
        if (user.email === newUser.email) {
          window.alert('Email já cadastrado!');
          userRegistered = true;
          break;
        }
      }

      if (!userRegistered) {
        this.users.push(newUser);
        localStorage.removeItem('users');
        const createUsersLocalStorage = localStorage.setItem('users', JSON.stringify(this.users));
        window.alert('Cadastrado com sucesso!');
        this.router.navigateByUrl('login');
      };

    } else {
      this.users.push(newUser);
      const createUsersLocalStorage = localStorage.setItem('users', JSON.stringify(this.users));
      window.alert('Cadastrado com sucesso!');
      this.router.navigateByUrl('login');
    };
  };//end

  constructor(private router: Router) { }
}; //end
