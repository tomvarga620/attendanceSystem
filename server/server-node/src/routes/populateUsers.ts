import { User } from "../entity/User";

export const addAdmin = (usersArr: User[], user: User) => {
    usersArr.push(user)
}