import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validate-form.helper';
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
    private auth: AuthService, 
    private formBuilder: FormBuilder, 
    private router: Router,
    private toast: NgToastService,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required ],
      password: ['', Validators.required ],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      this.auth.login(this.loginForm.value)
        .subscribe({
          next: res => {
            this.loginForm.reset();
            this.showSuccess(username.concat(' login success...'));
            this.router.navigate(['/api/hello']);
          },
          error: err => this.showError(err.error.message),
        });
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

  showSuccess(msg: string) {
    this.toast.success({ detail: "SUCCESS", summary: msg, sticky: true });
  }

  showError(msg: string) {
    this.toast.error({ detail: "ERROR", summary: msg, duration: 5000 });
  }

  showInfo() {
    this.toast.info({ detail: "INFO", summary: 'Your Info Message', sticky: true });
  }

  showWarn() {
    this.toast.warning({ detail: "WARN", summary: 'Your Warn Message', duration: 5000 });
  }

}
