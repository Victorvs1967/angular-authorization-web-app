import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validate-form.helper';
import { LoginInfo } from 'src/app/models/login.info.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  type: string = 'password';
  slash: string = '-slash';
  
  loginForm?: FormGroup;

  constructor(
    private auth: AuthService, 
    private formBuilder: FormBuilder, 
  ) {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required ],
      password: ['', Validators.required ],
    });
  }

  onSubmit() {
    if (this.loginForm?.valid) {
      const user: LoginInfo = { username: this.loginForm.value.username, password: this.loginForm.value.password };
      this.auth.login(user)
        .subscribe(() => console.log(sessionStorage.getItem('token')));
      this.loginForm.reset();
    } else if (this.loginForm) {
      ValidateForm.validateAllFormFields(this.loginForm);
      alert('Your form is invalid.');
    }
  }

  hideShowPass() {
    const isPass: boolean = this.type === 'password';
    this.type = isPass ? 'text' : 'password';
    this.slash = isPass ? '' : '-slash';
  }
}
