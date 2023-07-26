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
      userName: ['', Validators.required],
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

  onSignUp(): void {
    this.submitted = true;
    this.loading = true;

    if (this.form.invalid) {
      console.log('INVALID');
      return;
    }

    // this.auth.login(this.f['email'].value, this.f['password'].value);

    // this.auth.register(this.f['email'].value, this.f['password'].value);
    this.auth.register(
      this.f['userName'].value,
      this.f['email'].value,
      this.f['password'].value,
      this.f['firstName'].value,
      this.f['lastName'].value
    );

    alert('Can Sign Up...');
    // alert(this.f['email'].value + this.f['password'].value);
    // this.router.navigateByUrl('dashboard');
  }
}
