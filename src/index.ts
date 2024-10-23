import express from "express";
import routes from './routes';
import dotenv from "dotenv";
import fs from "fs";
import readline from "node:readline";
import Grupo from "./models/Grupo";
import Preparacao from "./models/Preparacao";
import Produto from "./models/Produto";
import query from "./controllers/db";
import Prodprep from "./models/ProdPrep";

dotenv.config();

// será usado 3000 se a variável de ambiente não tiver sido definida
const PORT = process.env.PORT || 3000;
const app = express(); // cria o servidor e coloca na variável app

// suportar parâmetros JSON no body da requisição
app.use(express.json());

// inicializa o servidor na porta especificada
const server = app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});

server.keepAliveTimeout = 61 * 1000;

// define a rota para o pacote /routes
app.use(routes);

// importando tabela grupo
var rl = readline.createInterface({
    input: fs.createReadStream('./src/Taco-Grupo.csv'),
    output: process.stdout,
    terminal: false
}) // cria a interface para leitura do arquivo assyncrona

let x: number = 0; // variável necessária para pular a primeira linha de cabeçalho do arquivo CSV

rl.on('line', function (linha: any) { // função que lê linha a linha do arquivo e as colaca na variável linha
    if (x > 0) { // só processa se não for a primeira linha
        var l = linha.split(';'); // quebra a linha nos pontos-e-vírgula gerando um array com cada campo/coluna
        console.log(l); // mostra o objeto que será gravado no BD
        const g = new Grupo(l[0], l[1]); // instancia um objeto do Modelo a ser usado
        fetch('http://localhost:3001/grupo', {  // cria conexão HTTP com post para salvar o objeto no BD
            method: 'POST', // tipo de requisição
            headers: { // cabeçalho da requisição
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ // corpo da requisição convertido para JSON
                id: g.id,
                gru_descricao: g.gru_descricao
            })
        })
            .then(response => response.json()) // resposta do backend
            .then(data => {
                console.log(data); // a rotina retorna o ID do objeto cadastrado
            })
            .catch(error => {
                console.error("Erro Grupo",error); // mostra erro casso ocorra
            });
    }
    x++; // incrementa a varíavel de controle de linha
})

rl.close; // fecha a função rl para o arquivo não constar como aberto pelo SO

// importando tabela preparacao
var rl = readline.createInterface({
    input: fs.createReadStream('./src/Taco-Preparacao.csv'),
    output: process.stdout,
    terminal: false
}) // cria a interface para leitura do arquivo assyncrona

let y: number = 0; // variável necessária para pular a primeira linha de cabeçalho do arquivo CSV

rl.on('line', function (linha: any) { // função que lê linha a linha do arquivo e as colaca na variável linha
    if (y > 0) { // só processa se não for a primeira linha
        var l = linha.split(';'); // quebra a linha nos pontos-e-vírgula gerando um array com cada campo/coluna
        console.log(l); // mostra o objeto que será gravado no BD
        const p = new Preparacao(l[0], l[1]); // instancia um objeto do Modelo a ser usado
        fetch('http://localhost:3001/preparacao', {  // cria conexão HTTP com post para salvar o objeto no BD
            method: 'POST', // tipo de requisição
            headers: { // cabeçalho da requisição
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ // corpo da requisição convertido para JSON
                id: p.id,
                pre_descricao: p.pre_descricao
            })
        })
            .then(response => response.json()) // resposta do backend
            .then(data => {
                console.log(data); // a rotina retorna o ID do objeto cadastrado
            })
            .catch(error => {
                console.error("Erro preparação: ",error); // mostra erro casso ocorra
            });
    }
    y++; // incrementa a varíavel de controle de linha
})

rl.close; // fecha a função rl para o arquivo não constar como aberto pelo SO

// importando tabela produtos

const data = fs.readFileSync('./src/Taco-Produto.csv',
    { encoding: 'utf8', flag: 'r' }).toString().split("\r\n"); // lê e fecha o arquivo CSV de Produtos, 
// colocando os dados na variável data linha a linha

let w: number = 0; // variável necessária para pular a primeira linha de cabeçalho do arquivo CSV

data.forEach(linha => { // faz a leitura de cada linha da variável data
    if (w > 0) { // só processa se não for a primeira linha
        var l = linha.split(';'); // quebra a linha nos pontos-e-vírgula gerando um array com cada campo/coluna
        console.log(l);
        const p = new Produto(parseInt(l[0]), l[1], parseInt(l[2])); // instancia um objeto do Modelo a ser usado
        try{
            const r: any = query( // cria a query direta, sem passar pelas rotas
                "INSERT INTO produto(id, pro_descricao, pro_grupo) VALUES ($1,$2,$3)",
                [p.id, p.pro_descricao, p.pro_grupo]
            );

        }catch(err){
            console.log("erro produto:",err);

        }
    }
    w++; // incrementa a varíavel de controle de linha
}); // fecha data.forEach


var rl = readline.createInterface({
    input: fs.createReadStream('./src/Taco-ProdPrep.csv'),
    output: process.stdout,
    terminal: false
});

let i = 0;

rl.on('line', function (linha) {
    if (i > 0) { // Ignorar a linha de cabeçalho
        var l = linha.split(';');

        console.log(l)
        console.log(l.length)
        
        // Conversão de vírgulas para pontos
        const energia = parseFloat(l[3].replace(',', '.'));
        const proteina = parseFloat(l[4].replace(',', '.'));
        const lipidio = parseFloat(l[5].replace(',', '.'));
        const carboidrato = parseFloat(l[6].replace(',', '.'));
        const fibra = parseFloat(l[7].replace(',', '.'));
        const colesterol = parseFloat(l[8].replace(',', '.'));
        const agsaturado = parseFloat(l[9].replace(',', '.'));
        const agmono = parseFloat(l[10].replace(',', '.'));
        const agpoli = parseFloat(l[11].replace(',', '.'));
        const aglinoleico = parseFloat(l[12].replace(',', '.'));
        const aglinolenico = parseFloat(l[13].replace(',', '.'));
        const agtranstotal = parseFloat(l[14].replace(',', '.'));
        const acucartotal = parseFloat(l[15].replace(',', '.'));
        const acucaradicao = parseFloat(l[16].replace(',', '.'));
        const calcio = parseFloat(l[17].replace(',', '.'));
        const magnesio = parseFloat(l[18].replace(',', '.'));
        const manganes = parseFloat(l[19].replace(',', '.'));
        const fosforo = parseFloat(l[20].replace(',', '.'));
        const ferro = parseFloat(l[21].replace(',', '.'));
        const sodio = parseFloat(l[22].replace(',', '.'));
        const sodioadicao = parseFloat(l[23].replace(',', '.'));
        const potassio = parseFloat(l[24].replace(',', '.'));
        const cobre = parseFloat(l[25].replace(',', '.'));
        const zinco = parseFloat(l[26].replace(',', '.'));
        const selenio = parseFloat(l[27].replace(',', '.'));
        const retinol = parseFloat(l[28].replace(',', '.'));
        const vitamina_a = parseFloat(l[29].replace(',', '.'));
        const tiamina = parseFloat(l[30].replace(',', '.'));
        const riboflavina = parseFloat(l[31].replace(',', '.'));
        const niacina = parseFloat(l[32].replace(',', '.'));
        const niacina_ne = parseFloat(l[33].replace(',', '.'));
        const piridoxina = parseFloat(l[34].replace(',', '.'));
        const cobalamina = parseFloat(l[35].replace(',', '.'));
        const folato = parseFloat(l[36].replace(',', '.'));
        const vitamina_d = parseFloat(l[37].replace(',', '.'));
        const vitamina_e = parseFloat(l[38].replace(',', '.'));
        const vitamina_c = parseFloat(l[39].replace(',', '.'));

        // Verifique se a preparacao existe
        fetch(`http://localhost:3001/preparacao/`)
            .then(response => response.json())
            .then(preparacao => {
                if (preparacao) { // Se a preparação existe
                    fetch('http://localhost:3001/prodprep', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: parseInt(l[0]),
                            pp_produto: parseInt(l[1]),
                            pp_preparacao: parseInt(l[2]),
                            pp_energia: energia,
                            pp_proteina: proteina,
                            pp_lipidios: lipidio,
                            pp_carboidrato: carboidrato,
                            pp_fibra: fibra,
                            pp_colesterol: colesterol,
                            pp_agsaturado: agsaturado,
                            pp_agmono: agmono,
                            pp_agpoli: agpoli,
                            pp_aglinoleico: aglinoleico,
                            pp_aglinolenico: aglinolenico,
                            pp_agtranstotal: agtranstotal,
                            pp_acucartotal: acucartotal,
                            pp_acucaradicao: acucaradicao,
                            pp_calcio: calcio,
                            pp_magnesio: magnesio,
                            pp_manganes: manganes,
                            pp_fosforo: fosforo,
                            pp_ferro: ferro,
                            pp_sodio: sodio,
                            pp_sodioadicao: sodioadicao,
                            pp_potassio: potassio,
                            pp_cobre: cobre,
                            pp_zinco: zinco,
                            pp_selenio: selenio,
                            pp_retinol: retinol,
                            pp_vitamina_a: vitamina_a,
                            pp_tiamina: tiamina,
                            pp_riboflavina: riboflavina,
                            pp_niacina: niacina,
                            pp_niacina_ne: niacina_ne,
                            pp_piridoxina: piridoxina,
                            pp_cobalamina: cobalamina,
                            pp_folato: folato,
                            pp_vitamina_d: vitamina_d,
                            pp_vitamina_e: vitamina_e,
                            pp_vitamina_c: vitamina_c
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.error) {
                            console.log(`Erro ao inserir prodprep: ${data.error.message}`);
                        } else {
                            console.log(data);
                        }
                    })
                    .catch(error => {
                        console.error("Erro prodprep:", error);
                    });
                } else {
                    console.log(`Preparação com ID ${l[1]} não encontrada.`);
                }
            })
            .catch(error => {
                console.error("Erro ao verificar preparação:", error);
            });
    }
    i++;
});



console.log("Produtos importados...");
