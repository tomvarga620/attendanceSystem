import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthUserGuard } from 'src/guards/auth-user.guard';
import { RedirectGuard } from 'src/guards/redirect-guard.guard';
import { DefaultHomeComponent } from './default-home/default-home.component';
import { Roles } from './helpers/Roles';
import { LoginComponent } from './login/login.component';

const routes: Routes = [

  {path: 'admin', loadChildren: () => import('../modules/admin-home/admin-home.module')
  .then(module => module.AdminHomeModule), canActivate: [AuthUserGuard], data: {role: Roles.ADMIN}},

  {path: 'user', loadChildren: () => import('../modules/base-user-home/base-user-home.module')
  .then(module => module.BaseUserHomeModule), canActivate: [AuthUserGuard], data: {role: Roles.USER}},

  {path: 'supervisor', loadChildren: () => import('../modules/supervisor-home/supervisor-home.module')
  .then(module => module.SupervisorHomeModule), canActivate: [AuthUserGuard], data: {role: Roles.SUPERVISOR}},

  {path: 'login', component: LoginComponent, canLoad: [RedirectGuard] , canActivate: [RedirectGuard]},

  {path: '', component: DefaultHomeComponent , canActivate: [RedirectGuard]},

  {path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
