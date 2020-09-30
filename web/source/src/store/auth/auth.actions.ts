export class UserAuth {
    name: string | null;
    token: string | null;
    role: string | null;
}

export class Login {
    static readonly type = `[Login Main] Login`;
    constructor(public email: string, public password: string) {}
}

export class Logout {
    static readonly type = `[Logout Topbar] Logout`;
}
