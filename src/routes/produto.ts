import { Router } from "express";
import produto from "../controllers/ProdutoController";
const routes = Router();
-
routes.post('/', produto.create);
routes.get('/', produto.list);
routes.delete('/', produto.delete);
routes.put('/', produto.update);

export default routes;