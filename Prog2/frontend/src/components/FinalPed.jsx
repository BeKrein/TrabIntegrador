import React from "react";
import axios from "axios";
import { Alert, Box, Button, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";


const colunasClientes = [
    { field: "nome", headerName: "Nome do cliente", width: 200 },
    { field: "cpf", headerName: "CPF", width: 200 },
    { field: "empresa", headerName: "Empresa", width: 200 },
]



function FinalPed() {

    const { state } = useLocation();
    const navigate = useNavigate();

    const [listaClientes, setListaClientes] = React.useState([]);
    const [procura, setProcura] = React.useState("");
    const [clienteCpf, setClienteCpf] = React.useState();
    const [carrinho, setCarrinho] = React.useState(state.vinucarrinho);
    console.log(carrinho);

    async function getData() {
        if (procura === ("")) {
            let res = await axios.get("/clientes");
            setListaClientes(res.data);
        } else {
            let res = await axios.get("/cliente", {
                params: {
                    nome: procura,
                },
            });
            setListaClientes(res.data);
        }
    }

    function handleClickCliente(id) {
        setClienteCpf(id);
    }

    function confirma(){
        navigate("/confirma", {
             state: {
                vinucarrinho : carrinho,
                vinucliente : clienteCpf
                }});
    }

    function novoCli(){
        navigate("/novoCli", {
            state: {
               vinucarrinho : carrinho,
               }});
    }

    function volta(){
        navigate("/addPedido", { state: { vinucarrinho: carrinho } });
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
                        <Typography> Selecione o Cliente: </Typography>
                        <Box height={"300px"} padding={1}>
                            <DataGrid
                                rows={listaClientes}
                                columns={colunasClientes}
                                getRowId={(listaClientes) => listaClientes.cpf}
                                hideFooter = {true}
                                onCellClick={(rows) => { handleClickCliente(rows.id) }}
                            />
                        </Box>
                        <TextField
                            id="tipoprod-input"
                            label="Pesquisar Cliente"
                            size="big"
                            onChange={(e) => setProcura(e.target.value)}
                            value={procura}
                        />
                        <Button
                            color="cinza"
                            size="small"
                            variant="contained"
                            onClick={() => {
                                getData();
                            }}
                        >Procurar</Button>
                        <Button
                            color="cinza"
                            size="small"
                            variant="contained"
                            onClick={() => {
                                novoCli();
                            }}
                        >Adicionar Novo Cliente</Button>
                        
                        <Typography>cliente selecionado:{clienteCpf}</Typography>
                        <Button
                            color="cinza"
                            size="small"
                            variant="contained"
                            onClick={() => {
                                confirma();
                            }}
                        >Confirmar</Button>
                        <Button
                            color="cinza"
                            size="small"
                            variant="contained"
                            onClick={() => {
                                volta();
                            }}
                        >Voltar</Button>
                    </Box>
                </Stack>
            </Stack>
        </Box>
    );
}

export default FinalPed;