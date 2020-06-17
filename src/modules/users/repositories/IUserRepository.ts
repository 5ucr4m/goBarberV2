import User from "../infra/typeorm/entities/Users";
import ICreateUsersDTO from '../dtos/ICreateUsersDTO';
import IFindAllProvidersDTO from "@modules/appointments/dtos/IFindAllProvidersDTO";

export default interface IUserRepository {
    findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>
    findByID(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    create(data: ICreateUsersDTO): Promise<User>;
    save(user: User): Promise<User>;
}