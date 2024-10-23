import { Request, Response } from "express";
import query from "./db";

class ProdprepController{
    public async create(req: Request, res: Response): Promise<Response> {
        const { 
            id,
            pp_produto,
            pp_preparacao,
            pp_energia,
            pp_proteina,
            pp_lipidios,
            pp_carboidrato,
            pp_fibra,
            pp_colesterol,
            pp_agsaturado,
            pp_agmono,
            pp_agpoli,
            pp_aglinoleico,
            pp_aglinolenico,
            pp_agtranstotal,
            pp_acucartotal,
            pp_acucaradicao,
            pp_calcio,
            pp_magnesio,
            pp_manganes,
            pp_fosforo,
            pp_ferro,
            pp_sodio,
            pp_sodioadicao,
            pp_potassio,
            pp_cobre,
            pp_zinco,
            pp_selenio,
            pp_retinol,
            pp_vitamina_a,
            pp_tiamina,
            pp_riboflavina,
            pp_niacina,
            pp_niacina_ne,
            pp_piridoxina,
            pp_cobalamina,
            pp_folato,
            pp_vitamina_d,
            pp_vitamina_e,
            pp_vitamina_c
        
        } = req.body;
        const r: any = await query(
            `INSERT INTO prodprep VALUES 
                ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40) 
            RETURNING id
            `,
            [ id,
                pp_produto,
                pp_preparacao,
                pp_energia,
                pp_proteina,
                pp_lipidios,
                pp_carboidrato,
                pp_fibra,
                pp_colesterol,
                pp_agsaturado,
                pp_agmono,
                pp_agpoli,
                pp_aglinoleico,
                pp_aglinolenico,
                pp_agtranstotal,
                pp_acucartotal,
                pp_acucaradicao,
                pp_calcio,
                pp_magnesio,
                pp_manganes,
                pp_fosforo,
                pp_ferro,
                pp_sodio,
                pp_sodioadicao,
                pp_potassio,
                pp_cobre,
                pp_zinco,
                pp_selenio,
                pp_retinol,
                pp_vitamina_a,
                pp_tiamina,
                pp_riboflavina,
                pp_niacina,
                pp_niacina_ne,
                pp_piridoxina,
                pp_cobalamina,
                pp_folato,
                pp_vitamina_d,
                pp_vitamina_e,
                pp_vitamina_c ]
        );
        return res.json({"ProdPrep Message":r});
    }

    public async list(_: Request, res: Response): Promise<Response> {
        const r: any = await query(
            "SELECT * FROM prodprep"
        );
        return res.json(r);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.body; // id do registro a ser excluído
        const r: any = await query(
            "DELETE FROM prodprep WHERE id = $1", [id]
        );
        return res.json(r);
    }
    public async update(req: Request, res: Response): Promise<Response> {
        const { id, pre_descricao } = req.body;
        const r: any = await query(
            "UPDATE prodprep SET pre_descricao=$2 WHERE id=$1",
            [id, pre_descricao]
        );
        return res.json(r);
    }
}

export default new ProdprepController();