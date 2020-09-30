import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { AuthState } from 'src/store/auth/auth.state';
import { environment } from 'src/environments/environment';

const states = [AuthState];

@NgModule({
  imports: [
    NgxsModule.forRoot([AuthState]),
    NgxsStoragePluginModule.forRoot({
      key: 'userAuth.token'
    })
  ]
})
export class AppNgxsModule { }
