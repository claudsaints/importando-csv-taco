import { Router } from "express";
import preparacao from "../controllers/PreparacaoController";
const routes = Router();

routes.post('/', preparacao.create);
routes.get('/', preparacao.list);
routes.delete('/', preparacao.delete);
routes.put('/', preparacao.update);

export default routes;