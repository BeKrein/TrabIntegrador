import React from "react";
import { Box, Stack, Typography, Button, Drawer } from "@mui/material";
import BotaoSide from "./BotaoSide";


function Sidebar() {

    const [drawerState, setDrawerState] = React.useState(false);

    return (
        <Box>
            <Stack direction={"column"} alignItems={'flex-start'}>
                <img src="logoPequena.png" alt="Logo" />
                <Button
                    onClick={() => setDrawerState(true)}
                    color="cinza"
                    size="small"
                    variant="contained"
                > Abrir Menu</Button>
            </Stack>
            <Drawer
                variant="temporary"
                anchor="left"
                open={drawerState}
                onClose={() => setDrawerState(false)}
                PaperProps={{
                    sx: {
                        bgcolor: 'cinza.light',
                        boxShadow: 1,
                    }
                }}
            >

                <Stack direction={"column"} spacing={1} alignItems={"center"}>
                    <BotaoSide
                        nav={"/pedidos"}
                        mensagem={"Visualizar pedidos"}
                    />

                    <BotaoSide
                        mensagem={"Visualizar estoque"}
                        nav={"/estoque"}
                    />

                    <BotaoSide
                        mensagem={"Visualizar produtos"}
                        nav={"/produtos"}
                    />

                    <BotaoSide
                        mensagem={"Adicionar produto"}
                        nav={"/addProduto"}
                    />

                    <BotaoSide
                        mensagem={"Adicionar tecido"}
                        nav={"/addTecido"}
                    />

                    <BotaoSide
                        mensagem={"Adicionar pedido"}
                        nav={"/addPedido"}
                    />

                    <BotaoSide
                        mensagem={"Logs"}
                        nav={"/logs"}
                    />

                    <Box>
                        <Button
                            color="cinza"
                            size="small"
                            variant="contained"
                            onClick={() => {
                                setDrawerState(false);
                            }}
                        >
                            Fechar Menu
                        </Button>
                    </Box>

                </Stack>
            </Drawer>
        </Box>
    );
}

export default Sidebar
