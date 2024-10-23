import { Router, Request, Response } from "express";
import grupo from './grupo';
import preparacao from './preparacao';
import produto from './produto';
import prodprep from "./propdprep";

const routes = Router();

routes.use("/grupo", grupo);
routes.use("/preparacao", preparacao);
routes.use("/produto", produto);
routes.use("/prodprep", prodprep)

//aceita qualquer método HTTP ou URL


export default routes;