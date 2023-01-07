import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  type: string = 'password';
  slash: string = '-slash';

  loginForm?: FormGroup;

  constructor(private auth: AuthService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: '',
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.loginForm?.valid) {
      this.auth.login(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe(() => console.log(sessionStorage.getItem('token')));
      this.loginForm.reset();
    }
  }

  hideShowPass() {
    const isPass: boolean = this.type === 'password';
    this.type = isPass ? 'text' : 'password';
    this.slash = isPass ? '' : '-slash';
  }

}
