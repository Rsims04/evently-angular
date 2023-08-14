import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../sign-in.component.scss', './login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // Getter for easy access to form fields.
  get f() {
    return this.form.controls;
  }

  /**
   * Authenticates and logs in user
   */
  login() {
    this.submitted = true;
    this.loading = true;

    if (this.form.invalid) {
      console.log('INVALID');
      return;
    }
  
    this.auth.login({
      email: this.f['email'].value,
      password: this.f['password'].value
    })
    console.log('click');
  }
}

