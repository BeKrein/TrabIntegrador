import React from "react";
import axios from "axios";
import { Box, Stack, Button, Typography, TextField } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import Texto from "./Texto";

const colunaProd = [
    { field: "tipoprod", headerName: "Produto", width: 100 },
    { field: "tamanho", headerName: "Tamanho", width: 100 },
    { field: "cor", headerName: "Cor", width: 100 },
    { field: "idt", headerName: "Tecido usado", width: 100 },
]

const colTecUsado = [
    { field: "idtecido", headerName: "ID do tecido", width: 100 },
    { field: "quantidade", headerName: "Quantidade", width: 100 },
]

function Pedido() {

    const [listaPedido, setListaPedido] = React.useState([]);
    const [tecUsado, setTecUsado] = React.useState([]);
    const [idp, setIdp] = React.useState([]);
    const [nomec, setNomec] = React.useState(['']);
    const [empresac, setEmpresac] = React.useState(['']);
    const [cpfc, setCpfc] = React.useState(['']);
    const [valorp, setValorp] = React.useState(['']);

    async function getData() {
        if (idp !== '') {
            try {
                let res = await axios.get('/pedido', {
                    params: {
                        idp: idp,
                    },
                });
                setListaPedido(res.data);
                console.log(res.data);
                res = await axios.get('/tec_usado', {
                    params: {
                        idp: idp,
                    },
                });
                setTecUsado(res.data);
                console.log(res.data);
                setValores();
            } catch (error) {
                
            }
        }
        else {
            setListaPedido([]);
            setTecUsado([]);
            limpaValores();
        }
    }

    function setValores() {
        setNomec(listaPedido[0].nome);
        setEmpresac(listaPedido[0].empresa);
        setCpfc(listaPedido[0].cpf);
        setValorp(listaPedido[0].valor);
    }

    function limpaValores(){
        setNomec([]);
        setEmpresac([]);
        setCpfc([]);
        setValorp([]);
    }


    return (
        <Box
            sx={{ bgcolor: 'text.secondary' }}
            height={'600px'}
        >
            <Stack direction={"column"} alignItems={"center"}>
                <Stack direction={"row"} spacing={2}>
                    <Box width={'400px'}>
                        <Typography variant="h5">Produtos:</Typography>
                    </Box>
                    <Box width={'150px'}>
                        <Typography variant="h5">Cliente:</Typography>
                    </Box>
                </Stack>
                <Stack direction={"row"} spacing={2}>
                    <Box bgcolor={"background.paper"}>
                        <DataGrid
                            rows={listaPedido}
                            columns={colunaProd}
                            getRowId={(listaPedido) => listaPedido.idprod}
                        />
                    </Box>
                    <Box width={'400px'} height={'200px'} bgcolor={"background.paper"}>
                        <Stack direction={"column"} spacing={1}>
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
                    </Box>
                </Stack>
                <Box>
                    <Typography variant="h3">Valor do pedido: R${valorp}</Typography>
                </Box>
                <Box>
                    <Stack direction={"row"} alignItems={"center"} spacing={3}>
                        <Stack direction={"column"} alignItems={"center"}>
                            <Typography variant="h4">Quantidade de tecido usado:</Typography>
                            <DataGrid
                                rows={tecUsado}
                                columns={colTecUsado}
                                getRowId={(tecUsado) => tecUsado.idtecido}
                            />
                        </Stack>
                        <Box>
                            <Stack direction={"column"}>
                                <TextField
                                    required
                                    id="idp-input"
                                    label="ID do pedido"
                                    size="medium"
                                    onChange={(e) => setIdp(e.target.value)}
                                    value={idp}
                                />
                                <Button
                                    variant="contained"
                                    style={{
                                        maxWidth: "100px",
                                        minWidth: "100px",
                                    }}
                                    onClick={getData}
                                    type="submit"
                                    color="primary"
                                >
                                    Pesquisar
                                </Button>
                            </Stack>
                        </Box>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
}







export default Pedido