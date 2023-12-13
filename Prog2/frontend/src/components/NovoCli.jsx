import React from "react";
import axios from "axios";
import { Alert, Box, Button, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

function NovoCli() {

    const { state } = useLocation();
    const navigate = useNavigate();
    const [carrinho, setCarrinho] = React.useState(state.vinucarrinho);

    const [nome, setNome] = React.useState("");
    const [cpf, setCpf] = React.useState("");
    const [telefone, setTelefone] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [empresa, setEmpresa] = React.useState("");

    const [openMessage, setOpenMessage] = React.useState(false);
    const [messageText, setMessageText] = React.useState("");
    const [messageSeverity, setMessageSeverity] = React.useState("success");



    function clearForm() {
        setNome("");
        setCpf("");
        setTelefone("");
        setEmail("");
        setEmpresa("");
    }

    function handleCancelClick() {
        if (nome !== "" || cpf !== "" || telefone !== "") {
            setMessageText("Formulario limpado!");
            setMessageSeverity("warning");
            setOpenMessage(true);
        }
        clearForm();
    }

    async function handleSubmit() {
        if (nome !== "" && cpf !== "" && telefone !== "") {
            try {
                axios.post("/addCliente", {
                    nome: nome,
                    cpf: cpf,
                    telefone: telefone,
                    email: email,
                    empresa: empresa,
                });
                setMessageText("Cliente adicionado com sucesso!");
                setMessageSeverity("success");
                clearForm();
                navigate("/finalPed", { state: { vinucarrinho: carrinho } });
            } catch (error) {
                console.log(error);
                setMessageText("Falha ao adicionar o cliente!");
                setMessageSeverity("error");
            } finally {
                setOpenMessage(true);
            }
        } else {
            setMessageText("Campos necessarios vazios!");
            setMessageSeverity("error");
            setOpenMessage(true);
        }
    }

    function handleCloseMessage(_, reason) {
        if (reason === "clickaway") {
            return;
        }
        setOpenMessage(false);
    }

    function handleVoltaClick() {
        navigate("/finalPed", { state: { vinucarrinho: carrinho } });
    }

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
                                    <Typography variant="h6">Nome do Cliente:</Typography>
                                    <TextField
                                        required
                                        id="nomeCli-input"
                                        label="Nome do Cliente"
                                        size="big"
                                        onChange={(e) => setNome(e.target.value)}
                                        value={nome}
                                    />
                                    <Typography variant="h6">CPF do Cliente:</Typography>
                                    <TextField
                                        required
                                        id="cpfCli-input"
                                        label="CPF do Cliente"
                                        size="big"
                                        onChange={(e) => setCpf(e.target.value)}
                                        value={cpf}
                                    />
                                    <Typography variant="h6">Telefone do Cliente:</Typography>
                                    <TextField
                                        required
                                        id="telCli-input"
                                        label="Telefone do Cliente"
                                        size="big"
                                        onChange={(e) => setTelefone(e.target.value)}
                                        value={telefone}
                                    />
                                </Stack>
                            </Box>
                            <Stack direction={"column"} spacing={2}>
                                <Typography variant="h6">Email do Cliente:</Typography>
                                <TextField
                                    id="emCli-input"
                                    label="Email do Cliente"
                                    size="big"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                                <Typography variant="h6">Empresa do Cliente:</Typography>
                                <TextField
                                    id="empresaCli-input"
                                    label="Empresa do Cliente"
                                    size="big"
                                    onChange={(e) => setEmpresa(e.target.value)}
                                    value={empresa}
                                />
                                <Stack direction="row" spacing={3}>
                                    <Button
                                        variant="contained"
                                        onClick={handleSubmit}
                                        type="submit"
                                        color="cinza"
                                    >
                                        Adicionar
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleCancelClick}
                                        color="cinza"
                                    >
                                        Cancelar
                                    </Button>
                                </Stack>
                                <Button
                                    variant="contained"
                                    onClick={handleVoltaClick}
                                    color="cinza"
                                >
                                    Voltar
                                </Button>
                            </Stack>
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

export default NovoCli;