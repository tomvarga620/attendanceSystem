import { Injectable } from '@angular/core';
import { Action, Select, Selector, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, mapTo, tap } from 'rxjs/operators';
import { LoginResult, UserService } from '../../services/user.service';
import { Login, Logout, UserAuth } from './auth.actions';


@State<UserAuth>({
    name: 'userAuth',
    defaults: {
        token: null,
        username: null,
        role: null
    }
})
@Injectable()
export class AuthState {

    @Selector()
    static isAuthenticated(current: UserAuth): boolean {
        return !!current.token;
    }

    @Selector()
    static token(state: UserAuth): string | null {
        return state.token;
    }

    @Selector()
    static isAdmin(current: UserAuth): boolean {
        return current.role === `ADMIN` ? true : false;
    }

    @Selector()
    static userRole(current: UserAuth): string {
        return current.role;
    }

    constructor(private userService: UserService){}

    @Action(Login)
    login(ctx: StateContext<UserAuth>, action: Login) {
        return this.userService.login(action.username, action.password).pipe(
             tap((result: { token: string, role: string }) => {
                 ctx.patchState({
                    username: action.username,
                    token: result.token,
                    role: result.role
                 });
             })
        );
    }

    @Action(Logout)
    logout(ctx: StateContext<UserAuth>){
        const token = ctx.getState().token;
        return this.userService.logout(token).pipe(
            tap( () => {
                ctx.setState({
                    token: null,
                    username: null,
                    role: null
                });
            })
        );
    }
}
