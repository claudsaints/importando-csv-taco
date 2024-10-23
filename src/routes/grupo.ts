import { Router } from "express";
import grupo from "../controllers/GrupoController";
const routes = Router();
-
routes.post('/', grupo.create);
routes.get('/', grupo.list);
routes.delete('/', grupo.delete);
routes.put('/', grupo.update);

export default routes;