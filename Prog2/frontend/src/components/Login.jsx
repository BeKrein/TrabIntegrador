import React from "react";
import axios from "axios";
import { Alert, Box, Button, Snackbar, Stack, TextField, Typography, ThemeProvider, createTheme } from "@mui/material";
import Logo from "./Logo";
import Texto from "./Texto";


const theme = createTheme({
    palette: {
        background: {
            paper: '#fff',
        },
    }
});

function Login() {
    const [usuario, setUsuario] = React.useState("");
    const [senha, setSenha] = React.useState("");


    async function handleSubmit() {
        if (usuario !== "" || senha !== "") {
            console.log(`${usuario}`);
            try {
                await axios.post("/funcionario", {
                    usuario: usuario,
                    senha: senha,
                });
                console.log("Login feito com sucesso");
                //Manda o user pra pagina principal
            } catch (error) {
                console.log(error);
            }
        }
    }


    return (
        <Box
            sx={{ bgcolor: 'text.secondary' }}
            height={'600px'}
        >
            <Logo />
            <Texto texto="Bem Vindo!"/>
            <Stack
                direction={"column"}
                alignItems={"center"}
            >
                <Box
                    className="col-3"
                />
                <ThemeProvider theme={theme}>
                    <Box
                        className="col-6"
                        bgcolor={'background.paper'}
                    >
                        <Stack direction={"column"} alignItems={"stretch"}>
                            <TextField
                                required
                                id="usuario-input"
                                label="Usuario"
                                size="medium"
                                onChange={(e) => setUsuario(e.target.value)}
                                value={usuario}
                            />
                            <TextField
                                required
                                id="senha-input"
                                label="Senha"
                                size="medium"
                                onChange={(e) => setSenha(e.target.value)}
                                value={senha}
                            />
                        </Stack>
                    </Box>
                </ThemeProvider>
            </Stack>
            <Stack direction="column" alignItems={"center"} spacing={3}>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    type="submit"
                    color="primary"
                >
                    Login
                </Button>
            </Stack>
        </Box>
    );
}

export default Login