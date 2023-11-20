import React from "react";
import axios from "axios";
import { Box, Stack, Button, ThemeProvider, createTheme} from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import Texto from "./Texto";


const colunas = [
    { field: "nome", headerName: "Nome do Cliente", width: 200 },
    { field: "cpf", headerName: "CPF", width: 200 },
    { field: "datainicio", headerName: "Data de inicio", width: 200 },
    { field: "empresa", headerName: "Empresa", width: 200 },
]




function Pedidos(){

    function handleClick(){
        console.log("rodei");
    }

    
    const [listaPedidos, setListaPedidos] = React.useState([]);

    React.useEffect(() => {
        let res = axios.get("/pedidos");
        res.then((query) => {
            setListaPedidos(query.data);
        });
    }, []);


    return (
        <Box
            sx={{ bgcolor: 'text.secondary' }}
            height={'600px'}
        >
            <Stack direction={"column"} alignItems={"center"}>
                <Texto texto="Pedidos"/>
                <Box
                    height={"500px"}
                    width={"820px"}
                    bgcolor={'background.paper'}
                >
                    <DataGrid
                        rows={listaPedidos}
                        columns={colunas}
                        getRowId={(listaPedidos) => listaPedidos.idp}
                        // onCellClick={handleClick()} tentar usar isso depois
                    />
                </Box>
                <Button
                    variant="contained"
                    // onClick={handleClick}
                    type="submit"
                    color="primary">
                    Voltar
                </Button>
            </Stack>
        </Box>
    );
}









export default Pedidos