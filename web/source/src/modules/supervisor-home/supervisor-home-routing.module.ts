import { UserDetailComponent } from './user-detail/user-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserListComponent } from './user-list/user-list.component';
import { DeactivateGuard } from 'src/guards/deactivate.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'usersList', component: UserListComponent},
  { path: 'registration', component: RegistrationComponent, canDeactivate: [DeactivateGuard]},
  { path: 'usersList/user/:id', component: UserDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupervisorHomeRoutingModule { }
