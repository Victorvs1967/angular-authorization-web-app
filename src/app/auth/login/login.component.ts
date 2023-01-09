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

  loginForm: FormGroup;
  type: string = 'password';
  slash: string = '-slash';

  constructor(
    private formBuilder: FormBuilder, 
    private auth: AuthService, 
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required ],
      password: ['', Validators.required ],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value)
        .subscribe({
          next: res => alert(res),
          error: err => alert(err.error.message)
        });
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
