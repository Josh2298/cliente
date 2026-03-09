import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  login(){

    if(this.loginForm.invalid) return;

    const formValue = this.loginForm.getRawValue();
    this.auth.login(formValue).subscribe({
      next: (res:any)=>{
        if(res.user.rol === 'admin'){
          this.router.navigate(['/usuario']);
        }else{
          this.router.navigate(['/cliente']);
        }
      },
      error: (err)=>{
        alert("Credenciales incorrectas");
      }
    });
  }
}