import React from "react";
import axios from "axios";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Login from "./Login";
import PaginaP from "./PaginaP";
import Estoque from "./Estoque";
import LogsProg from "./LogsProg";
import Pedidos from "./Pedidos";
import Pedido from "./Pedido";
import AddTecido from "./AddTecido";
import AddProduto from "./AddProduto";
import Produtos from "./Produtos";
import AddPedido from "./AddPedido";
import FinalPed from "./FinalPed";
import TelaDeConfirmacao from "./TelaDeConfirmacao";
import NovoCli from "./NovoCli";
import AttTecido from "./AttTecido";
import AttProduto from "./AttProduto";
import Logs from "./Logs";


axios.defaults.baseURL = "http://localhost:3010";
axios.defaults.headers.common["Content-Type"] =
    "application/json;charset=utf-8";


const theme = createTheme({
    palette: {
        cinza: {
            main: '#a9a9a9',
            light: '#d3d3d3',
            dark: '#646464',
            contrastText: '#242105',
        },
    },
});


function App() {


    const navigate = useNavigate();


    return (
        <ThemeProvider theme={theme}>
            <Box className="container-lg">
                <Routes>
                    <Route
                        path="/"
                        element={<Login />}
                    />
                    <Route
                        path="/paginaP"
                        element={<PaginaP />}
                    />

                    <Route
                        path="/estoque"
                        element={<Estoque />}
                    />

                    <Route
                        path="/logsProg"
                        element={<LogsProg />}
                    />

                    <Route
                        path="/pedidos"
                        element={<Pedidos />}
                    />

                    <Route
                        path="/pedido"
                        element={<Pedido />}
                    />

                    <Route
                        path="/produtos"
                        element={<Produtos />}
                    />

                    <Route
                        path="/addTecido"
                        element={<AddTecido />}
                    />

                    <Route
                        path="/addProduto"
                        element={<AddProduto />}
                    />

                    <Route
                        path="/addPedido"
                        element={<AddPedido />}
                    />

                    <Route
                        path="/finalPed"
                        element={<FinalPed />}
                    />

                    <Route
                        path="/confirma"
                        element={<TelaDeConfirmacao />}
                    />

                    <Route
                        path="/novoCli"
                        element={<NovoCli />}
                    />

                    <Route
                        path="/attTecido"
                        element={<AttTecido />}
                    />

                    <Route
                        path="/attProduto"
                        element={<AttProduto />}
                    />

                    <Route
                        path="/logs"
                        element={<Logs />}
                    />
                </Routes>
            </Box>
        </ThemeProvider>
    );
}

export default App