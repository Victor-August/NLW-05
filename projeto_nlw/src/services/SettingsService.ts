import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Settings";
import { SettingsRepository } from "../repositories/SettingsRepository";

/*
 * Validações da Regra de negócio 
 *  Exemplo (se o usuário existir, retornar uma mensagem de erro pra quem estiver cadastrando)
 */

interface ISettingsCreate {
    chat: boolean;
    username: string;
}

class SettingsService {
    private settingsRepository: Repository<Setting>;
    constructor() {
        this.settingsRepository = getCustomRepository(SettingsRepository);
    }

    async create({ chat, username }: ISettingsCreate) {

        //SELECT * FROM settings WHERE username = "username" limit 1;
        //Procura o nome no cadastro e valida se já possui 1
        const userAlreadyExists = await this.settingsRepository.findOne({
            username
        });
        //Ao passar um throw, é necessário repassar ao controller para que seja exibida a mensagem do erro (camada onde está sendo utilizado)
        //caso contrário o Post ficará apenas carregando.
        //utilizado o try{}catch(){}
        if (userAlreadyExists) {
            throw new Error("User already exists!") //Valida se o nome acima procurado no banco já existe.
        }
        const settings = this.settingsRepository.create({
            chat,
            username,
        });
        await this.settingsRepository.save(settings);
        return settings;
    }

    async findByUsername(username: string) {
        const settings = await this.settingsRepository.findOne({
            username,
        })
        return settings;
    }

    async update(username: string, chat: boolean) {
        const settings = await this.settingsRepository.createQueryBuilder().update(Setting)
            .set({ chat })
            .where("username = :username", {
                username
            }).execute();
    }
}

export { SettingsService }