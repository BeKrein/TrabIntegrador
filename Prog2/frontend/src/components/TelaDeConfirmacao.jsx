import React from "react";
import axios from "axios";
import { Alert, Box, Button, Snackbar, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";



const colunasCarrinho = [
    { field: "tipoprod", headerName: "Produto", width: 200 },
    { field: "tamanho", headerName: "Tamanho", width: 100 },
    { field: "tipotec", headerName: "Tecido", width: 200 },
    { field: "cor", headerName: "Cor", width: 100 },
    { field: "quantidade", headerName: "Quantidade", width: 100 },
]



function TelaDeConfirmacao() {
    const { state } = useLocation();
    const vinucarrinho = state.vinucarrinho;
    const vinucliente = state.vinucliente;
    const navigate = useNavigate();


    const [clienteCpf, setClienteCpf] = React.useState(vinucliente);
    const [empresa, setEmpresa] = React.useState("");
    const [nome, setNome] = React.useState("");
    const [carrinhoVindo, setCarrinhoVindo] = React.useState(vinucarrinho);
    const [carrinho, setCarrinho] = React.useState([]);
    const [valor, setValor] = React.useState();

    const [openMessage, setOpenMessage] = React.useState(false);
    const [messageText, setMessageText] = React.useState("");
    const [messageSeverity, setMessageSeverity] = React.useState("success");

    console.log(clienteCpf);
    console.log(carrinhoVindo);
    console.log(carrinho);

    async function getData() {
        let valorAux = 0;
        carrinhoVindo.map(i => {
            valorAux = (valorAux + parseFloat(i.valor));
        });
        setValor(valorAux);
        carrinhoVindo.map(async i => {
            let res = await axios.get("/confirmaInfos", {
                params: {
                    idprod: i.prodIdSelecionado,
                    idt: i.tecidoIdSelecionado,
                },
            });
            let tipoprod = res.data.tipoprod;
            let tamanho = res.data.tamanho;
            let uso = res.data.uso;
            let tipotec = res.data.tipotec;
            let cor = res.data.cor;
            let quantidade = i.quantidade;
            setCarrinho(current => [...current, { tipoprod, tamanho, uso, tipotec, cor, quantidade }]);
        });
        let res = await axios.get("/clienteCpf", {
            params: {
                cpf: clienteCpf,
            },
        });
        setNome(res.data.nome);
        setEmpresa(res.data.empresa);
        if (empresa == null) {
            setEmpresa("Cliente sem empresa");
        }
    }


    async function confirma() {
        try {
            let res = await axios.post("/addPedidoInicio", {
                valor: valor,
                cpf: clienteCpf,
            });
            if (res.status === 200) {
                carrinhoVindo.map(async i => {
                    console.log("i2");
                    res = await axios.post("/addPedidoResto", {
                        idt: i.tecidoIdSelecionado,
                        quantidade: i.quantidade,
                        idprod: i.prodIdSelecionado,
                        cor: i.tecidoSelecionadoCor,
                    });
                    if (res.status === 200) {
                        res = await axios.post("/atualizaEstoque", {
                            idt: i.tecidoIdSelecionado,
                        });
                    }
                });
            }
            setMessageText("Cliente adicionado com sucesso!");
            setMessageSeverity("success");
        } catch (error) {
            console.log(error);
            setMessageText("Falha ao adicionar o cliente!");
            setMessageSeverity("error");
        } finally {
            setOpenMessage(true);
        }

    }

    function handleCloseMessage(_, reason) {
        if (reason === "clickaway") {
            return;
        }
        setOpenMessage(false);
    }


    React.useEffect(() => {
        getData();
    }, []);

    function volta() {
        navigate("/finalPed", { state: { vinucarrinho: carrinhoVindo } });
    }


    return (
        <Box>
            <Sidebar />
            <Stack direction={"column"}>
                <Box bgcolor={"cinza.light"} padding={3}>
                    <Typography variant="h5"> Produtos: </Typography>
                    <Stack direction={"row"}>
                        <Box height={"300px"} padding={1}>
                            <DataGrid
                                rows={carrinho}
                                columns={colunasCarrinho}
                                getRowId={(carrinho) => carrinho.cor}
                                hideFooter={true}
                            />
                        </Box>
                        <Box>
                            <Stack direction={"row"} alignItems={"center"} spacing={3}>
                                <Stack direction={"column"} spacing={1}>
                                    <Typography variant="h4">Detalhes do Cliente:</Typography>
                                    <Box>
                                        <Typography variant="h5">Nome: {nome}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="h5">Empresa: {empresa}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="h5">CPF: {clienteCpf}</Typography>
                                    </Box>
                                    <Typography variant="h4">Valor do pedido:</Typography>
                                    <Typography variant="h5">{valor}</Typography>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                    <Stack direction={"row"}>
                        <Button
                            color="cinza"
                            size="big"
                            variant="contained"
                            onClick={() => {
                                confirma();
                            }}
                        >Confirmar</Button>
                        <Button
                            color="cinza"
                            size="big"
                            variant="contained"
                            onClick={() => {
                                volta();
                            }}
                        >Voltar</Button>
                    </Stack>
                </Box>
                <Snackbar
                    open={openMessage}
                    autoHideDuration={6000}
                    onClose={handleCloseMessage}
                >
                    <Alert
                        severity={messageSeverity}
                        onClose={handleCloseMessage}
                    >
                        {messageText}
                    </Alert>
                </Snackbar>
            </Stack>
        </Box >
    );
}

export default TelaDeConfirmacao;