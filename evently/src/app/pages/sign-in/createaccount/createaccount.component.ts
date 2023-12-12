import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/shared/auth.service';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['../sign-in.component.scss', './createaccount.component.scss'],
})
export class CreateAccountComponent {
  form!: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      displayName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  // Getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  /**
   * Registers new user and stores user data in database.
   */
  onSignUp(): void {
    this.submitted = true;
    this.loading = true;

    if (this.form.invalid) {
      this.loading = false;
      console.log('INVALID');
      return;
    }

    this.auth
      .register({
        displayName: this.f['displayName'].value,
        email: this.f['email'].value,
        password: this.f['password'].value,
        firstName: this.f['firstName'].value,
        lastName: this.f['lastName'].value,
        role: 'user',
      })
      .then(
        (res) => {
          console.log(res);
          alert('Account Created.');
          this.router.navigateByUrl('sign-in');
        },
        (err) => {
          console.log(err);
          this.loading = false;
          alert('Signed Up...' + this.f['displayName'].value);
        }
      );
  }
}
