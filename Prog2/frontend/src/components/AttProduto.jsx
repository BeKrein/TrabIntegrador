import React from "react";
import axios from "axios";
import { Alert, Box, Button, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";


function AttProduto() {

    const { state } = useLocation();
    const navigate = useNavigate();

    const [tipoprod, setTipoprod] = React.useState("");
    const [tamanho, setTamanho] = React.useState("");
    const [usoDeTecido, setUsoDeTecido] = React.useState("");
    const [idprod, setIdprod] = React.useState(state.idprod);

    const [openMessage, setOpenMessage] = React.useState(false);
    const [messageText, setMessageText] = React.useState("");
    const [messageSeverity, setMessageSeverity] = React.useState("success");


    function handleVoltaClick() {
        navigate("/produtos");
    }


    async function handleSubmit() {
        if (tipoprod !== "" || tamanho !== "" || usoDeTecido !== "") {
            try {
                axios.post("/attProduto", {
                    tipoprod: tipoprod,
                    tamanho: tamanho,
                    usodetecido: usoDeTecido,
                    idprod: idprod,

                });
                setMessageText("produto atualizado com sucesso!");
                setMessageSeverity("success");
                navigate("/produtos");
            } catch (error) {
                console.log(error);
                setMessageText("Falha ao atualizar o produto!");
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
        let res = await axios.get("/produto", {
            params: {
                idprod: idprod,
            }
        });
        console.log(res.data);
        setTipoprod(res.data.tipoprod);
        setTamanho(res.data.tamanho);
        setUsoDeTecido(res.data.uso_de_tecido);
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
                        <Typography variant="h3">Atualizar Produto</Typography>
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
                                        atualizar
                                    </Button>
                                    <Button
                                        variant="contained"
                                        style={{
                                            maxwidth: "100px",
                                            minwidth: "100px",
                                        }}
                                        onClick={handleVoltaClick}
                                        color="cinza"
                                    >
                                        Voltar
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

export default AttProduto;
