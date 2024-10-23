import { Router } from "express";
import prodprep from "../controllers/ProdPrepController";
const routes = Router();
-
routes.post('/', prodprep.create);
routes.get('/', prodprep.list);
routes.delete('/', prodprep.delete);
routes.put('/', prodprep.update);

export default routes;