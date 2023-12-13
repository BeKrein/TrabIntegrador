import React from "react";
import Logo from "./Logo";
import { Box, Stack, Button } from "@mui/material";
import Texto from "./Texto";
import Sidebar from "./Sidebar";



function PaginaP() {







    return (
            <Box>
                <Sidebar />
                <Logo />
                <Texto texto="O que você deseja fazer?" />
                <Stack direction={"row"} alignItems={"center"} spacing={3} justifyContent={"space-evenly"}>
                    <Stack direction={"column"} justifyContent={"space-evenly"} alignItems={"stretch"} spacing={3}>
                        <Button
                            variant="contained"
                            // onClick={handleClick}
                            type="submit"
                            color="primary">
                            CADASTRAR PEDIDO
                        </Button>

                        <Button
                            variant="contained"
                            // onClick={handleClick}
                            type="submit"
                            color="primary">
                            CADASTRAR TECIDO
                        </Button>

                        <Button
                            variant="contained"
                            // onClick={handleClick}
                            type="submit"
                            color="primary">
                            CADASTRAR PRODUTO
                        </Button>
                    </Stack>
                    <Stack direction={"column"} justifyContent={"space-evenly"} alignItems={"stretch"} spacing={3}>
                        <Button
                            variant="contained"
                            // onClick={handleClick}
                            type="submit"
                            color="primary">
                            VISUALIZAR PEDIDOS
                        </Button>

                        <Button
                            variant="contained"
                            // onClick={handleClick}
                            type="submit"
                            color="primary">
                            VISUALIZAR ESTOQUE
                        </Button>

                        <Button
                            variant="contained"
                            // onClick={handleClick}
                            type="submit"
                            color="primary">
                            VISUALIZAR PRODUTOS
                        </Button>
                    </Stack>
                </Stack>
            </Box>
    );
}


export default PaginaP