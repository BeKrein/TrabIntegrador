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
            "SELECT cli.cpf,cli.nome,cli.empresa,pe.idp,pe.valor,pr.idprod,pr.tipoprod,pr.tamanho,pr.tipotec,pp.cor,pp.quantidade FROM cliente cli INNER JOIN pedidos pe ON cli.cpf = pe.cpf INNER JOIN ped_prod pp ON pe.idp = pp.idp INNER JOIN produto pr ON pp.idprod = pr.idprod WHERE pe.idp = $1;",
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

app.get("/addPedidoProd", async (req, res) => {
    try {
        const produtoTip = req.query.tiPoprod;
        const produtos = await db.any(
            "SELECT * FROM produto WHERE tipoprod = $1;",
            produtoTip
        );
        res.json(produtos).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.get("/addPedidoTecido", async (req, res) => {
    try {
        const tecidoTip = req.query.tipoTecido;
        const tecidos = await db.any(
            "SELECT * FROM tecido WHERE cor = $1;",
            tecidoTip
        );
        res.json(tecidos).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.get("/confirmaInfos", async (req, res) => {
    try {
        const idprod = parseInt(req.query.idprod);
        const idt = req.query.idt;
        console.log(`procurando informações do produto ${idprod} com tecido ${idt}`);
        const infos = await db.one(
            "SELECT pr.tipoprod,pr.tamanho,pr.uso_de_tecido as uso,pr.tipotec,tec.cor FROM produto pr INNER JOIN tecido tec ON tipotec = tipo WHERE pr.idprod = $1 and tec.idt = $2;",
            [idprod, idt]
        );
        res.json(infos).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});


app.post("/addPedidoInicio", async (req, res) => {
    try {
        const valor = parseFloat(req.body.valor);
        const cpf = req.body.cpf;
        console.log(`Fazendo um pedido de ${valor} para cpf de ${cpf}!`);
        await db.none(
            "INSERT INTO pedidos(valor,cpf) VALUES ($1,$2);",
            [valor, cpf]
        );
        res.sendStatus(200);
    } catch (error) {

    }
});

app.post("/addPedidoResto", async (req, res) => {
    try {
        const idt = req.body.idt;
        const quantidade = parseFloat(req.body.quantidade);
        const idprod = parseFloat(req.body.idprod);
        const cor = req.body.cor;
        // Conseguindo o Id do ultimo pedido
        const aux = await db.one("SELECT MAX(idp) AS idpm FROM pedidos;");
        const idp = aux.idpm;
        console.log(`Pedido de ID ${idp}`);
        // quantidade de tecido usado
        const aux2 = await db.one("SELECT uso_de_tecido as uso FROM produto WHERE idprod = $1;",
            idprod
        );
        const uso = aux2.uso;
        const quantidadeusada = (quantidade * uso);
        console.log(`tecido: ${idt}\nproduto:${idprod}\nquantidade:${quantidade}\nuso: ${uso}\nidp:${idp}\nquantia usada:${quantidadeusada}\ncor ${cor}`);
        // tec_usado
        await db.none(
            "INSERT INTO tec_usado(idp, idtecido, quantidade) VALUES ($1,$2,$3);",
            [idp, idt, quantidadeusada]
        );
        // ped_prod
        await db.none(
            "INSERT INTO ped_prod(idp, idprod, quantidade, cor) VALUES ($1,$2,$3,$4);",
            [idp, idprod, quantidade, cor]
        );
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.post("/atualizaEstoque", async (req, res) => {
    try {
        const idt = req.body.idt;
        console.log("ID tecido: ", idt);
        // Conseguindo o Id do ultimo pedido
        let aux = await db.one("SELECT MAX(idp) AS idpm FROM pedidos;");
        const idp = aux.idpm;
        console.log("ID pedido: ", idp);
        aux = await db.one(
            "SELECT quantidade FROM tec_usado WHERE idp = $1 AND idtecido = $2;",
            [idp,idt]
        );
        const uso = aux.quantidade;
        console.log(uso);
        db.none(
            "UPDATE tecido SET peso = (peso-$1) WHERE idt = $2;",
            [uso, idt]
        );
        const descricao = `Retirado ${uso}Kgs do tecido ID ${idt}`;
        db.none(
            "INSERT INTO logs(usuario,mudanca) VALUES ('',$1);",
            descricao
        )
        res.status(200);
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
    try {
        const tecidoIdt = req.query.idt;
        console.log(`Pegando tecido ID ${tecidoIdt}`);
        const tecido = await db.one(
            "SELECT * FROM tecido WHERE idt = $1;",
            tecidoIdt
        );
        res.json(tecido).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.post("/addTecido", async (req, res) => {
    try {
        const tecidoIdt = req.body.idt;
        const tecidoPeso = req.body.peso;
        const tecidoCor = req.body.cor;
        const tecidoTipo = req.body.tipo;
        const tecidoFornecedor = req.body.fornecedor;
        console.log(`Adicionando Tecido com idt de ${tecidoIdt}`);
        await db.none(
            "INSERT INTO tecido(idt,peso,cor,tipo,fornecedor) VALUES ($1,$2,$3,$4,$5);",
            [tecidoIdt, tecidoPeso, tecidoCor, tecidoTipo, tecidoFornecedor]
        );
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});


app.get("/tipostecido", async (req, res) => {
    try {
        const tipos = await db.any("SELECT * FROM tipodetecidos;");
        console.log("Retornando tipo de tecidos");
        res.json(tipos).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.get("/tecidosportipo", async (req, res) => {
    try {
        const idprod = parseInt(req.query.idprod);
        console.log(`Retornando os tecidos usados no produto ${idprod}`);
        const tecidos = await db.any("SELECT * FROM tecido WHERE tipo=(SELECT tipotec FROM produto WHERE idprod = $1);",
            [idprod]
        );
        res.json(tecidos).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.get("/cor", async (req, res) => {
    try {
        const idtec = req.query.idtec;
        console.log(`Retornando a cor do tecido ID ${idtec}`);
        const cor = await db.one("SELECT cor FROM tecido WHERE idt = $1",
            idtec
        );
        res.json(cor).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});



app.post("/attTecido", async (req, res) => {
    try {
        const tecidoIdt = req.body.idt;
        const tecidoPeso = req.body.peso;
        const tecidoCor = req.body.cor;
        const tecidoTipo = req.body.tipo;
        const tecidoFornecedor = req.body.fornecedor;
        console.log(`Atualizando Tecido com idt de ${tecidoIdt}`);
        db.none(
            "UPDATE tecido SET peso = $1, cor = $2, tipo = $3, fornecedor = $4 WHERE idt = $5;",
            [tecidoPeso, tecidoCor, tecidoTipo, tecidoFornecedor, tecidoIdt]
        );
    } catch (error) {
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
        const produtoUsoTecido = parseFloat(req.body.usodetecido);
        const tipotec = req.body.tipotec;
        console.log(`Recebi um produto do tipo ${produtoTipo} e tamanho ${produtoTamanho} e com ${produtoUsoTecido} ${tipotec}`);
        db.none(
            "INSERT INTO produto(tipoprod,tamanho,uso_de_tecido,tipotec) VALUES ($1,$2,$3,$4);",
            [produtoTipo, produtoTamanho, produtoUsoTecido, tipotec]
        );
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.get("/produto", async (req, res) => {
    try {
        const produtoIdprod = req.query.idprod;
        console.log(`Pegando produto ID ${produtoIdprod}`);
        const produto = await db.one(
            "SELECT * FROM produto WHERE idprod = $1;",
            [produtoIdprod]
        );
        console.log(produto);
        res.json(produto).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.get("/usoTec", async (req, res) => {
    try {
        const produtoIdprod = parseInt(req.query.idprod);
        console.log(`Pegando produto ID ${produtoIdprod}`);
        const produto = await db.one(
            "SELECT uso_de_tecido FROM produto WHERE idprod = $1",
            produtoIdprod,
        );
        console.log(produto);
        res.json(produto).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.post("/attProduto", async (req, res) => {
    try {
        const idprod = req.body.idprod;
        const produtoTipo = req.body.tipoprod;
        const produtoTamanho = req.body.tamanho;
        const produtoUsoTecido = parseFloat(req.body.usodetecido);
        console.log(`Recebi um produto do tipo ${produtoTipo} e tamanho ${produtoTamanho} e com ${produtoUsoTecido}`);
        db.none(
            "UPDATE produto SET tipoprod = $1, tamanho = $2, uso_de_tecido = $3 WHERE idprod = $4",
            [produtoTipo, produtoTamanho, produtoUsoTecido, idprod]
        );
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
    try {
        const clienteCpf = req.body.cpf;
        const clienteNome = req.body.nome;
        const clienteTelefone = req.body.telefone;
        const clienteEmail = req.body.email;
        const clienteEmpresa = req.body.empresa;
        console.log(`Recebi um Cliente com o CPF "${clienteCpf}"`);
        await db.none(
            "INSERT INTO cliente(cpf,nome,telefone,email,empresa) VALUES ($1,$2,$3,$4,$5)",
            [clienteCpf, clienteNome, clienteTelefone, clienteEmail, clienteEmpresa]
        );
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.get("/cliente", async (req, res) => {
    try {
        const nome = req.query.nome;
        console.log(`Pegando cliente nome: ${nome}`);
        const cliente = await db.any(
            "SELECT * FROM cliente WHERE nome = $1;",
            nome,
        );
        res.json(cliente).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.get("/clienteCpf", async (req, res) => {
    try {
        const cpf = req.query.cpf;
        console.log(`Pegando cliente cpf: ${cpf}`);
        const cliente = await db.one(
            "SELECT * FROM cliente WHERE cpf = $1;",
            cpf,
        );
        res.json(cliente).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});


// -------------- Trabalhando com os logs --------------

app.get("/logs", async (req, res) => {
    try {
        const logs = await db.any("SELECT * FROM logs;");
        console.log("Retornando Logs");
        res.json(logs).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.post("/novaLog", async (req, res) => {
    try {
        const logUsuario = req.body.usuario;
        const logMudanca = req.body.mudanca;
        console.log(`Nova log "${logMudanca}", Feita pelo usuario ${logUsuario}`);
        await db.none(
            "INSERT INTO logs(usuario,mudanca) VALUES ($1,$2);",
            [ logUsuario, logMudanca]
        );
        res.status(200);
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
        const senha = db.one(
            "SELECT senha FROM funcionario f WHERE f.usuario = $1;"
            [funcionarioUsuario]
        );
        if (senha == funcionarioSenha) {
            res.json(logs).status(200);
        }
        else {
            throw new error("senha errada");
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});