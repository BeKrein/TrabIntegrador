const express = require("express");
const cors = require("cors");

const pgp = require("pg-promise")({});

const usuario = "postgres";
const senha = "111194";
const db = pgp(`postgres://${usuario}:${senha}@localhost:5432/integrador`);

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3010, () => console.log("Servidor rodando na porta 3010."));

app.get("/", (req, res) => {
    res.send("Hello, world!");
});



// db.any - 0 ou mais resultados
// db.all - retornar 1 ou mais resultados
// db.one - apenas 1 resultado
// db.none - não retorna resultado - quando atualizamos as estruturas do BD



// -------------- trabalhando com os pedidos --------------

app.get("/pedidos", async (req, res) => {
    try {
        const pedidos = await db.any("SELECT * FROM pedidos NATURAL JOIN cliente;");
        console.log("Retornando Pedidos");
        res.json(pedidos).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.get("/pedido", async (req, res) => {
    try {
        const pedidosIdp = parseInt(req.query.idp);
        console.log(`infos solicitadas de pedido idp= ${pedidosIdp}`);
        const pedido = await db.many(
            "SELECT * FROM pedidos NATURAL JOIN demanda NATURAL JOIN produto NATURAL JOIN tecido NATURAL JOIN cliente WHERE idp = $1;",
            pedidosIdp
        );
        res.json(pedido).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.get("/tec_usado", async (req, res) => {
    try {
        const pedidosIdp = parseInt(req.query.idp);
        console.log(`quantidade de tecido usada no pedido idp= ${pedidosIdp}`);
        const pedido = await db.many(
            "SELECT * FROM tec_usado WHERE idp = $1;",
            pedidosIdp
        );
        res.json(pedido).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});


// -------------- trabalhando com os tecidos --------------

app.get("/tecidos", async (req, res) => {
    try {
        const tecidos = await db.any("SELECT * FROM tecido;");
        console.log("Retornando Tecidos");
        res.json(tecidos).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.get("/tecido", async (req, res) => {
    try{
        const tecidoIdt = req.body.idt;
        console.log(`Pegando tecido ID ${tecidoIdt}`);
        db.one(
            "SELECT * FROM tecido WHERE tecido.idt = $1",
            [tecidoIdt]
        );
        res.json(logs).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.post("/addTecido", async (req,res) => {
    try{
        const tecidoIdt = req.body.idt;
        const tecidoPeso = req.body.peso;
        const tecidoCor = req.body.cor;
        const tecidoTipo = req.body.tipo;
        const tecidoFornecedor = req.body.fornecedor;
        console.log(`Adicionando Tecido com idt de ${tecidoIdt}`);
        db.none(
            "INSERT INTO tecido(idt,peso,cor,tipo,fornecedor) VALUES ($1,$2,$3,$4,$5);",
            [tecidoIdt,tecidoPeso,tecidoCor,tecidoTipo,tecidoFornecedor]
        );
    } catch (error){
        console.log(error);
        res.sendStatus(400);
    }
});

app.post("/atualizaEstoque", async (req,res) => {
    try {
        const tecidoIdt = req.body.idt;
        const tecidoQuantidade = req.body.idt;
        db.none(
            "UPDATE tecido SET peso = (peso-$1) WHERE idt = $2;",
            [tecidoQuantidade,tecidoIdt]
        );
        res.json(logs).status(200);
    } catch(error){
        console.log(error);
        res.sendStatus(400);
    }
});


// -------------- Trabalhando com os produtos --------------

app.get("/produtos", async (req, res) => {
    try {
        const produtos = await db.any("SELECT * FROM produto;");
        console.log("Retornando Produtos");
        res.json(produtos).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.post("/addProduto", async (req, res) => {
    try {
        const produtoTipo = req.body.tipoprod;
        const produtoTamanho = req.body.tamanho;
        const produtoUsoTecido = req.body.usodetecido;
        console.log(`Recebi um produto do tipo "${produtoTipo}" e tamanho "${produtoTamanho} e com ${produtoUsoTecido}"`);
        db.none(
            "INSERT INTO produto(tipoprod,tamanho,uso_de_tecido) VALUES ($1,$2,$3);"
            [produtoTipo,produtoTamanho,produtoUsoTecido]
        );
        res.json(logs).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});


// -------------- Trabalhando com os clientes --------------

app.get("/clientes", async (req, res) => {
    try {
        const clientes = await db.any("SELECT * FROM cliente;");
        console.log("Retornando Clientes");
        res.json(clientes).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.get("/clientePedidos", async (req, res) => {
    try {
        const clienteCpf = req.body.cpf;
        console.log(`infos solicitadas de pedido idp= ${clienteCpf}`);
        const cliente_pedidos = await db.all(
            "select * from cliente natural join pedidos where cpf = $1;",
            [clienteCpf]
        );
        res.json(cliente_pedidos).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.post("/addCliente", async (req, res) => {
    try{
        const clienteCpf = req.body.cpf;
        const clienteNome = req.body.nome;
        const clienteTelefone = req.body.tel;
        const clienteEmail = req.body.email;
        const clienteEmpresa = req.body.empresa;
        console.log(`Recebi um Cliente com o CPF "${clienteCpf}"`);
        db.none(
            "INSERT INTO cliente(cpf,nome,telefone,email,empresa) VALUES ($1,$2,$3,$4,$5)",
            [clienteCpf,clienteNome,clienteTelefone,clienteEmail,clienteEmpresa]
        );
        res.json(logs).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});


// -------------- Trabalhando com os logs --------------

app.get("/logs", async (req, res) => {
    try {
        const logs = await db.any("SELECT * FROM logs;");
        console.log("Retornando Clientes");
        res.json(logs).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.post("/novaLog", async (req, res) => {
    try {
        const logData = req.body.data;
        const logUsuario = req.body.usuario;
        const logMudanca = req.body.mudanca;
        console.log(`Nova log "${logMudanca}", Feita pelo usuario ${logUsuario}`);
        db.none(
            "INSERT INTO logs(data,usuario,mudanca) VALUES ($1,$2,$3);",
            [logData,logUsuario,logMudanca]
        );
        res.json(logs).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});


// -------------- Trabalhando com os Usuarios --------------
app.post("/funcionario", async (req, res) => {
    console.log(`Recebi o usuario "${req.body.usuario}"`);
    try {
        const funcionarioUsuario = req.body.usuario;
        const funcionarioSenha = req.body.senha;
        console.log(`Recebi o usuario "${funcionarioUsuario}"`);
        const senha =  db.one(
            "SELECT senha FROM funcionario f WHERE f.usuario = $1;"
            [funcionarioUsuario]
        );
        if (senha == funcionarioSenha){
            res.json(logs).status(200);
        }
        else{
            throw new error("senha errada");
        }
    } catch (error){
        console.log(error);
        res.sendStatus(400);
    }
});