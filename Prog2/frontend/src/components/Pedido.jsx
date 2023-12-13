import React from "react";
import axios from "axios";
import { Box, Stack, Button, Typography, TextField } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useNavigate, useLocation } from "react-router-dom";
import Texto from "./Texto";
import Sidebar from "./Sidebar";

const colunaProd = [
    { field: "tipoprod", headerName: "Produto", width: 100 },
    { field: "tamanho", headerName: "Tamanho", width: 100 },
    { field: "cor", headerName: "Cor", width: 100 },
    { field: "tipotec", headerName: "Tecido usado", width: 100 },
    { field: "quantidade", headerName: "Quantidade", width: 100 },
]

const colTecUsado = [
    { field: "idtecido", headerName: "ID do tecido", width: 100 },
    { field: "quantidade", headerName: "Quantidade(Kg)", width: 100 },
]

function Pedido() {

    const { state } = useLocation();
    const { idpVindo } = state;
    const navigate = useNavigate();

    const [listaPedido, setListaPedido] = React.useState([]);
    const [tecUsado, setTecUsado] = React.useState([]);
    const [idp, setIdp] = React.useState([idpVindo]);
    const [nomec, setNomec] = React.useState(['']);
    const [empresac, setEmpresac] = React.useState(['']);
    const [cpfc, setCpfc] = React.useState(['']);
    const [valorp, setValorp] = React.useState(['']);


    async function getData() {
        try {
            let res = await axios.get('/pedido', {
                params: {
                    idp: idp,
                },
            });
            console.log(res.data);
            setListaPedido(res.data);
            setValores(res.data);
            res = await axios.get('/tec_usado', {
                params: {
                    idp: idp,
                },
            });
            setTecUsado(res.data);
        } catch (error) {

        }
    }

    function setValores(info) {
        setNomec(info[0].nome);
        if(info[0].empresa == null){
            setEmpresac("Cliente sem empresa");
        } else {
            setEmpresac(info[0].empresa);
        }
        setCpfc(info[0].cpf);
        setValorp(info[0].valor);
    }

    function volta(){
        navigate("/pedidos");
    }

    React.useEffect(() => {
        getData();
    }, []);


    return (
        <Box>
            <Sidebar />
            <Stack direction={"column"} alignItems={"center"}>
                <Box bgcolor={"cinza.light"} padding={2}>
                    <Stack direction={"row"} spacing={2}>
                        <Box>
                            <Typography variant="h4">Produtos:</Typography>
                            <Box bgcolor={"cinza.main"}>
                                <DataGrid
                                    rows={listaPedido}
                                    columns={colunaProd}
                                    getRowId={(listaPedido) => listaPedido.idprod}
                                />
                            </Box>
                        </Box>
                        <Box>
                            <Typography variant="h4">Tecido usado:</Typography>
                            <Box bgcolor={"cinza.main"}>

                                <DataGrid
                                    rows={tecUsado}
                                    columns={colTecUsado}
                                    getRowId={(tecUsado) => tecUsado.idtecido}
                                />
                            </Box>
                        </Box>
                    </Stack>
                </Box>
                <Box bgcolor={"cinza.light"} padding={2}>
                    <Box>
                        <Stack direction={"row"} alignItems={"center"} spacing={3}>
                            <Stack direction={"column"} spacing={1}>
                                <Typography variant="h4">Detalhes do Cliente:</Typography>
                                <Box>
                                    <Typography variant="h5">Nome: {nomec}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="h5">Empresa: {empresac}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="h5">CPF: {cpfc}</Typography>
                                </Box>
                            </Stack>
                            <Typography variant="h4">Valor do pedido:</Typography>
                            <Typography variant="h4">{valorp}</Typography>
                        </Stack>
                        <Stack direction={"column"} alignItems={"center"}>
                        <Button
                            color="cinza"
                            size="small"
                            variant="contained"
                            onClick={() => {
                                volta();
                            }}
                        >Voltar</Button>
                        </Stack>
                    </Box>
                </Box>
            </Stack>
        </Box>
    );
}







export default Pedido