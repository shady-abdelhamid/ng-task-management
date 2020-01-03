import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: 'tm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  messagePerErrorCode = {
    loginfailed: "Invalid credentials"
  };

  errors = [];

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

    this.form = this.fb.group({
      username: ['test', Validators.required],
      password: ['P@ssw0rd', Validators.required]
    });

  }

  ngOnInit() {

  }

  login() {

    const val = this.form.value;

    if (val.username && val.password) {

      this.authService.login(val.username, val.password)
        .subscribe(
          () => {
            console.log("User is logged in");
            this.router.navigateByUrl('/');
          }
        );

    }


  }

}








