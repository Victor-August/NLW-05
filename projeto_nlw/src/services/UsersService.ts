import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepositories"



class UsersService {
    private usersRepository: Repository<User>

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository);
    }

    async findByEmail(email: string) {
        const user = await this.usersRepository.findOne({ email });

        return user;
    }


    async create(email: string) {

        //Verificar se o usuário existe 
        const userExists = await this.usersRepository.findOne({
            email,
        })
        //Se existir, retornar user
        if (userExists) {
            return userExists;
        }
        //Se não existir, criar e salvar no DB
        const user = this.usersRepository.create({
            email
        });

        await this.usersRepository.save(user);
        return user;
    }
}
export { UsersService }