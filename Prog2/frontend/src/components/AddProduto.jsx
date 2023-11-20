import React from "react";
import axios from "axios";
import { Alert, Box, Button, Snackbar, Stack, TextField, Typography } from "@mui/material";


function AddProduto() {

    const [tipoprod, setTipoprod] = React.useState("");
    const [tamanho, setTamanho] = React.useState("");
    const [usoDeTecido, setUsoDeTecido] = React.useState("");

    const [openMessage, setOpenMessage] = React.useState(false);
    const [messageText, setMessageText] = React.useState("");
    const [messageSeverity, setMessageSeverity] = React.useState("success");


    function clearForm() {
        setTipoprod([]);
        setTamanho([]);
        setUsoDeTecido([]);
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
                await axios.post("/addProduto", {
                    tipoprod: tipoprod,
                    tamanho: tamanho,
                    usodetecido: usoDeTecido,
                });
                console.log(`tipoprod: ${tipoprod} - tamanho: ${tamanho}`);
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

    return (
        <Box
            sx={{ bgcolor: 'text.secondary' }}
            height={'600px'}
        >
            <Stack direction={"column"} alignItems={"center"}>
                <Typography variant="h3">Adicionar Produto:</Typography>
            </Stack>
            <Box>
                <Stack direction={"column"} spacing={2} alignItems={"center"}>
                    <Box bgcolor={"background.paper"}>
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
                                    <Typography variant="h6">tamanho do produto:</Typography>
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
                                        color="primary"
                                    >
                                        Adicionar
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        style={{
                                            maxwidth: "100px",
                                            minwidth: "100px",
                                        }}
                                        onClick={handleCancelClick}
                                        color="error"
                                    >
                                        Cancelar
                                    </Button>
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

export default AddProduto;
