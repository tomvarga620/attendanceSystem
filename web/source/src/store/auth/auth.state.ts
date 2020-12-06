import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Select, Selector, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, mapTo, tap } from 'rxjs/operators';
import { User } from 'src/app/entity/User';
import { LoginResult, UserService } from '../../services/user.service';
import { Login, Logout, UserAuth } from './auth.actions';


@State<UserAuth>({
    name: 'userAuth',
    defaults: {
        token: null,
        username: null,
        role: null,
        id: null
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

    @Selector()
    static userId(current: UserAuth): number {
        return current.id;
    }

    constructor(private userService: UserService, private router: Router){}

    @Action(Login)
    login(ctx: StateContext<UserAuth>, action: Login) {
        return this.userService.login(action.username, action.password).pipe(
             tap((result: { token: string, role: string, id: number }) => {
                 ctx.patchState({
                    username: action.username,
                    token: result.token,
                    role: result.role,
                    id: result.id
                 });
             })
        );
    }

    @Action(Logout)
    logout(ctx: StateContext<UserAuth>) {
        const token = ctx.getState().token;
        if (token){
            return this.userService.logout(token).pipe(
                tap( () => {
                    ctx.setState({
                        token: null,
                        username: null,
                        role: null,
                        id: null
                    });
                })
            );
        }
    }


}
