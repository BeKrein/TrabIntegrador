import React from "react";
import axios from "axios";
import { Alert, Box, Button, Snackbar, Stack, TextField, Typography } from "@mui/material";


function AddTecido() {

    const [idt, setIdt] = React.useState("");
    const [tipo, setTipo] = React.useState("");
    const [cor, setCor] = React.useState("");
    const [peso, setPeso] = React.useState("");
    const [fornecedor, setFornecedor] = React.useState("");

    const [openMessage, setOpenMessage] = React.useState(false);
    const [messageText, setMessageText] = React.useState("");
    const [messageSeverity, setMessageSeverity] = React.useState("success");


    function clearForm() {
        setIdt([]);
        setTipo([]);
        setCor([]);
        setFornecedor([]);
        setPeso([]);
    }

    function handleCancelClick() {
        if (idt !== "" || tipo !== "" || cor !== "" || fornecedor !== "" || peso !== "") {
            setMessageText("Cadastro de curso cancelado!");
            setMessageSeverity("warning");
            setOpenMessage(true);
        }
        clearForm();
    }

    async function handleSubmit() {
        if (idt !== "" || tipo !== "" || cor !== "" || fornecedor !== "" || peso !== "") {
            try {
                await axios.post("/addTecido", {
                    idt: idt,
                    tipo: tipo,
                    cor: cor,
                    fornecedor: fornecedor,
                    peso: peso,
                });
                console.log(`idt: ${idt} - tipo: ${tipo}`);
                setMessageText("Tecido adicionado com sucesso!");
                setMessageSeverity("success");
                clearForm();
            } catch (error) {
                console.log(error);
                setMessageText("Falha ao adicionar o tecido!");
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

    return (
        <Box
            sx={{ bgcolor: 'text.secondary' }}
            height={'600px'}
        >
            <Stack direction={"column"} alignItems={"center"}>
                <Typography variant="h3">Adicionar Tecido:</Typography>
            </Stack>
            <Box>
                <Stack direction={"column"} spacing={2} alignItems={"center"}>
                    <Box bgcolor={"background.paper"}>
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
                                    <Typography variant="h6">Tipo do tecido:</Typography>
                                    <TextField
                                        required
                                        id="tipo-input"
                                        label="Tipo"
                                        size="big"
                                        onChange={(e) => setTipo(e.target.value)}
                                        value={tipo}
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
                                            color="primary"
                                        >
                                            Adicionar
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            style={{
                                                maxWidth: "100px",
                                                minWidth: "100px",
                                            }}
                                            onClick={handleCancelClick}
                                            color="error"
                                        >
                                            Cancelar
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

export default AddTecido;
