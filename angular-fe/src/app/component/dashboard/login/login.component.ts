import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  login() {
    // Send a POST request to the login API endpoint
    this.http.post<any>('/api/auth/login', { username: this.username, password: this.password })
      .subscribe(response => {
        // Handle successful login, e.g., store the token in localStorage
        localStorage.setItem('token', response.token);
      }, error => {
        // Handle login error
        console.error('Login failed:', error);
      });
  }
}
