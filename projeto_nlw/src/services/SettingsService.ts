import { getCustomRepository } from "typeorm";
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

    async create({ chat, username }: ISettingsCreate) {
        const settingsRepository = getCustomRepository(SettingsRepository);

        //SELECT * FROM settings WHERE username = "username" limit 1;
        //Procura o nome no cadastro e valida se já possui 1
        const userAlreadyExists = await settingsRepository.findOne({
            username
        });

        //Ao passar um throw, é necessário repassar ao controller para que seja exibida a mensagem do erro (camada onde está sendo utilizado)
        //caso contrário o Post ficará apenas carregando.
        //utilizado o try{}catch(){}
        if (userAlreadyExists) {
            throw new Error("User already exists!") //Valida se o nome acima procurado no banco já existe.
        }

        const settings = settingsRepository.create({
            chat,
            username,
        });

        await settingsRepository.save(settings);
        return settings;
    }
}

export { SettingsService }