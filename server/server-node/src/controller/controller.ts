import { getConnection, getRepository } from "typeorm";
import { UserTemp } from "../entity/UserTemp";

// TODO tu urobiť operacie s databazou

export const saveUser = async (user: UserTemp) => {
    await getConnection().getRepository(UserTemp).save(user);
}

export const getUser = async (name: string) => {
    //const result = await getConnection().getRepository(UserTemp).findOne(name)
    const result = await getConnection()
    .getRepository(UserTemp)
    .createQueryBuilder("user_temp")
    .where("user_temp.username = :name", {name})
    .getOne();

    return result;
}