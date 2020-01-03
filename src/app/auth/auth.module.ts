import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
