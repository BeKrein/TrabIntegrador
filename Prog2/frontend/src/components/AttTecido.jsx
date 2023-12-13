import React from "react";
import axios from "axios";
import { Alert, Box, Button, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";


const colunasSelTec = [
    { field: "tipodetecidos", headerName: "Tecido do tipo:", width: 300 },
]

function AttTecido() {

    const { state } = useLocation();
    const navigate = useNavigate();

    const [idt, setIdt] = React.useState(state.idtVindo);
    const [tipo, setTipo] = React.useState("");
    const [cor, setCor] = React.useState("");
    const [peso, setPeso] = React.useState("");
    const [fornecedor, setFornecedor] = React.useState("");

    const [openMessage, setOpenMessage] = React.useState(false);
    const [messageText, setMessageText] = React.useState("");
    const [messageSeverity, setMessageSeverity] = React.useState("success");

    const [listaTipoTecido, setListaTipoTecido] = React.useState([]);


    function handleVoltaClick() {
        navigate("/estoque");
    }

    async function handleSubmit() {
        if (idt !== "" || tipo !== "" || cor !== "" || fornecedor !== "" || peso !== "") {
            try {
                axios.post("/attTecido", {
                    idt: idt,
                    tipo: tipo,
                    cor: cor,
                    fornecedor: fornecedor,
                    peso: peso,
                });
                setMessageText("Tecido atualizado com sucesso!");
                setMessageSeverity("success");
                navigate("/estoque");
            } catch (error) {
                console.log(error);
                setMessageText("Falha ao atualizar o tecido!");
                setMessageSeverity("error");
            } finally {
                setOpenMessage(true);
            }

        } else {
            setMessageText("Dados do tecido invalidos!");
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
        res = await axios.get("/tecido", {
            params: {
                idt: idt,
            }
        });
        setCor(res.data.cor);
        setFornecedor(res.data.fornecedor);
        setPeso(res.data.peso);
        setTipo(res.data.tipo);
    }

    function handleClickTecido(id) {
        setTipo(id);
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
                        <Stack direction={"column"} alignItems={"center"}>
                            <Typography variant="h3">Atualizar Tecido:</Typography>
                        </Stack>
                        <Stack direction={"row"} alignItems={"stretch"} spacing={3}>
                            <Box width={'400px'}>
                                <Stack direction={"column"} alignItems={"stretch"} spacing={2}>
                                    <Typography variant="h6">ID do tecido:</Typography>
                                    <TextField
                                        required
                                        id="idt-input"
                                        label="ID do tecido"
                                        size="big"
                                        onChange={(e) => setIdt(e.target.value)}
                                        value={idt}
                                    />
                                    <Typography variant="h6">Cor do tecido:</Typography>
                                    <TextField
                                        required
                                        id="cor-input"
                                        label="Cor"
                                        size="big"
                                        onChange={(e) => setCor(e.target.value)}
                                        value={cor}
                                    />
                                    <Typography variant="h6">Tipo do tecido:</Typography>
                                    <Box height={"200px"} width={"300px"}>
                                        <DataGrid
                                            rows={listaTipoTecido}
                                            columns={colunasSelTec}
                                            getRowId={(listaTipoTecido) => listaTipoTecido.tipodetecidos}
                                            hideFooter="true"
                                            onCellClick={(rows) => { handleClickTecido(rows.id) }}
                                        />
                                    </Box>
                                    <Typography variant="h6">{tipo}</Typography>
                                </Stack>
                            </Box>
                            <Box width={'400px'}>
                                <Stack direction={"column"} alignItems={"stretch"} spacing={3}>
                                    <Typography variant="h6">Peso do tecido:</Typography>
                                    <TextField
                                        required
                                        id="peso-input"
                                        label="Peso (kg)"
                                        size="big"
                                        onChange={(e) => setPeso(e.target.value)}
                                        value={peso}
                                    />
                                    <Typography variant="h6">Fonecedor do tecido:</Typography>
                                    <TextField
                                        required
                                        id="fornecedor-input"
                                        label="Fornecedor"
                                        size="big"
                                        onChange={(e) => setFornecedor(e.target.value)}
                                        value={fornecedor}
                                    />

                                    <Stack direction="row" spacing={3}>
                                        <Button
                                            variant="contained"
                                            style={{
                                                maxWidth: "100px",
                                                minWidth: "100px",
                                            }}
                                            onClick={handleSubmit}
                                            type="submit"
                                            color="cinza"
                                        >
                                            Atualizar
                                        </Button>
                                        <Button
                                            variant="contained"
                                            style={{
                                                maxWidth: "100px",
                                                minWidth: "100px",
                                            }}
                                            onClick={handleVoltaClick}
                                            color="cinza"
                                        >
                                            Voltar
                                        </Button>
                                    </Stack>
                                </Stack>
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

export default AttTecido;
