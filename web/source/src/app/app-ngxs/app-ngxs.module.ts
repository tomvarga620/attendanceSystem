import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { AuthState } from 'src/store/auth/auth.state';

const states = [AuthState];

@NgModule({
  imports: [
    NgxsModule.forRoot(states),
    NgxsStoragePluginModule.forRoot({
      key: ['userAuth.name', 'userAuth.token', 'userAuth.role']
    })
  ]
})
export class AppNgxsModule { }
