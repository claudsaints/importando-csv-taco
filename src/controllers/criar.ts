
import query from './db';

async function criar() {
    try {

        await query(`
            drop table if exists grupo,preparacao,produto,prodpep;
            CREATE TABLE grupo (
                id INT PRIMARY KEY,
                gru_descricao VARCHAR NOT NULL
            );

            
            CREATE TABLE preparacao (
                id INT PRIMARY KEY,
                pre_descricao VARCHAR NOT NULL
            );

            
            CREATE TABLE produto (
                id INTEGER PRIMARY KEY,
                pro_descricao VARCHAR NOT NULL,
                pro_grupo INTEGER NOT NULL,
                FOREIGN KEY (pro_grupo) REFERENCES grupo (id)
            );

            
            CREATE TABLE prodprep (
                id SERIAL PRIMARY KEY,
                pp_produto INTEGER NOT NULL,
                pp_preparacao INTEGER NOT NULL,
                pp_energia FLOAT,
                pp_proteina FLOAT,
                pp_lipidios FLOAT,
                pp_carboidrato FLOAT,
                pp_fibra FLOAT,
                pp_colesterol FLOAT,
                pp_agsaturado FLOAT,
                pp_agmono FLOAT,
                pp_agpoli FLOAT,
                pp_aglinoleico FLOAT,
                pp_aglinolenico FLOAT,
                pp_agtranstotal FLOAT,
                pp_acucartotal FLOAT,
                pp_acucaradicao FLOAT,
                pp_calcio FLOAT,
                pp_magnesio FLOAT,
                pp_manganes FLOAT,
                pp_fosforo FLOAT,
                pp_ferro FLOAT,
                pp_sodio FLOAT,
                pp_sodioadicao FLOAT,
                pp_potassio FLOAT,
                pp_cobre FLOAT,
                pp_zinco FLOAT,
                pp_selenio FLOAT,
                pp_retinol FLOAT,
                pp_vitamina_a FLOAT,
                pp_tiamina FLOAT,
                pp_riboflavina FLOAT,
                pp_niacina FLOAT,
                pp_niacina_ne FLOAT,
                pp_piridoxina FLOAT,
                pp_cobalamina FLOAT,
                pp_folato FLOAT,
                pp_vitamina_d FLOAT,
                pp_vitamina_e FLOAT,
                pp_vitamina_c FLOAT,
                FOREIGN KEY (pp_produto) REFERENCES produto(id),
                FOREIGN KEY (pp_preparacao) REFERENCES preparacao(id)
            );

        `)

        console.log("banco criado com sucesso");
    } catch (err) {
        console.log("erro ao criar banco: ", err)
    }
}

criar();