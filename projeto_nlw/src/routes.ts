import { Router } from 'express'
import { SettingsController } from './controller/SettingsController';

const routes = Router();

const SettingscController = new SettingsController();

routes.post("/settings", SettingscController.create);

export { routes };


/*
* Tipos de parâmetros
* Routes Params => Parametros de rotas
* http://localhost:3333/settings/1
*
* Query Params => Filtros e buscas
* http://localhost:3333/settings/1?search=algumacoisa&
*
* Body params => {passa objetos (json)}
*/