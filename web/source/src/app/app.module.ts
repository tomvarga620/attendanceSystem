import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthState } from 'src/store/auth/auth.state';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from 'src/modules/material/material.module';
import { FormsValidationModule } from 'src/modules/formsvalidation/formsvalidation.module';
import { AppNgxsModule } from 'src/modules/app-ngxs/app-ngxs.module';
import { JwtInterceptor } from './interceptor/jwt-interceptor.interceptor';
import { DefaultHomeComponent } from './default-home/default-home.component';

const states = [AuthState];

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    LoginComponent,
    DefaultHomeComponent,
  ],
  imports: [
    FormsModule,
    FormsValidationModule,
    MaterialModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppNgxsModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
