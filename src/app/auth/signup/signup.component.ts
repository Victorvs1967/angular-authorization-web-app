import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validate-form.helper';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent {

  type: string = 'password';
  slash: string = '-slash';
  signupForm?: FormGroup;

  constructor(
    private auth: AuthService, 
    private formBuilder: FormBuilder,
  ) {

    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required ],
      password: ['', Validators.required ],
      password2: ['', Validators.required ],
      email: ['', [ Validators.required, Validators.email ] ],
      firstName: '',
      lastName: '',
      phone: '',
      apartment: '',
      street: '',
      city: '',
      country: '',
    });
  }

  signup() {
    if (this.signupForm?.valid) {
      const user: User = {
        username: this.signupForm.value.username,
        password: this.signupForm.value.password,
        email: this.signupForm.value.email,
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName,
        phone: this.signupForm.value.phone,
        address: {
          apartment: this.signupForm.value.apartment,
          street: this.signupForm.value.street,
          city: this.signupForm.value.city,
          country: this.signupForm.value.country,
        },
      };
      this.auth.signup(user).subscribe(data => console.log(data));
      this.signupForm.reset();
    } else  if (this.signupForm) {
      ValidateForm.validateAllFormFields(this.signupForm);
      alert('Your form is invalid.');
    }
  }

  hideShowPass() {
    const isPass: boolean = this.type === 'password';
    this.type = isPass ? 'text' : 'password';
    this.slash = isPass ? '' : '-slash';
  }

}
