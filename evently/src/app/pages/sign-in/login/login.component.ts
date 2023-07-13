import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

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
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // Getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.loading = true;

    if (this.form.invalid) {
      return;
    }

    console.log(this.f);
    // this.auth.login(this.f, this.f['password'].errors);

    alert('Can Login...');
    // this.router.navigateByUrl('dashboard');
  }
}
