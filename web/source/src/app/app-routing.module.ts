import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthAdminGuard } from 'src/guards/auth-admin.guard';
import { AuthUserGuard } from 'src/guards/auth-user.guard';
import { RegistrationComponent } from 'src/modules/home/registration/registration.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', loadChildren: () => import('../modules/home/home.module').then(module => module.HomeModule), canActivate: [AuthUserGuard]}
  // ,{path: '**', }
  , {path: 'login', component: LoginComponent},
    {path: 'registration', component: RegistrationComponent, canActivate: [ AuthUserGuard, AuthAdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
