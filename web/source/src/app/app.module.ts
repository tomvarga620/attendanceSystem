import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { AuthState } from 'src/store/auth/auth.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin/src/storage.module';
import { HttpClientModule } from '@angular/common/http';

const states = [AuthState];

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    FormsModule,
    MaterialModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production
    }),
/*     NgxsStoragePluginModule.forRoot({
      key: 'userAuth.token'
    }), */
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
