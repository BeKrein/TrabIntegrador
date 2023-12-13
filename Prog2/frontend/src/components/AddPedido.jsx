import React from "react";
import axios from "axios";
import { Alert, Box, Button, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "./Sidebar";
import { useNavigate, useLocation } from "react-router-dom";


const colunasSelProd = [
    { field: "tipoprod", headerName: "Tipo do produto", width: 200 },
    { field: "tamanho", headerName: "Tamanho", width: 50 },
    { field: "tipotec", headerName: "Tecido usado", width: 200 },
]

const colunasSelTec = [
    { field: "idt", headerName: "Código do Tecido", width: 150 },
    { field: "tipo", headerName: "Tipo do tecido", width: 100 },
    { field: "cor", headerName: "Cor", width: 100 },
    { field: "peso", headerName: "Peso(Kgs)", width: 100},
]

const colunasCarrinho = [
    { field: "prodIdSelecionado", headerName: "Id do produto", width: 100 },
    { field: "tecidoIdSelecionado", headerName: "Id do tecido", width: 100 },
    { field: "quantidade", headerName: "Quantidade", width: 100 },
    { field: "valor", headerName: "valor", width: 100 },
    { field: "tecidoSelecionadoCor", headerName: "cor", width: 100 },
]


function AddPedido() {

    const { state } = useLocation();
    const navigate = useNavigate();

    const [listaProdutos, setListaprodutos] = React.useState([]);
    const [tipoProd, setTipoprod] = React.useState("");
    const [prodIdSelecionado, setProdSelecionado] = React.useState(0);

    const [listaTecido, setListaTecido] = React.useState([]);
    const [tipoTecido, setTipoTecido] = React.useState("");
    const [tecidoIdSelecionado, setTecidoSelecionado] = React.useState();
    const [tecidoSelecionadoCor, setTecidoSelecionadocor] = React.useState();

    const [quantidade, setQuantidade] = React.useState();
    const [valor, setValor] = React.useState();

    const [estadoBotao, setEstadoBotao] = React.useState(true);

    const [carrinho, setCarrinho] = React.useState([]);
    let auxCarrinho;

    async function getData() {
        if(state != null) {
            setCarrinho(state.vinucarrinho);
            setEstadoBotao(false);
        }
        if (tipoProd === ("")) {
            let res = await axios.get("/produtos");
            setListaprodutos(res.data);
        } else {
            let res = await axios.get("/addPedidoProd", {
                params: {
                    tipoProd: tipoProd,
                },
            });
            setListaprodutos(res.data);
        }

        if (prodIdSelecionado === 0) {
            setListaTecido([]);
        } else {
            if (tipoTecido === ("")) {
                let res = await axios.get("/tecidosportipo", {
                    params: {
                        idprod: prodIdSelecionado,
                    }
                });
                setListaTecido(res.data);
            } else {
                let res = await axios.get("/addPedidoTecido", {
                    params: {
                        tipoTecido: tipoTecido,
                    },
                });
                setListaTecido(res.data);
            }
        }
    }

    async function handleClickPedido(id) {
        setProdSelecionado(id);
        getData();
    }

    async function handleClickTecido(id, cor) {
        setTecidoSelecionado(id);
        let res = await axios.get("/cor", {
            params: {
                idtec: id,
            },
        });
        setTecidoSelecionadocor(res.data.cor);
    }

    function adiciona() {
        setCarrinho(current => [...current, { prodIdSelecionado, tecidoIdSelecionado, valor, tecidoSelecionadoCor, quantidade, }]);
        setEstadoBotao(false);
        clearForm();
    }

    function limpa() {
        const index = carrinho.findIndex(i => {
            return i.prodIdSelecionado === 0;
        });
        const filtrado = carrinho.filter(i => {
            return i.prodIdSelecionado !== 0;
        })
        setCarrinho(filtrado);
    }

    function clearForm() {
        setProdSelecionado(0);
        setQuantidade('');
        setTecidoSelecionado(0);
        setTecidoSelecionadocor('');
        setTipoTecido('');
        setTipoprod("");
        setValor(0);
        getData();
    }

    function handleClickCarrinho(id) {
        const filtrado = carrinho.filter(i => {
            console.log(id);
            return (i.tecidoIdSelecionado != id);
        });
        console.log(filtrado);
        if (filtrado.length === 0) {
            setCarrinho([]);
            setEstadoBotao(true);
        } else {
            setCarrinho(filtrado);
        }
    }

    function finaliza() {
        limpa();
        navigate("/finalPed", { state: { vinucarrinho: carrinho } });
    }

    React.useEffect(() => {
        getData();
    }, []);


    return (
        <Box>
            <Sidebar />
            <Stack direction={"column"}>
                <Stack direction={"row"} justifyContent={"center"}>
                    <Box bgcolor={"cinza.light"} padding={3}>
                        <Typography> Produto: </Typography>
                        <Box height={"300px"} padding={1}>
                            <DataGrid
                                rows={listaProdutos}
                                columns={colunasSelProd}
                                getRowId={(listaProdutos) => listaProdutos.idprod}
                                hideFooter="true"
                                onCellClick={(rows) => { handleClickPedido(rows.id) }}
                            />
                        </Box>
                        <TextField
                            id="tipoprod-input"
                            label="Pesquisar produto"
                            size="big"
                            onChange={(e) => setTipoprod(e.target.value)}
                            value={tipoProd}
                        />
                        <Button
                            color="cinza"
                            size="small"
                            variant="contained"
                            onClick={() => {
                                getData();
                            }}
                        >Procurar</Button>
                    </Box>
                    <Box bgcolor={"cinza.light"} padding={3}>
                        <Typography> Tecido: </Typography>
                        <Box height={"300px"} padding={1}>
                            <DataGrid
                                rows={listaTecido}
                                columns={colunasSelTec}
                                getRowId={(listaTecido) => listaTecido.idt}
                                hideFooter="true"
                                onCellClick={(rows) => { handleClickTecido(rows.id) }}
                            />
                        </Box>
                        <TextField
                            id="tipoprod-input"
                            label="Pesquisar cor"
                            size="big"
                            onChange={(e) => setTipoTecido(e.target.value)}
                            value={tipoTecido}
                        />
                        <Button
                            color="cinza"
                            size="small"
                            variant="contained"
                            onClick={() => {
                                getData();
                            }}
                        >Procurar</Button>
                    </Box>
                </Stack>
                <Box bgcolor={"cinza.light"} padding={3}>
                    <Stack>
                        <TextField
                            id="valor-input"
                            label="Valor"
                            size="big"
                            onChange={(e) => setValor(e.target.value)}
                            value={valor}
                        />
                        <TextField
                            id="quantidade-input"
                            label="Quantidade"
                            size="big"
                            onChange={(e) => setQuantidade(e.target.value)}
                            value={quantidade}
                        />
                        <Button
                            color="cinza"
                            size="small"
                            variant="contained"
                            onClick={() => {
                                adiciona();
                            }}
                        >Enviar</Button>
                    </Stack>
                </Box>
                <Box>
                    <DataGrid
                        rows={carrinho}
                        columns={colunasCarrinho}
                        getRowId={(carrinho) => carrinho.tecidoIdSelecionado}
                        hideFooter="true"
                        onCellClick={(rows) => { handleClickCarrinho(rows.id) }}
                    />
                </Box>
                <Button
                    disabled = {estadoBotao}
                    color="cinza"
                    size="small"
                    variant="contained"
                    onClick={() => {
                        finaliza();
                    }}
                >Finalizar</Button>
            </Stack>
        </Box>
    )
}

export default AddPedido;
