import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = {
    email: '',
    password:''
  }
  errorMessage: string = ''; 
  singIn(){
    this.authService.singIn(this.user).subscribe(
      (res: any) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/tasks']);
      },
      (err: any) => {
        console.log(err);
        this.errorMessage = err.error;
      }
    );
  }
  constructor(private authService:AuthService,
    private router:Router
  ){}
}
