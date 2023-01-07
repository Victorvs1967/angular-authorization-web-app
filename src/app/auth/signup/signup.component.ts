import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(private auth: AuthService, private formBuilder: FormBuilder) {
    this.signupForm = this.formBuilder.group({
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
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
          city: this.signupForm.value.address,
        },
      };

      this.auth.signup(user).subscribe(data => console.log(data));
      this.signupForm.reset();
    }
  }

  hideShowPass() {
    const isPass: boolean = this.type === 'password';
    this.type = isPass ? 'text' : 'password';
    this.slash = isPass ? '' : '-slash';
  }

}
