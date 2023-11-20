import React from "react";
import axios from "axios";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import Logo from "./Logo";
import Login from "./Login";
import PaginaP from "./PaginaP";
import Estoque from "./Estoque";
import LogsProg from "./LogsProg";
import Pedidos from "./Pedidos";
import Pedido from "./Pedido";
import AddTecido from "./AddTecido";
import AddProduto from "./AddProduto";



axios.defaults.baseURL = "http://localhost:3010";
axios.defaults.headers.common["Content-Type"] =
    "application/json;charset=utf-8";


const theme = createTheme({
    palette: {
        background: {
            paper: '#fff',
        },
    }
});


function App() {

    return (
        <ThemeProvider theme={theme}>
            <Box className="container-lg">
                <Login />
                <Box
                    bgcolor={'background.paper'}
                    height={'50px'}
                />
                <PaginaP />
                <Box
                    bgcolor={'background.paper'}
                    height={'50px'}
                />
                <Estoque />
                <Box
                    bgcolor={'background.paper'}
                    height={'50px'}
                />
                <LogsProg />
                <Box
                    bgcolor={'background.paper'}
                    height={'50px'}
                />
                <Pedidos />
                <Box
                    bgcolor={'background.paper'}
                    height={'50px'}
                />
                <Pedido />
                <Box
                    bgcolor={'background.paper'}
                    height={'50px'}
                />
                <AddTecido />
                <Box
                    bgcolor={'background.paper'}
                    height={'50px'}
                />
                <AddProduto/>
                <Box
                    bgcolor={'background.paper'}
                    height={'50px'}
                />
            </Box>
        </ThemeProvider>
    );
}

export default App