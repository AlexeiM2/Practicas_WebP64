import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  user = {
    email: '',
    password:''
  }
  singUp(){
    this.authService.singUp(this.user)
    .subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.token);
        this.router.navigate(['/private-tasks'])
      },
      err => console.log(err)
    )
  }
  constructor(private authService:AuthService,
    private router:Router
  ){}
}
