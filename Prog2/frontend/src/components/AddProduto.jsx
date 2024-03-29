import React from "react";
import axios from "axios";
import { Alert, Box, Button, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "./Sidebar";

const colunasSelTec = [
    { field: "tipodetecidos", headerName: "Tecidos Usados:", width: 300 },
]
const colunasTecUsados = [
    { field: "auxTipo", headerName: "Tecidos Selecionados:", width: 300 },
]

function AddProduto() {

    const [tipoprod, setTipoprod] = React.useState("");
    const [tamanho, setTamanho] = React.useState("");
    const [usoDeTecido, setUsoDeTecido] = React.useState("");

    const [openMessage, setOpenMessage] = React.useState(false);
    const [messageText, setMessageText] = React.useState("");
    const [messageSeverity, setMessageSeverity] = React.useState("success");

    const [listaTipoTecido, setListaTipoTecido] = React.useState([]);
    const [tipo, setTipo] = React.useState([]);
    let auxTipo;



    function clearForm() {
        setTipoprod([]);
        setTamanho([]);
        setUsoDeTecido([]);
        setTipo([]);
    }

    function handleCancelClick() {
        if (tipoprod !== "" || tamanho !== "" || usoDeTecido !== "") {
            setMessageText("Cadastro de curso cancelado!");
            setMessageSeverity("warning");
            setOpenMessage(true);
        }
        clearForm();
    }

    async function handleSubmit() {
        if (tipoprod !== "" || tamanho !== "" || usoDeTecido !== "") {
            try {
                tipo.map(async i => {
                    console.log(i.auxTipo);
                    axios.post("/addProduto", {
                        tipoprod: tipoprod,
                        tamanho: tamanho,
                        usodetecido: usoDeTecido,
                        tipotec: i.auxTipo,
                    });
                });
                setMessageText("produto adicionado com sucesso!");
                setMessageSeverity("success");
                clearForm();
            } catch (error) {
                console.log(error);
                setMessageText("Falha ao adicionar o produto!");
                setMessageSeverity("error");
            } finally {
                setOpenMessage(true);
            }
        } else {
            setMessageText("Dados do produto invalidos!");
            setMessageSeverity("warning");
            setOpenMessage(true);
        }
    }

    function handleCloseMessage(_, reason) {
        if (reason === "clickaway") {
            return;
        }
        setOpenMessage(false);
    }

    async function getData() {
        let res = await axios.get("/tipostecido");
        setListaTipoTecido(res.data);
    }

    function handleClickTecido(id) {
        const found = tipo.some(i => i.auxTipo === id);
        if (found === false) {
            auxTipo = id;
            setTipo(current => [...current, { auxTipo }]);
        } else {
            const index = tipo.findIndex(i => {
                return i.auxTipo === id;
            });
            const filtrado = tipo.filter(i => {
                return i.auxTipo !== id;
            })
            setTipo(filtrado);
        }
    }


    React.useEffect(() => {
        getData();
    }, []);


    return (
        <Box>
            <Sidebar />
            <Box>
                <Stack direction={"column"} spacing={2} alignItems={"center"}>
                    <Box bgcolor={"cinza.light"} padding={2}>
                        <Typography variant="h3">Adicionar Produto</Typography>
                        <Stack direction={"row"} alignItems={"stretch"} spacing={3}>
                            <Box width={'400px'}>
                                <Stack direction={"column"} alignItems={"stretch"} spacing={2}>
                                    <Typography variant="h6">Tipo do produto:</Typography>
                                    <TextField
                                        required
                                        id="tipoprod-input"
                                        label="Tipo do produto"
                                        size="big"
                                        onChange={(e) => setTipoprod(e.target.value)}
                                        value={tipoprod}
                                    />
                                    <Typography variant="h6">Tamanho do produto:</Typography>
                                    <TextField
                                        required
                                        id="tamanho-input"
                                        label="tamanho"
                                        size="big"
                                        onChange={(e) => setTamanho(e.target.value)}
                                        value={tamanho}
                                    />
                                    <Typography variant="h6">Uso de tecido do produto:</Typography>
                                    <TextField
                                        required
                                        id="usoDeTecido-input"
                                        label="Uso de tecido"
                                        size="big"
                                        onChange={(e) => setUsoDeTecido(e.target.value)}
                                        value={usoDeTecido}
                                    />
                                </Stack>
                                <Stack direction="row" spacing={3}>
                                    <Button
                                        variant="contained"
                                        style={{
                                            maxwidth: "100px",
                                            minwidth: "100px",
                                        }}
                                        onClick={handleSubmit}
                                        type="submit"
                                        color="cinza"
                                    >
                                        Adicionar
                                    </Button>
                                    <Button
                                        variant="contained"
                                        style={{
                                            maxwidth: "100px",
                                            minwidth: "100px",
                                        }}
                                        onClick={handleCancelClick}
                                        color="cinza"
                                    >
                                        Cancelar
                                    </Button>
                                </Stack>
                            </Box>
                            <Box height={"400px"} width={"300px"}>
                                <DataGrid
                                    rows={listaTipoTecido}
                                    columns={colunasSelTec}
                                    getRowId={(listaTipoTecido) => listaTipoTecido.tipodetecidos}
                                    hideFooter="true"
                                    onCellClick={(rows) => { handleClickTecido(rows.id) }}
                                />
                            </Box>
                            <Box height={"400px"} width={"300px"}>
                                <DataGrid
                                    rows={tipo}
                                    columns={colunasTecUsados}
                                    getRowId={(tipo) => tipo.auxTipo}
                                    hideFooter="true"
                                />
                            </Box>
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
            </Box>
        </Box >
    )
}

export default AddProduto;
