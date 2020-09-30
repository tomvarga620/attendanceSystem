import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { Login, Logout, UserAuth } from './auth.actions';


@State<UserAuth>({
    name: 'userAuth',
    defaults: {
        token: null,
        name: null
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

    constructor(private userService: UserService){}

    @Action(Login)
    login(ctx: StateContext<UserAuth>, action: Login){
        return this.userService.login(action.email, action.password).pipe(
             tap( result => {
                 ctx.setState({
                    name: result.name,
                    token: result.token
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
                    name: null
                });
            })
        );
    }
}
