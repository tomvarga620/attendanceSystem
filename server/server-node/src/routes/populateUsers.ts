import { User } from "../model/User";

export const addAdmin = (usersArr: User[], user: User) => {
    usersArr.push(user)
}