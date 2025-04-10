import { Component } from '@angular/core';
import { JsonService } from '../services/json.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router ,RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule ,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  users: any = []
  fb: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    pwd: new FormControl('', Validators.required)
  })
  onLogin() {
    if (this.fb.valid) {
      let username = this.fb.controls['username'].value
      let pwd = this.fb.controls['pwd'].value
      let flag: boolean = false;
      for (let index = 0; index < this.users.length; index++) {
        const element = this.users[index];
        if (element.username == username && element.password == pwd) {
          flag = true;
          this.service.checkLogin(this.fb.controls['username'].value, this.fb.controls['pwd'].value)
          break;
        }
      }
      if (flag) {
        alert('Login successfull!!');
        this.router.navigate(['dashboard'])
      } else {
        alert('Login failed')
        this.fb.controls['username'].setValue('')
        this.fb.controls['pwd'].setValue('')
      }
    }
  }

  constructor(private service: JsonService ,private router:Router) {
    service.getUsers().subscribe({
      next: (val: any) => {
        this.users = val;
        console.log(this.users)
      }
    })
  }

}
