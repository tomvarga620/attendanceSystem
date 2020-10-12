import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthUserGuard } from 'src/guards/auth-user.guard';
import { LoginAccessGuard } from 'src/guards/login-access.guard';
import { RegistrationComponent } from 'src/modules/admin-home/registration/registration.component';
import { Roles } from './entity/Roles';
import { LoginComponent } from './login/login.component';

const routes: Routes = [

  {path: 'adminboard', loadChildren: () => import('../modules/admin-home/admin-home.module')
  .then(module => module.AdminHomeModule), canActivate: [AuthUserGuard], data: {role: Roles.ADMIN}},

  {path: 'userboard', loadChildren: () => import('../modules/base-user-home/base-user-home.module')
  .then(module => module.BaseUserHomeModule), canActivate: [AuthUserGuard], data: {role: Roles.USER}}

  // ,{path: '**', }
  , {path: 'login', component: LoginComponent, canLoad: [LoginAccessGuard] , canActivate: [LoginAccessGuard]},

  {path: 'registration', component: RegistrationComponent, canActivate: [AuthUserGuard], data: {role: 'ADMIN'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
