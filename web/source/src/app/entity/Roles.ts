export class Roles {
    static readonly ADMIN = 'ADMIN';
    static readonly SUPERVISOR = 'SUPERVISOR';
    static readonly USER = 'USER';

    static roleArray(): string[] {
        const arr = [Roles.ADMIN, Roles.SUPERVISOR, Roles.USER];
        return arr;
    }
}
